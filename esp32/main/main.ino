#include <Arduino.h>
#include <ESPmDNS.h>
#include <WebServer.h>
#include <Preferences.h>
#include "wifi_setup.h"
#include "constants.h"

Preferences preferences;
WebServer server(80);
bool ledState = false;
const int led = 2;
String login = "";
String password = "";

void handleRoot() {
  String page = R"(
    <!DOCTYPE html>
    <html>
    <head>
      <title>Login Page</title>
    </head>
    <body>
      <h1>Enter Login and Password</h1>
      <form action="/submit" method="post">
        <label for="login">Логин:</label><br>
        <input type="text" id="login" name="login"><br><br>
        <label for="password">Пароль:</label><br>
        <input type="password" id="password" name="password"><br><br>
        <button type="submit">Сохранить</button>
      </form>
    </body>
    </html>
  )";
  server.send(200, "text/html", page);
}

void handleSubmit() {
  login = server.arg("login");
  password = server.arg("password");
  ledState = !ledState;

  // Обработка данных логина и пароля
  Serial.println("Login: " + login);
  Serial.println("Password: " + password);

  preferences.putString(KEY_EEPROM_LOGIN, login);
  preferences.putString(KEY_EEPROM_PASSWORD, password);

  // Ответ сервера
  server.send(200, "text/plain", "Данные сохранены");
}

void setup() {
  Serial.begin(115200);
  pinMode(led, OUTPUT);

  if (!preferences.begin("my-app", false)) {
    Serial.println("Ошибка открытия памяти!");
    return;
  }

  // Если Логин не сохранён, то включаем
  // точку доступа для указания логина и пароля.
  // (проверяем только логин, так как пароль
  // может быть пустым если сохранённая сеть была открытой)
  login = preferences.getString(KEY_EEPROM_LOGIN, "");
  if (login == "") { // здесь нужно дописать процедуру сброса логина и пароля
    setupWiFiAP(SSID_AP_WIFI);

    if (MDNS.begin(ADDRES_AP_WIFI)) {
      Serial.println("mDNS запущен. Адрес http://esp32.local");
    } else {
      Serial.println("Ошибка запуска mDNS.");
    }

    //веб-сервер
    server.on("/", HTTP_GET, handleRoot);
    server.on("/submit", HTTP_POST, handleSubmit);
    server.begin();

    while (true) {
      server.handleClient();
      if (ledState) {
        digitalWrite(led, HIGH);
      } else {
        digitalWrite(led, LOW);
      }
    }

  } else {//в противном случае,
    //пытаемся подключится к сети по сохранённым данным
    password = preferences.getString(KEY_EEPROM_PASSWORD, "");
    setupWiFi(login, password);

    // !!!!!!! неплохо добавить индикацию миганием светодиодов (или что-то подобное)
  }





}

void loop() {

}
#include <Arduino.h>
#include <ESPmDNS.h>
#include <WebServer.h>
#include <Preferences.h>

#include "constants.h"
#include "wifi_setup.h"


Preferences preferences;
WebServer server(80);
bool ledState = false;
const int led = 2;
const int bt = 0;

String login = "";
String password = "";

void blinked(unsigned int H1 = 0, unsigned int L1 = 0,
             unsigned int H2 = 0, unsigned int L2 = 0,
             unsigned int H3 = 0, unsigned int L3 = 0) {
  if(H1 > 0) {
    digitalWrite(led, HIGH);
    delay(H1);
  }
  if(L1 > 0) {
    digitalWrite(led, LOW);
    delay(L1);
  }
  if(H2 > 0) {
    digitalWrite(led, HIGH);
    delay(H2);
  }
  if(L2 > 0) {
    digitalWrite(led, LOW);
    delay(L2);
  }
  if(H3 > 0) {
    digitalWrite(led, HIGH);
    delay(H3);
  }
  if(L3 > 0) {
    digitalWrite(led, LOW);
    delay(L3);
  }
}

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
  server.send(200, "text/html; charset=utf-8", page);
}

void handleSubmit() {
  login = server.arg("login");
  password = server.arg("password");
  ledState = !ledState;

  // Обработка данных логина и пароля
  DEBUG_PRINTLN("Login: " + login);
  DEBUG_PRINTLN("Password: " + password);

  preferences.putString(KEY_EEPROM_LOGIN, login);
  preferences.putString(KEY_EEPROM_PASSWORD, password);

  // Ответ сервера
  server.send(200, "text/plain; charset=utf-8", "Данные сохранены");
}

void setup() {
  Serial.begin(115200);
  pinMode(led, OUTPUT);
  pinMode(bt, INPUT);

  blinked(5000, 1);//зажигает свет на 5000с.

  if (!preferences.begin("my-app", false)) {
    Serial.println("Ошибка открытия памяти!");
    return;
  }
  login = preferences.getString(KEY_EEPROM_LOGIN, "");
  password = preferences.getString(KEY_EEPROM_PASSWORD, "");
  

  // Если Логин не сохранён, то включаем
  // точку доступа для указания логина и пароля.
  // (проверяем только логин, так как пароль
  // может быть пустым если сохранённая сеть была открытой)
  if (login == "" || digitalRead(bt) == LOW) {
    blinked(200, 200,//мигает трижды, равномерно
            200, 200,
            200, 200);

    setupWiFiAP(SSID_AP_WIFI);
    DEBUG_PRINTLN("Точка доступа активирована");
    if (MDNS.begin(ADDRES_AP_WIFI)) {
      Serial.println("mDNS запущен. Адрес http://esp32.local");
    } else {
      Serial.println("Ошибка запуска mDNS.");
    }

    //веб-сервер
    server.on("/", HTTP_GET, handleRoot);
    server.on("/submit", HTTP_POST, handleSubmit);
    server.begin();

    while (true) {//обрабатываем ввод пользователя
      server.handleClient();
      if (ledState) {
        digitalWrite(led, HIGH);
      } else {
        digitalWrite(led, LOW);
      }
    }

  } else {//в противном случае,
    //завершаем работу с EEPROM
    preferences.end();
    
    const char* charLogin = login.c_str();
    const char* charPassword = password.c_str();
    
    //пытаемся подключится к сети по сохранённым данным
    DEBUG_PRINTLN("Попытка подключиться к сохранённой сети");
    setupWiFi(charLogin, charPassword);
    DEBUG_PRINTLN("Подключение прошло успешно!");

    while (true) {
      blinked(500, 500);//мигает
    }
    
    //
  }
  
  //
}

void loop() {
  //
}

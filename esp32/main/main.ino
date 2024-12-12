#include <WiFi.h>

const char* ssid = "Имя_сети";
const char* password = "Пароль";

void setup() {
  Serial.begin(115200);
  Serial.println("Подключение к Wi-Fi...");

  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Пытаюсь подключиться...");
  }

  Serial.println("Подключено!");
  Serial.print("IP адрес: ");
  Serial.println(WiFi.localIP());
}

void loop() {
  //
}

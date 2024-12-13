#ifndef CONSTANTS_H
#define CONSTANTS_H

#define DEBUG_SERIAL                                // Режим дебага через сериал

#ifdef DEBUG_SERIAL
  #define DEBUG_PRINT(x) Serial.print(x)
  #define DEBUG_PRINTLN(x) Serial.println(x)
#else
  #define DEBUG_PRINT(x)
  #define DEBUG_PRINTLN(x)
#endif

const String VERSION = "v2.4";                      // Версия ПО

const char * SSID_AP_WIFI = "ESP_AP_v0.2";          // Имя точки доступа
const char * ADDRES_AP_WIFI = "esp32";              // Адрес точки доступа "http://esp32.local"

const char * KEY_EEPROM_LOGIN = "Login";            // Ключ для записи и чтения Логина
const char * KEY_EEPROM_PASSWORD = "Password";      // Ключ для записи и чтения Пароля

const int DELAY_TIME = 1000;                        // Время задержки в миллисекундах

#endif
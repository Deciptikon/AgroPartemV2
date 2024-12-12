#ifndef WIFI_SETUP_H
#define WIFI_SETUP_H

#include <WiFi.h>

// Настройка Wi-Fi подключения
void setupWiFi(const char* ssid, const char* password) {
  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
  }
}

// Настройка точки доступа
void setupWiFiAP(const char* apSsid = "ESP32_AP", const char* apPassword = "") {
  WiFi.softAP(apSsid, apPassword);
}

#endif
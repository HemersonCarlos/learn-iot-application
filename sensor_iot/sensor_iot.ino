#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <ArduinoJson.h>
#include <DHT.h>
#include <Wire.h>

#define WIFI_SSID "OFICINA_IOT"
#define WIFI_PASSWORD "oficina_iot"

#define PIN_LED D8
#define DHTTYPE DHT22
#define DHTPIN  D6

String SERVER_URL = "http://10.199.10.46:3000";

String SENSOR_ID = "1";
String ACTUATOR_ID = "1";

String URL_SENSOR = SERVER_URL + "/sensors/" + SENSOR_ID + "/add";
String URL_ACTUATOR = SERVER_URL + "/actuators/" + ACTUATOR_ID;

HTTPClient http;
DHT dht(DHTPIN, DHTTYPE, 11);

void setupPins(){
  pinMode(PIN_LED, OUTPUT);
  dht.begin();
  delay(2000);
}

void setupWifi(){
  Serial.println("Configurando Wifi");
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  Serial.print("Conectando");
  while (WiFi.status() != WL_CONNECTED) {
    delay(3000);
  }
  delay(3000);
  Serial.println();
  Serial.print("Conectado: ");
  Serial.println(WiFi.localIP());
}

void sendDataToServer(float temperature, float humidity){
  if((WiFi.status() == WL_CONNECTED)) {
      Serial.println("Enviando dados...");
      String dados = "{ \"temperature\" : \"" + String(temperature) + "\", \"humidity\" : \"" + String(humidity) + "\" }";
      http.begin(URL_SENSOR);
      http.addHeader("Content-Type", "application/json");
      int httpCode = http.POST(dados);
      if(httpCode == HTTP_CODE_OK){
        Serial.println("Dados enviados para o servidor");
      }else{
        Serial.println("Erro ao enviar os dados");
        Serial.print("Code:");
        Serial.println(httpCode);
      }
      http.end();
  }
}

String getDataFromServer(){
  if((WiFi.status() == WL_CONNECTED)) {
      http.begin(URL_ACTUATOR);
      http.addHeader("Content-Type", "application/json");
      int httpCode = http.GET();
      if(httpCode == HTTP_CODE_OK){
         return http.getString();
      }else{
        Serial.println("Erro ao buscar os dados");
        Serial.print("Code:");
        Serial.println(httpCode);
      }
      http.end();
  }
  return String();
}

void verifyLedStatus() {
  String serverData = getDataFromServer();

  Serial.println(serverData);
  
  DynamicJsonBuffer jsonBuffer;
  JsonObject& root = jsonBuffer.parseObject(serverData);
  long actuatorStatus = root["status"];
  Serial.println(actuatorStatus);
  
  if(actuatorStatus == 0) {
    digitalWrite(PIN_LED, LOW);
  } else {
    digitalWrite(PIN_LED, HIGH);
  }
}
void setup() {
  Serial.begin(9600);
  while (!Serial) {
    ;
  }
  setupPins();
  setupWifi();
}

void loop() {
  long tempo = millis();
  float humidity = dht.readHumidity();
  float temperature = dht.readTemperature(false);

  Serial.println(humidity);
  Serial.println(temperature);

  sendDataToServer(temperature, humidity);
  
  verifyLedStatus();

  delay(10000);
}
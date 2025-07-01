#include <M5StickCPlus.h>
#include <WiFi.h>
#include <WebServer.h>
#include <SPIFFS.h>
#include <FS.h>

// Access Point credentials
const char* ssid = "secret evil wifi";
const char* password = "evil password";

// Create WebServer object on port 80
WebServer server(80);

// Function declarations
void handleRoot();
void handleFileRead(String path);
void handleNotFound();
void handleLong();
void handleShort();
void longRelay();
void shortRelay();  
void restoreNormalDisplay();
String getContentType(String filename);

void handleRoot() {
    handleFileRead("/index.html");
}

void handleFileRead(String path) {
    if (path.endsWith("/")) path += "index.html";
    
    String contentType = getContentType(path);
    
    if (SPIFFS.exists(path)) {
        File file = SPIFFS.open(path, "r");
        server.streamFile(file, contentType);
        file.close();
    } else {
        server.send(404, "text/plain", "File Not Found: " + path);
    }
}

void handleNotFound() {
    String path = server.uri();
    handleFileRead(path);
}

String getContentType(String filename) {
    if (filename.endsWith(".html")) return "text/html";
    else if (filename.endsWith(".css")) return "text/css";
    else if (filename.endsWith(".js")) return "application/javascript";
    else if (filename.endsWith(".png")) return "image/png";
    else if (filename.endsWith(".ico")) return "image/x-icon";
    else if (filename.endsWith(".mp3")) return "audio/mpeg";
    return "text/plain";
}

void longRelay() {
    digitalWrite(32, HIGH);
    delay(500);
    digitalWrite(32, LOW);

  
}

void shortRelay() {
    digitalWrite(32, HIGH);
    delay(100);
    digitalWrite(32, LOW);
}


void restoreNormalDisplay() {
    M5.Lcd.fillScreen(BLACK);
    M5.Lcd.setTextColor(WHITE);
    M5.Lcd.setTextSize(1);
    M5.Lcd.setCursor(0, 10);
    M5.Lcd.println("WiFi AP Active");
    M5.Lcd.setCursor(0, 25);
    M5.Lcd.print("SSID: ");
    M5.Lcd.println(ssid);
    M5.Lcd.setCursor(0, 40);
    M5.Lcd.print("Pass: ");
    M5.Lcd.println(password);
    M5.Lcd.setCursor(0, 55);
    M5.Lcd.print("IP: ");
    M5.Lcd.println(WiFi.softAPIP());
    M5.Lcd.setCursor(0, 70);
    M5.Lcd.println("Server: Ready");
}

void handleShort() {
    shortRelay();
    server.send(200, "/short", "");

}

void handleLong() {
    longRelay();
    server.send(200, "/long", "");
}

void setup() {
    M5.begin();
    
    M5.Lcd.setRotation(1);
    M5.Lcd.fillScreen(BLACK);
    M5.Lcd.setTextColor(WHITE);
    M5.Lcd.setTextSize(1);
    
    M5.Lcd.setCursor(0, 10);
    M5.Lcd.println("Starting...");
    
    // Initialize SPIFFS
    if (!SPIFFS.begin(true)) {
        Serial.println("An Error has occurred while mounting SPIFFS");
        M5.Lcd.println("SPIFFS Error!");
        return;
    }
    
    // List files for debugging
    Serial.println("SPIFFS files:");
    File root = SPIFFS.open("/");
    File file = root.openNextFile();
    while (file) {
        Serial.print("  ");
        Serial.println(file.name());
        file = root.openNextFile();
    }
    
    WiFi.mode(WIFI_AP);
    WiFi.softAP(ssid, password);
    
    IPAddress IP = WiFi.softAPIP();
    
    M5.Lcd.fillScreen(BLACK);
    M5.Lcd.setCursor(0, 10);
    M5.Lcd.println("WiFi AP Active");
    M5.Lcd.setCursor(0, 25);
    M5.Lcd.print("SSID: ");
    M5.Lcd.println(ssid);
    M5.Lcd.setCursor(0, 40);
    M5.Lcd.print("Pass: ");
    M5.Lcd.println(password);
    M5.Lcd.setCursor(0, 55);
    M5.Lcd.print("IP: ");
    M5.Lcd.println(IP);
    M5.Lcd.setCursor(0, 70);
    M5.Lcd.println("Server: Ready");
    
    // Set up web server routes
    server.on("/", handleRoot);
    server.on("/short", handleShort);
    server.on("/long", handleLong);
    server.onNotFound(handleNotFound);
    
    server.begin();
    
    Serial.begin(115200);
    Serial.println("M5StickC Plus Access Point Started");
    Serial.print("SSID: ");
    Serial.println(ssid);
    Serial.print("Password: ");
    Serial.println(password);
    Serial.print("IP Address: ");
    Serial.println(IP);
    Serial.println("Web server started on port 80");
    pinMode(32, OUTPUT);
}

void loop() {
    server.handleClient();
    M5.update();
    
    static unsigned long lastUpdate = 0;
    if (millis() - lastUpdate > 5000) {
        int clients = WiFi.softAPgetStationNum();
        M5.Lcd.fillRect(0, 85, 240, 15, BLACK);
        M5.Lcd.setCursor(0, 85);
        M5.Lcd.print("Clients: ");
        M5.Lcd.println(clients);
        lastUpdate = millis();
    }
    
    delay(10);
}
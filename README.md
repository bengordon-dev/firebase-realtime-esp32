# Firebase Realtime with ESP32 and React
Starter code for Texas Convergent subteams

# Circuit/Sensor Used

![image](https://www.tutorialspoint.com/esp32_for_iot/images/mpu2.jpg)

In my Arduino code I used an MPU6050 3-axis accelerometer. You will need to change parts of the [arduino.ino](arduino/arduino.ino) file to accomodate your hardware.

## Connecting your ESP to Wi-Fi

To register your device with the utexas-iot network, you will need to get its MAC address.
Build the following code to your ESP and click Tools -> Serial Monitor:

```cpp
#include <WiFi.h>
void setup(){
  Serial.begin(9600); // if that number does not work try 115200
  Serial.println();
  Serial.print("ESP Board MAC Address: ");
  Serial.println(WiFi.macAddress());
}
```

If no output appears, click the left-hand button on the ESP to refresh its runtime and start the code over from the beginning.

Go to [https://network.utexas.edu/](https://network.utexas.edu/) and sign in.
- Click "Register Wi-Fi Device"
- Paste in the MAC address from the serial monitor
- Set Network Profile to Unprotected
- Click the show button (eye shaped) to see your PSK 

From now on, when connecting your ESP to the utexas-iot network, the SSID is utexas-iot and the password
is your PSK from network.utexas.edu with the spacesremoved.

## Logging Data to the Database from the Hardware

See [this tutorial](https://randomnerdtutorials.com/esp32-data-logging-firebase-realtime-database/) for how to set up a realtime database in a Firebase project. 

You will need to change the `#define` statements in the [arduino.ino](arduino/arduino.ino) file 
for the code to work.
Set WIFI_SSID and WIFI_PASSWORD to the relevant Wi-Fi network credentials. Set API_KEY, USER_EMAIL, USER_PASSWORD,
and DATABASE_URL as instructed in the tutorial.

## Reading Data from the Database in an App

In this example I used web React through React Native should work too. 
See [this tutorial](https://randomnerdtutorials.com/esp32-esp8266-firebase-gauges-charts/) for the instructions I followed and the [frontend](frontend) folder for the code.

### Firebase setup

Most of the frontend code in this example does not need to be changed, except for that displaying sensor readings.
You will however need to setup your repository to connect with your Firebase project.
- Run `npm install` in frontend
- Make a project as instructed in the tutorial and add an app to it
- Install the Firebase command-line tools with `npm -g install firebase-tools`
- Run `firebase login` to sign into your account
- Run `firebase init` in frontend and follow the instructions of the tutorial

You will need to make an `.env.local` file inside frontend to store certain credentials for your app safely. Never push
Firebase credentials to GitHub! 
```REACT_APP_API_KEY=""
REACT_APP_AUTH_DOMAIN=""
REACT_APP_DATABASE_URL=""
REACT_APP_PROJECT_ID=""
REACT_APP_STORAGE_BUCKET=""
REACT_APP_MESSAGING_SENDER_ID=""
REACT_APP_ID=""
```


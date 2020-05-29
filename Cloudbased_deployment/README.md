# Cloud based deployment

This is the first web application. It is a HTML5 and JavaScript application that uses the Generic Sensor API that collects 
data form the accelerator sensor of the mobile phone. The values collected are forwarded to the Azure cloud infrastructure via MQTT protocol, while the connection between the web app and the smartphone is established through websockets that we enabled in the previous steps.

The Azure web app service is the place where the app is hosted on the cloud, in order to be remotely executed from any mobile device and browser.

Note: using a free tier subscription could lead to reach soon the maximum number of messages exchanged to the Hub, if you need to run multiple experiments over time, I suggest to change subscription and use the free credit Microsoft offers, by selecting the S1 standard tier.

The device that connect to this web application must have an embedded accelerometer sensor, to allow the web API to collect the raw sensor data, otherwise the app will show an error message informing us that is not able to retrieve any sensor data. 

## How to use it
1. Connect the smartphone to the cloud web app following this link: https://harcloud.azurewebsites.net

2. Run the local web app from you computer. Open a terminal and move into the local web app folder and type:

```
npm install
npm start
```

3. Open your browser and visualize the data into charts. Log in to https://localhost:3000 to track the data.

4. If you want to check that the data is really being received from your IoT Hub, open the Azure portal, open the terminal provided by the platform and type:


```
az iot hub monitor-events --hub-name <your_iot-hub_name> --output table
```






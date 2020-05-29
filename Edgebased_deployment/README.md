# Edge based deployment

this is the edge based deployment app, the HAR is visible both from the web application on the smartphone and from the local web application that runs on your computer. Using the data collected from the cloud backend, we can develop a simple activity recognition model that detects if the user is moving or simply standing still.

This web app differs from the previous one, cause the activity recognition is computed at edge level, on the device. To do so, the modules involved in the app are the same as before, but modified, in order to allow the accelerometer handler to recognize a movement only if the difference between the latest raw sensor data and the previous one is contained in a given range, otherwise, the user is still.

Another important difference is that the server does not send to the Hub the raw sensor data, but instead just the latest activity recognition computed on the device.

NOTE: This time only the recognition activity computed at edge level will be shown, while there will be no raw sensor data received at all from the Azure backend. 

## How to use it

To use the web app from the smartphone, you need to: 

1. Log in to the URL of the app [https://haredge.azurewebsites.net](https://haredge.azurewebsites.net)

2. Run the local web app from your computer to visualize the incoming messages. Open a terminal and move into the local web app folder, then type:

```
npm install
npm start
```

3. Open a browser and log in to https://localhost:3000 to visualize the chart in which the HAR is shown.

4. You can also check that the data are being received as done before using the Azure CLI: open the Azure portal and then open the terminal provided by Azure. From the PowerShell type:

´´´
az iot hub monitor-events --hub-name <your_iot-hub_name> --output table
´´´

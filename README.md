# IoT-VirtualEnvironmentSensor 

## Send telemetry messages over ***MQTT*** using ***Microsoft Azure IoTHub***:

This repository contains an implementation in Python of the message exchange over the MQTT protocol between a _virtual_ IoT device and a MQTT Broker.

The aim of this project is to create a stand-alone program that represents a virtual environmental station that generates periodically a set of random values for 5 different sensors: 

- temperature (-50 ... 50 °Celsius)
- humidity (0 ... 100%)
- wind direction (0 ... 360°)
- wind intensity (0 ... 100 m/s)
- rain height (0 ... 50 mm/h) 

For the purpose of the project it has been used the Microsoft Azure IoT Hub platform to virtualize an IoT device and to store the messages into a database.

The Azure platform is also used as MQTT Broker, from which the data gathered from the devices are then read by a web application and shown into their specific charts. 

# Requirements

- A [Microsoft Azure](https://azure.microsoft.com/en-us/) account
- An Azure IoT Hub
- Virtual devices inside the IoT Hub
- An Azure CosmosDB database
- [NodeJS](https://nodejs.org/it/download/) 12 LTS
- [Python](https://www.python.org/downloads/) 3.6+

## Instructions

In order to reproduce the project in your local machine, it's necessary to create an IoT Hub and a device (or more) inside the Hub.

Run the following command to add the Microsoft Azure IoT Extension for Azure CLI to your Cloud Shell instance:

```
az extension add --name azure-iot
```

Once created the virtual devices it's necessary to retrieve the _IoTHubConnectionString_ using the following command from the Azure CLI (replace with you device and Hub names):

```
az iot hub show-connection-string --hub-name <YourIotHub> --policy-name service
```

and the _IoTDeviceConnectionString_:

```
az iot hub device-identity show-connection-string --device-id <YouDeviceName> --output table --hub-name <YourHubName>
```
Add a consumer group: it provides independent views into the event stream that enable apps and Azure services to independently consume data from the same Event Hub endpoint. Execute the following command:

```
az iot hub consumer-group create --hub-name <YourIoTHubName> --name YourConsumerGroupName
```

**Note** These are different connection strings.

Once obtained the connection strings and the ConsumerGroup String is a good practice to store them in a secure place, it is reccomended to keep the string safe into environment variables. Open a Shell, Prompt/PowerShell (in Windows) or Bash (if you're using Linux) and type the commands:

```
set IotHubConnectionString=YourIoTHubConnectionString
set EventHubConsumerGroup=YourConsumerGroupName
```

Download the web app from this repository and modify the config.js file in order to connect to your own CosmosDB.

Run the IoTSensorPublisher.py from your IDE or from the terminal to start sending messages from the virtual device to the MQTT Broker.

Run the web app from the terminal:

```
npm install
npm start
```
Open your favourite browser (your favourite browser should be Firefox btw...), log to ``` http://localhost:3000 ``` to view the messages coming from the virtual environment station.

Enjoy it!

Useful links and detiled guides: 

- Video Tutorial: https://youtu.be/OKkgBYG0hk4

- LinkedIn: www.linkedin.com/in/roberto-sorce-52491512a 

- LinkedIn article: https://www.linkedin.com/pulse/simulating-iot-device-exchanging-messages-over-mqtt-protocol-sorce

- Create an IoT Hub with Microsoft Azure: https://docs.microsoft.com/en-us/azure/iot-hub/iot-hub-create-through-portal

- Send telemetry from a device to an IoT Hub: https://docs.microsoft.com/en-us/azure/iot-hub/quickstart-send-telemetry-dotnet

- MQTT protocol in Azure: https://docs.microsoft.com/en-us/azure/iot-hub/iot-hub-mqtt-support

- Real-time data visualization of your IoT hub data in a web app: https://docs.microsoft.com/en-us/azure/iot-hub/iot-hub-live-data-visualization-in-web-apps





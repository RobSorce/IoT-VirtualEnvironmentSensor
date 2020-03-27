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

- A Microsoft Azure account
- An Azure IoT Hub
- Virtual devices inside the IoT Hub
- An Azure CosmosDB database

## Instructions

In order to reproduce the project in your local machine, it's necessary to create an IoT Hub and a device (or more) inside the Hub.

1. 

Once created the virtual devices it's necessary to retrieve the _IoTHubConnectionString_ using the following command from the Azure CLI (replace with you device and Hub names):

```
az iot hub show-connection-string --hub-name <YourIotHub> --policy-name service
```

and the _IoTDeviceConnectionString_:

```
az iot hub device-identity show-connection-string --device-id <YouDeviceName> --output table --hub-name <YourHubName>
```
Add a consumer group
```
az iot hub consumer-group create --hub-name YourIoTHubName --name YourConsumerGroupName
```

**Note** These are different connection strings.

Once obtained the connection strings and the ConsumerGroup String is a good practice to store them in a secure place, it is reccomended to keep the string safe into environment variables. Open a Shell, Prompt/PowerShell (in Windows) or Bash (if you're using Linux) and type the commands:

```
set IotHubConnectionString=YourIoTHubConnectionString
set EventHubConsumerGroup=YourConsumerGroupName
```

**Note** 






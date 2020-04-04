# IoT-VirtualEnvironmentSensor 
# Assignment 2

## Send telemetry messages over ***MQTT-SN*** using ***RIOT*** and ***Microsoft Azure IoTHub***:

This repository contains an implementation in Python of the message exchange over the MQTT-SN protocol between a _virtual_ IoT device and a MQTT-SN Broker.

The aim of this project is to create a stand-alone program in RIOT that represents a virtual environmental station that generates periodically a set of random values for 5 different sensors: 

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
- [NodeJS](https://nodejs.org/it/download/) 12 LTS
- [Python](https://www.python.org/downloads/) 3.6+
- [Mosquitto RSMB](https://github.com/eclipse/mosquitto.rsmb)
- [RIOT-OS GitHub](https://github.com/RIOT-OS/RIOT)
- Ubuntu 18.04 (not necessarily)


## Instructions

Download RIOT on your environment:

```
cd ~
git clone https://github.com/RIOT-OS/RIOT
```
Download the MQTT-SN broker:

```
git clone https://github.com/eclipse/mosquitto.rsmb
```

Build the RSMB:

```
cd mosquitto.rsmb/rsmb/src

make
```
Create a config file to store the configurations needed to instruct the RSMB and copy and paste the following:

```
# add some debug output
trace_output protocol

# listen for MQTT-SN traffic on UDP port 1885
listener 1885 INADDR_ANY mqtts
  ipv6 true

# listen to MQTT connections on tcp port 1886
listener 1886 INADDR_ANY
  ipv6 true

```
Start the broker

```
./broker_mqtts config.conf
```
Configure the global addresses needed with the RIOT tapsetup script:

```
sudo ./RIOT/dist/tools/tapsetup/tapsetup
```

Assign a site-global prefix to the tapbr0 interface, we need it to address the MQTT-SN broker:



```
sudo ip a a fec0:affe::1/64 dev tapbr0

```

Assign a site-global address with the same prefix within the RIOT native instance (open first with BOARD=native make term):


```
ifconfig 5 add fec0:affe::99

```

To connect to a broker, use the con command:

```
con fec0:affe::1 1885
```

To run the random values generator, type:

```
rand env/all
```

or choose another topic from this list:

1. env/temperature
2. env/humidity
3. env/windDirection
4. env/windIntensity
5. env/rainHeight

Start the Gateway bridge:

```
python mqtt_sn_bridge.py
```

Run the web app from the terminal:

```
npm install
npm start
```
Open your favourite browser (your favourite browser should be Firefox btw...), log to ``` http://localhost:3000 ``` to view the messages coming from the virtual environment station.

Enjoy it!

Useful links and detiled guides: 

- Video Tutorial: https://youtu.be/fjDlA3hyQyM

- emCute MQTT-SN guide: https://github.com/RIOT-OS/RIOT/tree/master/examples/emcute_mqttsn

- LinkedIn: www.linkedin.com/in/roberto-sorce-52491512a 

- Hands-on tutorial: https://www.linkedin.com/pulse/building-iot-system-riot-microsoft-azure-roberto-sorce

- RIOT-OS webpage: https://riot-os.org/

- RIOT-OS GitHub: https://github.com/RIOT-OS/RIOT

- Mosquitto RSMB: https://github.com/eclipse/mosquitto.rsmb

- Introductions to MQTT-SN: http://www.steves-internet-guide.com/mqtt-sn/



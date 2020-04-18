# IoT-VirtualEnvironmentSensor
# Assignment 3

## Send telemetry messages over ***MQTT*** and LoRaWAN using ***RIOT***, ***TheThingsNetwork (TTN)*** and ***Microsoft Azure IoTHub***:

This repository contains an implementation in Python of the message exchange over the MQTT protocol between a _virtual_ IoT device implemented with RIOT-OS and a MQTT Broker.

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
- [TheThingsNetwork](https://www.thethingsnetwork.org/) Account
- [IotLab Account](https://www.iot-lab.info/)
- [NodeJS](https://nodejs.org/it/download/) 12 LTS
- [Python](https://www.python.org/downloads/) 3.6+
- [RIOT-OS GitHub](https://github.com/RIOT-OS/RIOT)
- Ubuntu 18.04 LTS (not necessarily)
- [Mosquitto MQTT broker](https://www.vultr.com/docs/how-to-install-mosquitto-mqtt-broker-server-on-ubuntu-16-04)


## Instructions

configure the SSH access to the IoT-Lab site. Let's open a Terminal if you're using Linux or macOS and type:


```
ssh-keygen -t rsa

```

Use the public key generated to gain access to the website, copying it from your stored file in the home folder, and pasting it into the SSH keys page inside the settings.

connect from the terminal through SSH to the Saclay site, typing:

```
ssh <my_name>@saclay.iot-lab.info
```

Authenticate with your IoT-LAB password:

```
iotlab-auth -u <my_name>
```

Start a new experiment using the following command:

```
iotlab-experiment submit -n riot_ttn -d 60 -l 2,archi=st-lrwan1:sx1276+site=saclay
```

This command will start a new experiment called riot_ttn, that will last 60 minutes, using two nodes over the architecture ST-LRWAN1, the ST Microelectronics board where the application will be executed.

To get important informations about the experiment we are going to use the following commands (replace <exp_id> with your experiment ID):

```
iotlab-experiment get -i <exp_id> -s
iotlab-experiment get -i <exp_id> -r
```

nstall RIOT from the RIOT GitHub page, to get the code of the 2019.01 release of RIOT from GitHub and also clone my GitHub repository inside IoT-LAB:

```
git clone https://github.com/RIOT-OS/RIOT.git -b 2019.01-branch
git clone https://github.com/RobSorce/IoT-VirtualEnvironmentSensor.git
```

Now we need to replace an existing file in a specific folder, inside "RIOT/tests/pkg_semtech-loramac", in order to run our RIOT-OS client representing the virtual environment station. Replace the file with this command and move inside the RIOT folder:

```
cp -a IoT-VirtualEnvironmentSensor/LoRaWAN_station/. RIOT/tests/pkg_semtech-loramac
cd RIOT
```

update the ARM GCC tool version, because RIOT doesn’t support the ARM GCC version installed by default on the SSH frontend:

```
export PATH=/opt/gcc-arm-none-eabi-7-2018-q2-update/bin:$PATH
```

Now, build our LoRaWAN station application typing this command:

```
make -C tests/pkg_semtech-loramac clean all
```

Flash the ST LoRa node with the LoRaWAN firmware, paying attention to the ID of each node: 

```
iotlab-node --update tests/pkg_semtech-loramac/bin/b-l072z-lrwan1/tests_pkg_semtech-loramac.elf -l saclay,st-lrwan1,<yourDevID>

iotlab-node --update tests/pkg_semtech-loramac/bin/b-l072z-lrwan1/tests_pkg_semtech-loramac.elf -l saclay,st-lrwan1,<yourDevID>
```

Using the Netcat command (nc) from the terminal, we'll be able to access the RIOT shell that runs on each node: again, from the first terminal, replace the ID of your node, then do the same for thesecond node. 

```
nc st-lrwan1-<YourDevID> 20000
```

Repeat the same same procedure to start the other node.

The shell provides the loramac command to interact with the LoRaWAN stack running on the node:

```
> help
help
Command              Description
---------------------------------------
loramac              control the loramac stack
reboot               Reboot the node
random_init          initializes the PRNG
random_get           returns 32 bit of pseudo randomness
> loramac
loramac
Usage: loramac <get|set|join|tx>

```

Find the Device EUI, Application EUI and Application key information in the Overview tab of the iotlab-nodedevice on the TTN web console. Then set them to the RIOT firmware (replace the following with your values):

```
> loramac set deveui 00000000000000
> loramac set appeui 00000000000000
> loramac set appkey 0000000000000000000000000000
```

Set a fast datarate, e.g. 5, corresponding to a bandwidth of 125kHz, since the nodes are very close to the gateway:

```
> loramac set dr 5
```

Join it to the network using the OTAA:

```
> loramac join otaa
```

Start publishing telemetry messages from the virtual LoRaWAN station:

```
> loramac publisher
```

Start the TTN Cloud transparent bridge form the terminal to allow the back-end platform Azure to receive the messages:

```
python3 cloud_transparent_bridge.py
```

Run the web app from the terminal:

```
npm install
npm start
```
Open your favorite browser (your favorite browser should be Firefox btw...), log to ``` http://localhost:3000 ``` to view the messages coming from the virtual environment station.

Enjoy it!

Useful links and detailed guides:

- Video Tutorial:  https://youtu.be/jrL_tACy1sI 

- LinkedIn: www.linkedin.com/in/roberto-sorce-52491512a

- TheThingsNetwork: https://www.thethingsnetwork.org/

- LoRaWAN tutorial on IotLab: https://www.iot-lab.info/tutorials/riot-ttn/

- RIOT-OS webpage: https://riot-os.org/

- RIOT-OS GitHub: https://github.com/RIOT-OS/RIOT

- ST B-L072Z-LRWAN1 specs: https://www.st.com/en/evaluation-tools/b-l072z-lrwan1.html

- Hands-on Tutorial #1: https://www.linkedin.com/pulse/simulating-iot-device-exchanging-messages-over-mqtt-protocol-sorce

- Hands-on Tutorial #2: https://www.linkedin.com/pulse/building-iot-system-riot-microsoft-azure-roberto-sorce

- Hands-on Tutorial #3: https://www.linkedin.com/pulse/build-open-source-iot-system-lorawan-ttn-riot-roberto-sorce

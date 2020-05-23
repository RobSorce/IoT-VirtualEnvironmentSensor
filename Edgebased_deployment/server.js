
/*****************************************************
 * Human activity recognition
 *
 * Server side of the web application edge_based
 *
 * Accelerometer handler:
 *
 * This module gathers values from the smartphone
 * accelerometer and stream the acquired data towards
 * the Microsoft Azure cloud backend;
 *****************************************************/

//Express loads the file in public folder
const express = require('express');

//Socket to communicate with accelerometer.js
const socket = require('socket.io');

//IoT hub Connection
var Mqtt = require('azure-iot-device-mqtt').Mqtt;
var DeviceClient = require('azure-iot-device').Client;
var Message = require('azure-iot-device').Message;

/******************************************************
 * Microsoft Azure IoT device connection
 *
 * Modify the connectionString variable:
 *
 * Copy and paste your personal IoT device
 * connection string from Azure portal,
 * in order to start the connection.
 *
 * IoT device connection string can be found in IoT Hub->
 * IoTDevices->your_device_name->Primary Connection String
 ******************************************************/

//remember to set the connection string of the device
// Note: Device connection string required != IoTHub connection string
var connectionString = "";
var client = DeviceClient.fromConnectionString(connectionString, Mqtt);

/**************************************
 * Connecting to the port specified:
 *
 * If unable to retrieve the port,
 * default ephemeral port is 3000
 **************************************/

const app = express();
const port = process.env.PORT || '3000';

//index.html and accelerometer.js are in public folder
app.use(express.static('public'));

var server = app.listen(port, () => {
    console.log('Server is running on http://localhost:${port}');
});

var io = socket(server);

io.on('connection', function(socket){
    //getting data from accelerometer.js
    socket.on('activity', function(message){
        var JSONMessage = new Message(JSON.stringify({
            state: message.state
        }));
        //sending message to azure iot hub
        client.sendEvent(JSONMessage, function (err) {
            if (err) {
                console.error('Error while sending the message to the hub: ' + err.toString());
            } else {
                console.log('Messages forwarded');
            }
        });
    });
    socket.on('lastactivity', function(message){
        var JSONMessage = new Message(JSON.stringify({
            state: message.state
        }));
        //sending message to azure iot hub
        client.sendEvent(JSONMessage, function (err) {
            if (err) {
                console.error('Error while sending the message to the hub: ' + err.toString());
            } else {
                console.log('Messages forwarded');
            }
        });
    });
});

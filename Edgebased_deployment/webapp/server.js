const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const path = require('path');
const EventHubReader = require('./scripts/event-hub-reader.js');

//IoT Hub connection string and hub consumer group must be set as environment parameters
//const iotHubConnectionString = process.env.IotHubConnectionString;
//const eventHubConsumerGroup = process.env.EventHubConsumerGroup;

/******************************************************************************************
 * IoT Hub connection string and hub consumer group must be set as environment variables
 * for security reasons, in order to hide sensitive information.
 *
 * Microsoft Azure IoT Hub connection
 *
 * Modify the connectionString variable:
 *
 * Store your personal IoT Hub
 * connection string and HubConsumerGroup from Azure portal,
 * into environment variables,
 * in order to start the connection.
 *
 * IoT Hub connection string can be found in IoT Hub->
 * Settings->Shared access policy->iothubowner->
 * primary connection string
*****************************************************************************************/

// Redirect requests to the public subdirectory to the root
const app = express();
app.use(express.static(path.join(__dirname, 'public')));
app.use((req, res) => {
  res.redirect('/');
});

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.broadcast = (data) => {
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      try {
        console.log(`Broadcasting data ${data}`);
        client.send(data);
      } catch (e) {
        console.error(e);
      }
    }
  });
};

server.listen(process.env.PORT || '3000', () => {
  console.log('Listening on %d.', server.address().port);
});

const eventHubReader = new EventHubReader(iotHubConnectionString, eventHubConsumerGroup);


//the new message is composed of the previous message, date and deviceId that sent it
(async () => {
  await eventHubReader.startReadMessage((message, date, deviceId) => {
    try {
      const payload = {
        IotData: message,
        MessageDate: date || Date.now().toISOString(),
        DeviceId: deviceId,
      };

      wss.broadcast(JSON.stringify(payload));
    } catch (err) {
      console.error('Error broadcasting: [%s] from [%s].', err, message);
    }
  });
})().catch();

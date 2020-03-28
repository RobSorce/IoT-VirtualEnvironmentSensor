/* eslint-disable max-classes-per-file;
 eslint-disable no-restricted-globals;
 eslint-disable no-undef;
 */

$(document).ready(() => {
  // if deployed to a site supporting SSL, use wss://
  const protocol = document.location.protocol.startsWith('https') ? 'wss://' : 'ws://';
  const webSocket = new WebSocket(protocol + location.host);

  // A class for holding the last N points of telemetry for a device
  class DeviceData {
    constructor(deviceId) {
      this.deviceId = deviceId;
      this.maxLen = 50;
      this.timeData = new Array(this.maxLen);
      this.temperatureData = new Array(this.maxLen);
      this.humidityData = new Array(this.maxLen);
      this.windDirectionData = new Array(this.maxLen);
      this.windIntensityData = new Array(this.maxLen);
      this.rainHeightData = new Array(this.maxLen);
    }

    addData(time, temperature, humidity, windDirection, windIntensity, rainHeight) {
      this.timeData.push(time);
      this.temperatureData.push(temperature);
      this.humidityData.push(humidity || null);
      this.windDirectionData.push(windDirection || null);
      this.windIntensityData.push(windIntensity || null);
      this.rainHeightData.push(rainHeight || null);

      if (this.timeData.length > this.maxLen) {
        this.timeData.shift();
        this.temperatureData.shift();
        this.humidityData.shift();
        this.windDirectionData.shift();
        this.windIntensityData.shift();
        this.rainHeightData.shift();
      }
    }
  }

  // All the devices in the list (those that have been sending telemetry)
  class TrackedDevices {
    constructor() {
      this.devices = [];
    }

    // Find a device based on its Id
    findDevice(deviceId) {
      for (let i = 0; i < this.devices.length; ++i) {
        if (this.devices[i].deviceId === deviceId) {
          return this.devices[i];
        }
      }

      return undefined;
    }

    getDevicesCount() {
      return this.devices.length;
    }
  }

  const trackedDevices = new TrackedDevices();

  // Define the chart axes for each telemetry message
  const chartDataTemperature = {
    datasets:[
      {
        fill: false,
        label: 'Temperature',
        yAxisID: 'Temperature',
        borderColor: 'rgba(255, 204, 0, 1)',
        pointBoarderColor: 'rgba(255, 204, 0, 1)',
        backgroundColor: 'rgba(255, 204, 0, 0.4)',
        pointHoverBackgroundColor: 'rgba(255, 204, 0, 1)',
        pointHoverBorderColor: 'rgba(255, 204, 0, 1)',
        spanGaps: true,
      }]
    };

  const chartOptionsTemperature = {
    scales: {
      yAxes: [{
        id: 'Temperature',
        type: 'linear',
        scaleLabel: {
          labelString: 'Temperature (ºC)',
          display: true,
        },
        position: 'left',
        ticks:{
          min: -50,
          max: 50,
          stepSize:10,
        }
      }
    ]}
  };

  const chartDataHumidity = {
    datasets:[      
      {
        fill: false,
        label: 'Humidity',
        yAxisID: 'Humidity',
        borderColor: 'rgba(24, 120, 240, 1)',
        pointBoarderColor: 'rgba(24, 120, 240, 1)',
        backgroundColor: 'rgba(24, 120, 240, 0.4)',
        pointHoverBackgroundColor: 'rgba(24, 120, 240, 1)',
        pointHoverBorderColor: 'rgba(24, 120, 240, 1)',
        spanGaps: true,
      }]
  };

  const chartOptionsHumidity = {
    scales: {
      yAxes: [
      {
        id: 'Humidity',
        type: 'linear',
        scaleLabel: {
          labelString: 'Humidity (%)',
          display: true,
        },
        position: 'left',
        ticks:{
          min: 0,
          max: 100,
          stepSize:10,
        }
      }
    ]}
  };

  const chartDataWindDirection = {
    datasets:[      
      {
      fill: false,
      label: 'Wind Direction',
      yAxisID: 'Wind Direction',
      borderColor: 'rgba(0, 255, 150, 1)',
      pointBoarderColor: 'rgba(0, 255, 150, 1)',
      backgroundColor: 'rgba(0, 255, 150, 0.4)',
      pointHoverBackgroundColor: 'rgba(0, 255, 150, 1)',
      pointHoverBorderColor: 'rgba(0, 255, 150, 1)',
      spanGaps: true,
    }]
  };

  const chartOptionsWindDirection = {
    scales: {
      yAxes: [
        {
          id: 'Wind Direction',
          type: 'linear',
          scaleLabel: {
            labelString: 'Wind Direction (°)',
            display: true,
          },
          position: 'left',
          ticks:{
            min: 0,
            max: 360,
            stepSize:90,
          }
        }]
      }
  };

  const chartDataWindIntensity = {
    datasets: [      {
      fill: false,
      label: 'Wind Intensity',
      yAxisID: 'Wind Intensity',
      borderColor: 'rgba(255, 0, 0, 1)',
      pointBoarderColor: 'rgba(255, 0, 0, 1)',
      backgroundColor: 'rgba(255, 0, 0, 0.4)',
      pointHoverBackgroundColor: 'rgba(255, 0, 0, 1)',
      pointHoverBorderColor: 'rgba(255, 0, 0, 1)',
      spanGaps: true,
      }]
  };

  const chartOptionsWindIntensity = {
    scales: {
      yAxes: [
        {
          id: 'Wind Intensity',
          type: 'linear',
          scaleLabel: {
            labelString: 'Wind Intensity (m/s)',
            display: true,
          },
          position: 'left',
          ticks:{
            min: 0,
            max: 100,
            stepSize:10,
          }
        }
      ]
    }
  };

  const chartDataRainHeight = {
    datasets:[      
      {
      fill: false,
      label: 'Rain Height',
      yAxisID: 'Rain Height',
      borderColor: 'rgba(200, 0, 200, 1)',
      pointBoarderColor: 'rgba(200, 0, 200, 1)',
      backgroundColor: 'rgba(200, 0, 200, 0.4)',
      pointHoverBackgroundColor: 'rgba(200, 0, 200, 1)',
      pointHoverBorderColor: 'rgba(200, 0, 200, 1)',
      spanGaps: true,
    }]
  };

  const chartOptionsRainHeight = {
    scales: {
      yAxes: [
        {
          id: 'Rain Height',
          type: 'linear',
          scaleLabel: {
            labelString: 'Rain Height (mm/h)',
            display: true,
          },
          position: 'left',
          ticks:{
            min: 0,
            max: 50,
            stepSize:5,
        }
      }]
    }
  };
  
   // Get the context of the canvas element we want to select
  const ctxTemperature = document.getElementById('iotChartTemperature').getContext('2d');
  const ctxHumidity = document.getElementById('iotChartHumidity').getContext('2d');
  const ctxWindIntensity = document.getElementById('iotChartWindIntensity').getContext('2d');
  const ctxWindDirection = document.getElementById('iotChartWindDirection').getContext('2d');
  const ctxRainHeight = document.getElementById('iotChartRainHeight').getContext('2d');

  const chartTemperature = new Chart(
    ctxTemperature,
    {
      type: 'line',
      data: chartDataTemperature,
      options: chartOptionsTemperature,
    }
  );
  const chartHumidity = new Chart(
    ctxHumidity,
    {
      type: 'line',
      data: chartDataHumidity,
      options: chartOptionsHumidity
    }
  );
  const chartWindIntensity = new Chart(
    ctxWindIntensity,
    {
      type: 'line',
      data: chartDataWindIntensity,
      options: chartOptionsWindIntensity,
    }
  );
  const chartWindDirection= new Chart(
    ctxWindDirection,
    {
      type: 'line',
      data: chartDataWindDirection,
      options: chartOptionsWindDirection,
    }
  );
  const chartRainHeight = new Chart(
    ctxRainHeight,
    {
      type: 'line',
      data: chartDataRainHeight,
      options: chartOptionsRainHeight,
    }
  );

  // Manage a list of devices in the UI, and update which device data the chart is showing
  // based on selection
  let needsAutoSelect = true;
  const deviceCount = document.getElementById('deviceCount');
  const listOfDevices = document.getElementById('listOfDevices');
  function OnSelectionChange() {
    const device = trackedDevices.findDevice(listOfDevices[listOfDevices.selectedIndex].text);
	
    chartDataTemperature.labels = device.timeData;
    chartDataTemperature.datasets[0].data = device.temperatureData;

    chartDataHumidity.labels = device.timeData;
    chartDataHumidity.datasets[0].data = device.humidityData;

    chartDataWindDirection.labels = device.timeData;
    chartDataWindDirection.datasets[0].data = device.windDirectionData;

    chartDataWindIntensity.labels = device.timeData;
    chartDataWindIntensity.datasets[0].data = device.windIntensityData;

    chartDataRainHeight.labels = device.timeData;
    chartDataRainHeight.datasets[0].data = device.rainHeightData;
  }
  listOfDevices.addEventListener('change', OnSelectionChange, false);

  // When a web socket message arrives:
  // 1. Unpack it
  // 2. Validate it has date/time and temperature
  // 3. Find or create a cached device to hold the telemetry data
  // 4. Append the telemetry data
  // 5. Update the chart UI
  webSocket.onmessage = function onMessage(message) {
    try {
      const messageData = JSON.parse(message.data);
      console.log(messageData);
		
	  
      //time and either other values are required
      if (!messageData.MessageDate || (!messageData.IotData.temperature && !messageData.IotData.humidity && !messageData.IotData.windIntensity && !messageData.IotData.windDirection && !messageData.IotData.rainHeight)) {
        return;
      }
		
      // find or add device to list of tracked devices
      const existingDeviceData = trackedDevices.findDevice(messageData.DeviceId);

      if (existingDeviceData) {
        existingDeviceData.addData(messageData.MessageDate, messageData.IotData.temperature, messageData.IotData.humidity, messageData.IotData.windDirection, messageData.IotData.windIntensity, messageData.IotData.rainHeight);
      } else {
        const newDeviceData = new DeviceData(messageData.DeviceId);
        trackedDevices.devices.push(newDeviceData);
        const numDevices = trackedDevices.getDevicesCount();
        deviceCount.innerText = numDevices === 1 ? `${numDevices} device` : `${numDevices} devices`;
        newDeviceData.addData(messageData.MessageDate, messageData.IotData.temperature, messageData.IotData.humidity, messageData.IotData.windDirection, messageData.IotData.windIntensity, messageData.IotData.rainHeight);

        // add device to the UI list
        const node = document.createElement('option');
        const nodeText = document.createTextNode(messageData.DeviceId);
        node.appendChild(nodeText);
        listOfDevices.appendChild(node);

        // if this is the first device being discovered, auto-select it
        if (needsAutoSelect) {
          needsAutoSelect = false;
          listOfDevices.selectedIndex = 0;
          OnSelectionChange();
        }
      }

      chartHumidity.update();
      chartTemperature.update();
      chartWindDirection.update();    
      chartWindIntensity.update();
      chartRainHeight.update();
	  
    } catch (err) {
      console.error(err);
    }
  };
});

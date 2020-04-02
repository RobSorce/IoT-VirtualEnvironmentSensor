
const config = {
  endpoint: "https://iot-virtualenv-db.documents.azure.com:443/",
  key: "b781QuJB71i5InxBZ7wvoYELFuaK1X1RYXMWgOJbDvOxfqiXxDGO7KBmRyxUVGTzH7YFEfTkqyeFvJfAAaLpMQ==",
  databaseId: "iotmessages",
  containerId: "iotitems",
  partitionKey: { kind: "Hash", paths: ["/category"] }
};
  
module.exports = config;
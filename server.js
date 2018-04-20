var WebSocketServer = require('websocket').server;
var http = require('http');
var server = http.createServer(function (request, response) {
  response.writeHead(404);
  response.end();
});
server.listen(9393, function () {});
wsServer = new WebSocketServer({
  httpServer: server,
  autoAcceptConnections: false
});

var timerId;
var connections = [];
var interval;
var isStart = 1;

function sendAll(data){
  for (var connection of connections){
    connection.sendUTF(JSON.stringify(data));
  }
}

function newTimer(time){
  interval = time;
  if (!timerId){
    timerId = setInterval(function() {
      if (isStart && interval >= 0){
        otvet = {
          time: interval
        }
        interval--;
        sendAll(otvet)
      }
    }, 1000);
  }
}

wsServer.on('request', function (request) {
  var connection = request.accept('echo-protocol', request.origin);
  console.log((new Date()) + ' Connection accepted.');
  connections.push(connection);
  connection.index = connections.length - 1
  connection.on('message', function (message) {
    if (message.type === 'utf8') {
      console.log('Received: ' + message.utf8Data);
      var data = JSON.parse(message.utf8Data);
      console.log(data);
      if (data.command === 'setMinutes'){
        newTimer(data.minutes)
      }
      else if (data.command === 'pause'){
        isStart = !isStart
        sendAll(data)
      }
    }
  });
  connection.on('close', function (reasonCode, description) {
    console.log((new Date()) + ' Peer ' + connection.remoteAddress + ' disconnected.');
    connections.slice(connection.index, 1)
  });
});
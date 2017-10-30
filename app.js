const env = process.env.NODE_ENV === 'production' ? 'prod' : 'dev'
const config = require('./config/config.' + env + '.js')
const express = require('express')
const app = express()
const server = require('http').createServer(app)
const WebSocketServer = require('websocket').server;
const port = config.PORT
const base_uri = config.BASE_URI

// list of currently connected clients (users)
const clients = []

console.log(`Server Run / Mode ${env} / Port ${port}`)

app.use(express.static('front'));

app.all('*', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

app.get('/', function (req, res, next) {
  res.sendfile(`${__dirname}/front/index.html`);
  app.use(express.static(`${__dirname}/front`));
});

/**
 * HTTP server
 */

server.listen(port)

app.get('/scores', function (req, res) {
  res.json({
  });
});

app.get('/consultants', function (req, res) {
  res.json({
  });
});

/**
 * WebSocket server
 */

wsServer = new WebSocketServer({
  httpServer: server,
  autoAcceptConnections: false
});

wsServer.on('request', function (request) {
  console.log((new Date()) + ' Connection from origin ' + request.origin + '.');

  var connection = request.accept(null, request.origin);
  var index = clients.push(connection) - 1;

  console.log((new Date()) + ' Connection accepted.');
  console.log((new Date()) + ' Clients connected : ' + clients.length);

  // send back scores ...

  connection.send(JSON.stringify({ type: 'scores', data: '12-12-19' }));
  connection.send(JSON.stringify({ type: 'consultants', data: 'moi-toi-lui' }));

  // client sent some message
  connection.on('message', function (message) {
    console.log(`message : ${message}`)
  });

  // user disconnected
  connection.on('close', function (connection) {
    console.log((new Date()) + " Peer " + connection.remoteAddress + " disconnected.");
    // remove user from the list of connected clients
    clients.splice(index, 1);
  });

});

const config = require('./config/config.js')
const express = require('express')
const app = express()
const server = require('http').createServer(app)
const firebase = require('firebase');
const port = config.PORT

// list of currently connected clients (users)
const clients = []

console.log(`Server Run / Port ${port}`)

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
 * Firebase
 */

console.log(config.FIREBASE_API_KEY);

firebase.initializeApp({
  apiKey: config.FIREBASE_API_KEY,
  databaseURL: `https://${config.FIREBASE_ID}.firebaseio.com`
});

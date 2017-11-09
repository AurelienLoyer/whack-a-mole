const config = require('./config/config.js')
const express = require('express')
const app = express()
const server = require('http').createServer(app)
const firebase = require('firebase')
const WebSocketServer = require('websocket').server
const port = config.PORT

const Game = require('./Game')
const WsManager = require('./WsConnectionManager')
const GpioManager = require('./GpioManager')
const KeyboardManager = require('./KeyboardManager')


/**
 * HTTP server
 */

app.use(express.static('front'))

app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "X-Requested-With")
    next()
})

app.get('/', function (req, res, next) {
    res.sendfile(`${__dirname}/front/index.html`)
    app.use(express.static(`${__dirname}/front`))
})

server.listen(port)

app.get('/scores', function (req, res) {
    res.json({
    })
})

app.get('/consultants', function (req, res) {
    res.text('OK')
})

/**
 * Firebase
 */

firebase.initializeApp({
    apiKey: config.FIREBASE_API_KEY,
    databaseURL: `https://${config.FIREBASE_ID}.firebaseio.com`
})

const zenikien = firebase.database().ref('zenikiens')
zenikien.on("value", function (snapshot) {
    console.log(snapshot.val())
})

/**
 * WebSocket server
 */

wsServer = new WebSocketServer({
    httpServer: server,
    autoAcceptConnections: false
})

wsServer.on('request', function (request) {

    let connection = request.accept(null, request.origin)

    // Create new instance of game and Websocket Manager
    const game = new Game()
    const wsManager = new WsManager(connection)
    const keyBoardManager = new KeyboardManager()

    // Game listen all event incoming from the Front
    wsManager.addListeners(game.listener.bind(game))

    // WS will send any game action
    game.addListeners(wsManager.listener.bind(wsManager))

    keyBoardManager.addListeners(game.listener.bind(game))
    keyBoardManager.addListeners(wsManager.listener.bind(wsManager))

    // Gpio make the bridge
    const gpioManager = new GpioManager()

})


console.log(`Server Run / Port ${port}`)

/**
 * Hardware code
 */

const onoff = require('onoff');
const Gpio = onoff.Gpio;

const leds = [
    new Gpio(ledsPins[0], 'out'), new Gpio(ledsPins[1], 'out'), new Gpio(ledsPins[2], 'out'),
    new Gpio(ledsPins[3], 'out'), new Gpio(ledsPins[4], 'out'), new Gpio(ledsPins[5], 'out'),
    new Gpio(ledsPins[6], 'out'), new Gpio(ledsPins[7], 'out'), new Gpio(ledsPins[8], 'out'),
];

const buttons = require('rpi-gpio-buttons')(buttonsPins);
buttons.setTiming({
    pressed: 100,
    clicked: 100,
});

buttons.on('pressed', function (pin) {
    broadcast({ type: 'press', data: buttonsPins.indexOf(pin) + 1 });
});

const config = require('./config/config.js')
const express = require('express')
const app = express()
const server = require('http').createServer(app)
const WebSocketServer = require('websocket').server
const port = config.PORT

const Game = require('./server/Game')
const WsManager = require('./server/WsConnectionManager')
const KeyboardManager = require('./server/KeyboardManager')
const FirebaseManager = require('./server/FirebaseManager')

const isPi = require('./server/isPi')

let GpioManager
if (isPi()) {
    GpioManager = require('./server/GpioManager')
}

/**
 * HTTP server
 */

app.use(express.static('front'))

app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "X-Requested-With")
    next()
})

app.get('/', function(req, res, next) {
    res.sendfile(`${__dirname}/front/index.html`)
    app.use(express.static(`${__dirname}/front`))
})

server.listen(port)

app.get('/scores', function(req, res) {
    res.json({})
})

app.get('/consultants', function(req, res) {
    res.text('OK')
})

/**
 * WebSocket server
 */

wsServer = new WebSocketServer({
    httpServer: server,
    autoAcceptConnections: false
})

wsServer.on('request', function(request) {
    let connection = request.accept(null, request.origin)

    // Create new instance of game and Websocket Manager
    const game = new Game()
    const wsManager = new WsManager(connection)
    const keyBoardManager = new KeyboardManager()
    const firebaseManager = new FirebaseManager()

    // Game listen all event incoming from the Front
    wsManager.addListeners(game.listener.bind(game))
    wsManager.addListeners(firebaseManager.listener.bind(firebaseManager))

    // WS will send any game action
    game.addListeners(firebaseManager.listener.bind(firebaseManager))
    game.addListeners(wsManager.listener.bind(wsManager))

    keyBoardManager.addListeners(game.listener.bind(game))
    keyBoardManager.addListeners(wsManager.listener.bind(wsManager))

    firebaseManager.addListeners(game.listener.bind(game))
    firebaseManager.addListeners(wsManager.listener.bind(wsManager))

    // Gpio make the bridge
    if (GpioManager) {
        const gpioManager = new GpioManager()
        gpioManager.addListeners(game.listener.bind(wsManager))
    }
})


console.log(`Server Run / Port ${port}`)

const config = require('./config/config.js')
const express = require('express')
const app = express()
const server = require('http').createServer(app)
const firebase = require('firebase');
const WebSocketServer = require('websocket').server;
const keypress = require('keypress');
const port = config.PORT

// list of currently connected clients (users)
const clients = []
const keymap = [
    'a', 'z', 'e',
    'q', 's', 'd',
    'w', 'x', 'c',
]

console.log(`Server Run / Port ${port}`)

/**
 * Listen Keypress for dev :)
 */

keypress(process.stdin);

process.stdin.on('keypress', function (ch, key) {
    if (key) {
        let index = keymap.indexOf(key.name) + 1
        console.log(index)
        broadcast({ type: 'press', data: index })
    }
    if (key && key.ctrl && key.name == 'c') {
        process.stdin.pause();
        process.exit();
    }
});

process.stdin.setRawMode(true);
process.stdin.resume();

/**
 * HTTP server
 */

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

server.listen(port)

app.get('/scores', function (req, res) {
    res.json({
    });
});

app.get('/consultants', function (req, res) {
    res.text('OK');
});

/**
 * Firebase
 */

firebase.initializeApp({
    apiKey: config.FIREBASE_API_KEY,
    databaseURL: `https://${config.FIREBASE_ID}.firebaseio.com`
});

const zenikien = firebase.database().ref('zenikien');
zenikien.on("value", function (snapshot) {
    console.log(snapshot.val())
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

    let connection = request.accept(null, request.origin);
    let index = clients.push(connection) - 1;

    console.log((new Date()) + ' Connection accepted.');
    console.log((new Date()) + ' Clients connected : ' + clients.length);

    // client sent some message
    connection.on('message', function (message) {
        let decodedMessage = JSON.parse(message.utf8Data);
        console.log(decodedMessage)
        if (decodedMessage.type === 'start') {
            startGame(decodedMessage.data);
        }
    });

    // user disconnected
    connection.on('close', function (connection) {
        console.log(connection)
        console.log((new Date()) + " Peer " + connection.remoteAddress + " disconnected.");
        // remove user from the list of connected clients
        clients.splice(index, 1);
    });

});

function broadcast(message) {
    console.log('\x1b[33m%s\x1b[0m', JSON.stringify(message));
    clients.map(client => client.send(JSON.stringify(message)));
}

/**
 * Game functions and settings
 */

let currentUser = {};
const partyTime = 10;
let partyLoop;
lastPopIndex = 99;
lastPopImage = 99;

function startGame(user) {
    currentUser = user;
    broadcast({
        type: 'game',
        data: {
            time: partyTime,
            user: currentUser,
        }
    })

    // wait 3 secondes (3 2 1 GO display...)
    setTimeout(() => {
        sendRandoms();
    }, 3000);
}

function sendRandoms() {
    let i = 0;
    partyLoop = setInterval(() => {
        broadcast({
            type: 'pop',
            data : {
                index: getRandomBallIndex(),
                image: getRandomImage()
            }
        });
        i++;
        if (i > partyTime){
            endGame()
        }
    }, 1000)
}

function endGame() {
    clearInterval(partyLoop)
    broadcast({
        type: 'end',
        data: {
            score: 2451,
            user: currentUser,
        }
    })
}

function getRandomBallIndex() {
    let randomNumber = Math.floor((Math.random() * 8) + 1);
    while(randomNumber === lastPopIndex) {
        randomNumber = Math.floor((Math.random() * 8) + 1);
    }
    lastPopIndex = randomNumber
    return randomNumber;
}

function getRandomImage() {
    return `./statics/img/Zenika-${getRandomImageIndex()}.jpg`;
}

function getRandomImageIndex() {
    let randomNumber = Math.floor((Math.random() * 23) + 1);
    while(randomNumber === lastPopIndex) {
        randomNumber = Math.floor((Math.random() * 23) + 1);
    }
    lastPopImage = randomNumber
    return randomNumber;
}

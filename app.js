const env = process.env.NODE_ENV === 'production' ? 'prod' : 'dev'
const config = require('./config/config.'+env+'.js')
const express = require('express')
const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server)
const port = config.PORT
const base_uri = config.BASE_URI

server.listen(port)
console.log(`Server Run / Mode ${env} / Port ${port}`)

app.use(express.static('front'));

app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

app.get('/', function(req, res,next) {
  res.sendfile(`${__dirname}/front/index.html`);
  app.use(express.static(`${__dirname}/front`));
});

server.listen(3000);

app.get('/infos', function (req, res) {
  res.json({
      who: who,
      formation: formation,
      teacher: teacher
  });
});

// Side live connexion :° !
io.on('connection', function (socket) {
  socket.emit('scores', []);
});

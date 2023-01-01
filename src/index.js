const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const http = require('http');
const WebSocket = require('ws');

const app = express();

const server = http.createServer(app);

const config = require('./config/config');
const dbconnect = require('./common/db/dbconnect');
const connectSocket = require('./common/connectSocket');
const launchSocketConnChecks = require('./common/launchSocketConnChecks');
const routes = require('./routes');

const verifyToken = require('./middlewares/verifyToken');

dotenv.config();

const corsOptions = {
  origin: config.clientHost,
};

const wss = new WebSocket.Server({
  server,
  path: '/ws/chat',
});

dbconnect();
connectSocket(wss);
launchSocketConnChecks(wss);

app.use(express.json());
app.use(express.urlencoded({
  extended: true,
}));

app.use('/auth', cors(corsOptions), routes.auth);
app.use('/api', cors(corsOptions), verifyToken, routes.api);

app.get('/health', cors(), (req, res) => {
  res.send("I'm working");
});

server.listen(config.port, () => {
  console.info(`Listening on *:${config.port}`);
});

process.on('unhandledRejection', (error) => {
  console.error('unhandledRejection', error.message);
});

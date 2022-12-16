const express = require('express');
const dotenv = require('dotenv');

const config = require('./config/config');
const dbconnect = require('./common/dbconnect');
const routes = require('./routes');

const verifyToken = require('./middlewares/verifyToken');

dotenv.config();

dbconnect();

const app = express();

app.use(express.json());
app.use(express.urlencoded({
  extended: true,
}));

app.use('/auth', routes.auth);
app.use('/api', verifyToken, routes.api);

app.get('/health', (req, res) => {
  res.send("I'm working");
});

app.listen(config.port, () => {
  console.info(`Listening on *:${config.port}`);
});

process.on('unhandledRejection', (error) => {
  console.error('unhandledRejection', error.message);
});

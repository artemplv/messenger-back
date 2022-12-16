const mongoose = require('mongoose');
const config = require('../config/config');

const {
  dbUser,
  dbPassword,
  dbHost,
  dbPort,
  dbName,
} = config;

const connectionOptions = 'authMechanism=DEFAULT&authSource=admin';
const connectionString = `mongodb://${dbUser}:${dbPassword}@${dbHost}:${dbPort}/${dbName}?${connectionOptions}`;

const dbconnect = async () => {
  try {
    await mongoose.connect(connectionString, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.info('connected to db');
  } catch (error) {
    console.error('db connection error:', error);
  }
};

module.exports = dbconnect;

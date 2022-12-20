const createMessage = require('./createMessage');
const getMessages = require('./getMessages');

const messagesController = {
  create: createMessage,
  get: getMessages,
};

module.exports = messagesController;

const createChat = require('./createChat');
const getChats = require('./getChats');

const chatsController = {
  create: createChat,
  get: getChats,
};

module.exports = chatsController;

const createChat = require('./createChat');
const getChats = require('./getChats');
const addUsersToChat = require('./addUsersToChat');
const getChatUsers = require('./getChatUsers');
const removeUsersFromChat = require('./removeUsersFromChat');

const chatsController = {
  create: createChat,
  get: getChats,
  addToChat: addUsersToChat,
  getUsers: getChatUsers,
  removeUsers: removeUsersFromChat,
};

module.exports = chatsController;

const createChat = require('./createChat');
const getChats = require('./getChats');
const getChat = require('./getChat');
const addUsersToChat = require('./addUsersToChat');
const getChatUsers = require('./getChatUsers');
const removeUsersFromChat = require('./removeUsersFromChat');
const uploadImage = require('./uploadImage');

const chatsController = {
  create: createChat,
  get: getChats,
  getById: getChat,
  addToChat: addUsersToChat,
  getUsers: getChatUsers,
  removeUsers: removeUsersFromChat,
  uploadImage,
};

module.exports = chatsController;

/* eslint-disable no-param-reassign */
const url = require('url');

const verifyToken = require('../middlewares/verifyChatSocketToken');
const {
  get,
  create,
} = require('../controllers/messages');

const messageTypesHandlers = {
  'get old': get,
  message: create,
};

const connectSocket = (wss) => wss.on('connection', async (socket, request) => {
  console.info('New socket connection');

  socket.isAlive = true;

  const {
    token,
  } = url.parse(request.url, true).query;

  const userId = await verifyToken(token);
  if (!userId) {
    socket.terminate();
    return;
  }

  socket.on('pong', () => {
    socket.isAlive = true;
  });

  socket.userId = userId;

  socket.on('message', async (message) => {
    const {
      chatId,
      type,
      content,
    } = JSON.parse(message);

    const canAccessChat = await verifyToken(token, chatId);

    if (!canAccessChat) {
      return;
    }

    const handler = messageTypesHandlers[type];

    if (handler) {
      handler(wss, socket)(chatId, content);
    }
  });
});

module.exports = connectSocket;

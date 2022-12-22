const Message = require('../../models/message');
const Chat = require('../../models/chat');

const createMessage = (wss, socket) => async (content) => {
  const {
    userId,
    chatId,
  } = socket;

  const message = new Message({
    content,
    chatId,
    userId,
  });

  try {
    const newMessage = await message.save();

    const dataToSend = {
      content,
      userId,
    };

    wss.clients.forEach((client) => {
      if (client.chatId === chatId) {
        client.send(JSON.stringify(dataToSend));
      }
    });

    Chat.findByIdAndUpdate(chatId, { lastMessage: newMessage.id }).exec();
  } catch (err) {
    console.error(err);
  }
};

module.exports = createMessage;

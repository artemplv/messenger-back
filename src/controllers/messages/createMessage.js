const Message = require('../../models/message');

const createMessage = (wss, socket) => async (content) => {
  const { userId } = socket;
  const { chatId } = socket;

  const newMessage = new Message({
    content,
    chatId,
    userId,
  });

  try {
    await newMessage.save();

    const dataToSend = {
      content,
      userId,
    };

    wss.clients.forEach((client) => {
      if (client.chatId === chatId) {
        client.send(JSON.stringify(dataToSend));
      }
    });
  } catch (err) {
    console.error(err);
  }
};

module.exports = createMessage;

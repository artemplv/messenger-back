const Message = require('../../models/message');
const Chat = require('../../models/chat');

const createMessage = (wss, socket) => async (chatId, content) => {
  const {
    userId,
  } = socket;

  const message = new Message({
    content,
    chatId,
    userId,
  });

  try {
    const newMessage = await message.save();

    Chat.findByIdAndUpdate(chatId, { lastMessage: newMessage.id }).exec();

    const chat = await Chat.findById(chatId, 'userIds');

    const dataToSend = {
      type: 'new message',
      chatId,
      data: {
        content,
        userId,
        createdAt: newMessage.createdAt,
      },
    };

    wss.clients.forEach((client) => {
      if (chat.userIds.includes(client.userId)) {
        client.send(JSON.stringify(dataToSend));
      }
    });
  } catch (err) {
    console.error(err);
  }
};

module.exports = createMessage;

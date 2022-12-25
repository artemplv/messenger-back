const Message = require('../../models/message');
const Chat = require('../../models/chat');

const createAiResponse = require('./ai/createResponse');

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

    let chat = await Chat.findById(chatId, 'userIds type _aiPrompt');

    chat.lastMessage = newMessage.id;

    const dataToSend = {
      type: 'new message',
      chatId,
      pauseChat: chat.type === 'ai',
      data: {
        id: newMessage.id,
        content,
        userId,
        createdAt: newMessage.createdAt,
      },
    };

    const chatClients = [];

    wss.clients.forEach((client) => {
      if (chat.userIds.includes(client.userId)) {
        chatClients.push(client);
        client.send(JSON.stringify(dataToSend));
      }
    });

    chat = await chat.save();

    if (chat.type === 'ai') {
      chat._aiPrompt = `${chat._aiPrompt || ''}[USER]:${newMessage.content}[FRIEND]:`;
      createAiResponse(chat, chatClients);
    }
  } catch (err) {
    console.error(err);
  }
};

module.exports = createMessage;

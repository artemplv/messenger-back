const mongoose = require('mongoose');
const Message = require('../../models/message');

const getMessages = (_, socket) => async () => {
  const { chatId } = socket;

  try {
    const messages = await Message.find({
      chatId: mongoose.Types.ObjectId(chatId),
    }, '-_id').sort({ createdAt: 'desc' });

    socket.send(JSON.stringify(messages));
  } catch (error) {
    console.error(error);
  }
};

module.exports = getMessages;

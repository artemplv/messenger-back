const Chat = require('../../models/chat');
const User = require('../../models/user');

const getChatUsers = async (req, res) => {
  const {
    params: {
      chatId,
    },
  } = req;

  const userFieldsToSelect = 'id firstName lastName username';

  try {
    const chat = await Chat.findById(chatId).populate('userIds', userFieldsToSelect);

    if (!chat) {
      res.status(404).send('Chat not found');
    }

    res.status(200).send(chat.userIds || []);
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: err });
  }
};

module.exports = getChatUsers;

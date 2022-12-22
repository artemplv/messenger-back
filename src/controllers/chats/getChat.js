const Chat = require('../../models/chat');

const getChat = async (req, res) => {
  const {
    chatId,
  } = req.params;

  const userFieldsToSelect = 'id firstName lastName username';

  try {
    const chat = await Chat.findById(chatId).populate('users', userFieldsToSelect);

    res.status(200).send(chat);
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: err });
  }
};

module.exports = getChat;

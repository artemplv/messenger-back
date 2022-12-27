const Chat = require('../../models/chat');
const Message = require('../../models/message');

const getChat = async (req, res) => {
  const {
    user,
  } = req;

  const {
    chatId,
  } = req.params;

  const userFieldsToSelect = 'id firstName lastName username avatar';

  try {
    const chat = await Chat.findById(chatId).populate('users', userFieldsToSelect);
    const unreadMessagesCount = await Message.count({
      chatId,
      readByUsers: { $nin: [user.id] },
    });

    res.status(200).send({
      ...chat.toJSON(),
      unreadMessagesCount,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: err });
  }
};

module.exports = getChat;

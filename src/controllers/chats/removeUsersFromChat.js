const mongoose = require('mongoose');
const Chat = require('../../models/chat');
const ensureArray = require('../../common/ensureArray');

const removeUsersFromChat = async (req, res) => {
  const {
    body: {
      users,
    },
    params: {
      chatId,
    },
  } = req;

  const usersToRemove = ensureArray(users);

  try {
    const chat = await Chat.findById(chatId);

    if (!chat) {
      res.status(404).send({ message: 'Chat not found' });
    }

    usersToRemove.forEach((userId) => {
      if (chat.userIds.includes(userId)) {
        chat.userIds.pull(mongoose.Types.ObjectId(userId));
      }
    });

    await chat.save();
    res.status(200).send();
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: err });
  }
};

module.exports = removeUsersFromChat;

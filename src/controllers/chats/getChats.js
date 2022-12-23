const mongoose = require('mongoose');
const Chat = require('../../models/chat');

const sortOptions = {
  lastMessage: 'desc',
  'lastMessage.createdAt': 'desc',
  createdAt: 'desc',
};

const getChats = async (req, res) => {
  const {
    user,
  } = req;

  try {
    const userChats = await Chat.find({ userIds: mongoose.Types.ObjectId(user.id) })
      .populate('lastMessage', 'userId content createdAt').sort(sortOptions);

    res.status(200).send(userChats);
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: err });
  }
};

module.exports = getChats;

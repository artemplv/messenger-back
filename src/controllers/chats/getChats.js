const mongoose = require('mongoose');
const Chat = require('../../models/chat');

const getChats = async (req, res) => {
  const {
    user,
  } = req;

  try {
    const userChats = await Chat.find({ userIds: mongoose.Types.ObjectId(user.id) });
    res.status(200).send({ data: userChats });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: err });
  }
};

module.exports = getChats;

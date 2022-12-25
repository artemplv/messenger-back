const mongoose = require('mongoose');
const Chat = require('../../models/chat');

const getChats = async (req, res) => {
  const {
    user,
  } = req;

  try {
    const userChats = await Chat.aggregate(
      [
        {
          $match: {
            userIds: {
              $in: [
                mongoose.Types.ObjectId(user.id),
              ],
            },
          },
        }, {
          $lookup: {
            from: 'messages',
            localField: 'lastMessage',
            foreignField: '_id',
            as: 'lastMessage',
          },
        }, {
          $lookup: {
            from: 'messages',
            localField: '_id',
            foreignField: 'chatId',
            as: 'unreadMessages',
            pipeline: [
              {
                $match: {
                  readByUsers: {
                    $nin: [
                      mongoose.Types.ObjectId(user.id),
                    ],
                  },
                },
              },
            ],
          },
        }, {
          $set: {
            lastMessage: {
              $arrayElemAt: [
                '$lastMessage', 0,
              ],
            },
          },
        }, {
          $addFields: {
            id: '$_id',
            'lastMessage.id': '$lastMessage._id',
            unreadMessagesCount: {
              $size: '$unreadMessages',
            },
          },
        }, {
          $project: {
            _id: 0,
            __v: 0,
            _aiPrompt: 0,
            'lastMessage._id': 0,
            'lastMessage.__v': 0,
            'lastMessage.readByUsers': 0,
            'lastMessage.chatId': 0,
            unreadMessages: 0,
          },
        }, {
          $sort: {
            'lastMessage.createdAt': -1,
            createdAt: -1,
          },
        },
      ],
    );

    res.status(200).send(userChats);
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: err });
  }
};

module.exports = getChats;

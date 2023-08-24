import mongoose from 'mongoose';

export const conversationsQuery = (userId) => ([
  // match conversations with the user
  {
    $match: {
      participants: {
        $all: [mongoose.Types.ObjectId(userId)],
      },
    },
  },
  // get the last message
  {
    $addFields: {
      lastMessage: {
        $last: '$messages',
      },
    },
  },
  // remove messages from the result
  {
    $project: {
      messages: 0,
    },
  },
  // lookup the last message
  {
    $lookup: {
      from: 'messages',
      localField: 'lastMessage',
      foreignField: '_id',
      as: 'lastMessage',
    },
  },
  // unwind the last message array
  {
    $unwind: {
      path: '$lastMessage',
    },
  },
  // {
  //   $lookup: {
  //     from: 'messages',
  //     localField: 'messages',
  //     foreignField: '_id',
  //     as: 'messages',
  //   },
  // },
  // lookup the participants
  {
    $lookup: {
      from: 'users',
      localField: 'participants',
      foreignField: '_id',
      as: 'participants',
    },
  },
  // remove password and isCreator from participants
  {
    $project: {
      'participants.password': 0,
      'participants.isCreator': 0,
    },
  },
  // unwind the participants array
  {
    $unwind: {
      path: '$participants',
    },
  },
  // lookup the participants' images
  {
    $lookup: {
      from: 'images',
      localField: 'participants.image',
      foreignField: '_id',
      as: 'participants.image',
    },
  },
  // unwind the participants' images array
  {
    $unwind: {
      path: '$participants.image',
      preserveNullAndEmptyArrays: true,
    },
  },
  // group the conversations
  {
    $group: {
      _id: '$_id',
      participants: {
        $push: '$participants',
      },
      // messages: {
      //   $first: '$messages',
      // },
      lastMessage: {
        $first: '$lastMessage',
      },
      updatedAt: {
        $first: '$updatedAt',
      },
      createdAt: {
        $first: '$createdAt',
      },
    },
  },
  // sort the conversations by last updated
  {
    $sort: {
      updatedAt: -1,
    },
  },
]);

export const conversationQuery = (conversationId) => ([
  // match the conversation
  {
    $match: {
      _id: mongoose.Types.ObjectId(conversationId),
    },
  },
  // lookup the messages
  {
    $lookup: {
      from: 'messages',
      localField: 'messages',
      foreignField: '_id',
      as: 'messages',
    },
  },
  // lookup the participants
  {
    $lookup: {
      from: 'users',
      localField: 'participants',
      foreignField: '_id',
      as: 'participants',
    },
  },
  // remove password and isCreator from participants
  {
    $project: {
      'participants.password': 0,
      'participants.isCreator': 0,
    },
  },
  // unwind the participants array
  {
    $unwind: {
      path: '$participants',
    },
  },
  // lookup the participants' images
  {
    $lookup: {
      from: 'images',
      localField: 'participants.image',
      foreignField: '_id',
      as: 'participants.image',
    },
  },
  // unwind the participants' images array
  {
    $unwind: {
      path: '$participants.image',
      preserveNullAndEmptyArrays: true,
    },
  },
  // group the conversation
  {
    $group: {
      _id: '$_id',
      participants: {
        $push: '$participants',
      },
      messages: {
        $first: '$messages',
      },
      updatedAt: {
        $first: '$updatedAt',
      },
      createdAt: {
        $first: '$createdAt',
      },
    },
  },
  // sort the messages by when it was sent
  {
    $addFields: {
      messages: {
        $sortArray: {
          input: '$messages',
          sortBy: {
            createdAt: 1,
          },
        },
      },
    },
  },
]);

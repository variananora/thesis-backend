import mongoose from 'mongoose';
import { paginationQuery, sorterQuery } from './UniversalQuery';
import { userLookupQuery } from './UserQuery';

// lookup image
const imageLookupQuery = [
  {
    $lookup: {
      from: 'images',
      localField: 'image',
      foreignField: '_id',
      as: 'image',
    },
  },
  {
    $unwind: {
      path: '$image',
    },
  },
];

// match buyer or creator
const matchBuyerOrCreator = (userId, isCreator) => {
  if (isCreator) {
    return [{
      $match: {
        creatorId: mongoose.Types.ObjectId(userId),
      },
    }];
  }

  return [{
    $match: {
      buyerId: mongoose.Types.ObjectId(userId),
    },
  }];
};

// match paid status
export const matchPaidStatus = (isCreator) => {
  if (!isCreator) {
    return [];
  }

  return [
    {
      $match: {
        paymentStatus: 'PAID',
      },
    }];
};

export const orderQuery = (userId, isCreator) => {
  const sorter = {
    name: 'createdAt',
    order: 'desc',
  };
  return [
    ...matchBuyerOrCreator(userId, isCreator),
    ...matchPaidStatus(isCreator),
    ...sorterQuery(sorter),
    ...userLookupQuery('creatorId'),
    ...userLookupQuery('buyerId'),
    ...imageLookupQuery,
  ];
};

export const orderQueryWithPagination = (userId, page, pageSize, isCreator) => ([
  ...orderQuery(userId, isCreator),
  ...paginationQuery(page, pageSize),
]);

export const timelineOrderQuery = (userId) => ([
  ...matchBuyerOrCreator(userId, true),
  ...userLookupQuery('creatorId'),
  ...userLookupQuery('buyerId'),
  ...imageLookupQuery,
  {
    // process timeline
    $facet: {
      // pending order
      pending: [
        // match pending order
        {
          $match: {
            status: 'PENDING',
            paymentStatus: 'PAID',
          },
        },
        {
          $sort: {
            updatedAt: -1,
          },
        },
      ],
      // ongoing order
      ongoing: [
        // match ongoing order
        {
          $match: {
            $or: [
              { status: 'IN_PROGRESS' },
              { status: 'FINISHING' },
              { status: 'REVISION' },
            ],
          },
        },
        {
          $sort: {
            updatedAt: -1,
          },
        },
      ],
      // completed order
      completed: [
        // match completed order
        {
          $match: {
            $or: [
              { status: 'COMPLETED' },
              { status: 'CANCELLED' },
            ],
            paymentStatus: 'PAID',
            // only show order in last 7 days
            updatedAt: {
              $gte: new Date(new Date().getTime() - (7 * 24 * 60 * 60 * 1000)),
            },
          },
        },
        {
          $sort: {
            updatedAt: -1,
          },
        },
      ],
    },
  },
]);

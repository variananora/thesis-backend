import mongoose from 'mongoose';
import { paginationQuery, searchQuery, sorterQuery } from './UniversalQuery';
import { userLookupQuery } from './UserQuery';

const commissionFilterQuery = (filters) => {
  if (!filters) {
    return [];
  }

  return [
    {
      $match: {
        ...(filters.userId && { userId: mongoose.Types.ObjectId(filters.userId) }),
        ...(filters.category && { category: filters.category }),
        ...((filters.min || filters.max) && {
          price: {
            ...(filters.min && { $gt: filters.min }),
            ...(filters.max && { $lt: filters.max }),
          },
        }),
      },
    },
  ];
};

// lookup cover image
const coverLookupQuery = [
  {
    $lookup: {
      from: 'images',
      localField: 'cover',
      foreignField: '_id',
      as: 'cover',
    },
  },
  {
    $unwind: {
      path: '$cover',
    },
  },
];

export const commissionQuery = (filters, sorter, searchKeyword) => ([
  ...commissionFilterQuery(filters),
  ...searchQuery(searchKeyword, ['title', 'category', 'features']),
  ...sorterQuery(sorter),
  ...userLookupQuery('userId'),
  ...coverLookupQuery,
]);

export const commissionQueryWithPagination = (filters, sorter, searchKeyword, page, pageSize) => ([
  ...commissionQuery(filters, sorter, searchKeyword),
  ...paginationQuery(page, pageSize),
]);

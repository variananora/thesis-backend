import mongoose from 'mongoose';
import { paginationQuery } from './UniversalQuery';
import { userLookupQuery } from './UserQuery';

const reviewBaseQuery = (commissionId) => [
  {
    $match: {
      commissionId: mongoose.Types.ObjectId(commissionId),
    },
  },
  ...userLookupQuery('userId'),
];

export const reviewQuery = (commissionId, filters, sorter) => [
  ...reviewBaseQuery(commissionId),
];

export const reviewQueryWithPagination = (commissionId, filters, sorter, page, pageSize) => [
  ...reviewQuery(commissionId, filters, sorter),
  ...paginationQuery(page, pageSize),
];

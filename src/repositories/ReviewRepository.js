import { first } from 'lodash';
import Review from '../models/Review';
import { reviewQueryWithPagination } from './queries/ReviewQuery';

export const saveReview = async (review) => Review
  .create(review);

export const fetchReviews = async (commissionId, filters, sorter, page, pageSize) => {
  const query = reviewQueryWithPagination(commissionId, filters, sorter, page, pageSize);
  return first(await Review.aggregate(query));
};

export const fetchReviewById = async (reviewId) => Review
  .findById(reviewId);

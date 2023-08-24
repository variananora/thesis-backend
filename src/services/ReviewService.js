import createError from 'http-errors';
import httpStatus from 'http-status';
import { fetchReviews, saveReview } from '../repositories/ReviewRepository';
import { updateCommissionRating } from './CommissionService';
import { fetchOrderById, updateOrder } from '../repositories/OrderRepository';

export const createReview = async (userId, body) => {
  const {
    orderId,
    commissionId,
    star,
    review,
  } = body;

  const order = await fetchOrderById(orderId);

  if (order?.reviewId) {
    throw createError(httpStatus.FORBIDDEN, 'You have already created a review for this order!');
  }

  const reviewData = {
    commissionId,
    userId,
    star,
    review,
  };

  await updateCommissionRating(commissionId, star);
  const savedReview = await saveReview(reviewData);

  return updateOrder(orderId, { reviewId: savedReview._id });
};

// eslint-disable-next-line max-len
export const getReviews = async (commissionId, filters, sorter, page, pageSize) => fetchReviews(commissionId, filters, sorter, page, pageSize);

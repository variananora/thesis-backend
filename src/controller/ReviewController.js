import httpStatus from 'http-status';
import { createReview, getReviews } from '../services/ReviewService';

export const registerReview = async (req, res, next) => {
  try {
    const { userId } = req;

    const review = await createReview(userId, req.body);

    res.status(httpStatus.CREATED);
    res.send(review);
  } catch (error) {
    next(error);
  }
};

export const obtainReviews = async (req, res, next) => {
  try {
    const { commissionId } = req.params;
    const {
      filters,
      sorter,
      page,
      pageSize,
    } = req.query;

    const reviews = await getReviews(commissionId, filters, sorter, page, pageSize);

    res.status(httpStatus.OK);
    res.send(reviews);
  } catch (error) {
    next(error);
  }
};

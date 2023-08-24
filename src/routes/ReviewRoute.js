import express from 'express';
import { obtainReviews, registerReview } from '../controller/ReviewController';
import checkToken from '../middlewares/CheckToken';

const reviewRoute = express.Router();

reviewRoute.post('/', checkToken, registerReview);
reviewRoute.get('/:commissionId', obtainReviews);

export default reviewRoute;

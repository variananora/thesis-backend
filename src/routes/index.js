import express from 'express';
import authRoute from './AuthRoute';
import commissionRoute from './CommissionRoute';
import conversationRoute from './ConversationRoute';
import orderRoute from './OrderRoute';
import reviewRoute from './ReviewRoute';
import imageRoute from './ImageRoute';
import userRoute from './UserRoute';

const router = express.Router();

// this is the index route
// all routes are defined in their own files

const indexRoutes = (app) => {
  app.use('/api', router);
  app.use('/auth', authRoute);
  app.use('/commission', commissionRoute);
  app.use('/conversation', conversationRoute);
  app.use('/order', orderRoute);
  app.use('/review', reviewRoute);
  app.use('/image', imageRoute);
  app.use('/user', userRoute);
};

export default indexRoutes;

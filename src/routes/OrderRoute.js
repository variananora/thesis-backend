import express from 'express';
import checkToken from '../middlewares/CheckToken';
import {
  completeOrder,
  confirmOrder,
  obtainBuyerOrders,
  obtainCreatorOrders,
  obtainTimelineOrder,
  registerOrder,
  updateOrderStatus,
  updateOrderStatusRevision,
} from '../controller/OrderController';

const orderRoute = express.Router();

orderRoute.get('/buyer', checkToken, obtainBuyerOrders);
orderRoute.get('/creator', checkToken, obtainCreatorOrders);
orderRoute.get('/timeline', checkToken, obtainTimelineOrder);
orderRoute.post('/:commissionId', checkToken, registerOrder);
orderRoute.put('/status/:orderId', checkToken, updateOrderStatus);
orderRoute.put('/revision/:orderId', checkToken, updateOrderStatusRevision);
orderRoute.put('/confirm/:orderId', checkToken, confirmOrder);
orderRoute.put('/complete/:orderId', checkToken, completeOrder);

export default orderRoute;

import { first } from 'lodash';
import Order from '../models/Order';
import { orderQueryWithPagination, timelineOrderQuery } from './queries/OrderQuery';

export const saveOrder = async (order) => Order
  .create(order);

export const fetchOrders = async (userId, page, pageSize, isCreator) => {
  const query = orderQueryWithPagination(userId, page, pageSize, isCreator);
  return first(await Order.aggregate(query));
};

export const fetchOrderById = async (orderId) => Order
  .findById(orderId);

export const updateOrder = async (orderId, updatedStatus) => Order
  .findOneAndUpdate(
    { _id: orderId },
    updatedStatus,
  );

export const updateOrderToken = async (orderId, token) => Order
  .findOneAndUpdate(
    { _id: orderId },
    { $set: { token } },
  );

export const fetchTimelineOrder = async (userId) => {
  const query = timelineOrderQuery(userId);
  return first(await Order.aggregate(query));
};

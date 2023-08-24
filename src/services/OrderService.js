import midtransClient from 'midtrans-client';
import { fetchCommissionById, updateCommissionSales } from '../repositories/CommissionRepository';
import {
  fetchOrderById,
  fetchOrders,
  fetchTimelineOrder,
  saveOrder,
  updateOrder as updateOrderRepository,
  updateOrderToken,
} from '../repositories/OrderRepository';
import {
  statusFromPaymentStatus,
  transactionStatusConstant,
} from '../constants/TransactionStatusConstant';

export const createOrder = async (userId, commissionId) => {
  const commission = await fetchCommissionById(commissionId);

  const order = {
    commissionId: commission._id,
    image: commission.cover._id,
    title: commission.title,
    price: commission.price,
    buyerId: userId,
    creatorId: commission.userId,
    maxRevision: commission.revisionNumber,
  };

  const createdOrder = await saveOrder(order);

  const parameter = {
    transaction_details: {
      order_id: `order-${createdOrder._id}`,
      gross_amount: commission.price,
    },
  };

  const apiClient = new midtransClient.Snap({
    isProduction: false,
    serverKey: process.env.MIDTRANS_SERVER_KEY,
    clientKey: process.env.MIDTRANS_CLIENT_KEY,
  });
  const token = await apiClient.createTransactionToken(parameter);

  await updateOrderToken(createdOrder._id, token);

  return token;
};

// eslint-disable-next-line max-len
export const getOrders = async (userId, page, pageSize, isCreator = false) => fetchOrders(userId, page, pageSize, isCreator);

export const confirmOrder = async (orderId) => {
  const apiClient = new midtransClient.Snap({
    isProduction: false,
    serverKey: process.env.MIDTRANS_SERVER_KEY,
    clientKey: process.env.MIDTRANS_CLIENT_KEY,
  });
  const transactionStatus = await apiClient.transaction.status(`order-${orderId}`);

  const paymentStatus = transactionStatusConstant(transactionStatus.status_code);
  const status = statusFromPaymentStatus(paymentStatus);

  const updatedStatus = {
    paymentStatus,
    status,
  };
  return updateOrderRepository(orderId, updatedStatus);
};

export const updateOrderStatus = async (orderId, status) => {
  if (!orderId) {
    throw new Error('Order id is required');
  }

  const updatedOrder = {
    status,
  };
  return updateOrderRepository(orderId, updatedOrder);
};

export const updateOrderStatusRevision = async (orderId) => {
  if (!orderId) {
    throw new Error('Order ID is required');
  }

  const order = await fetchOrderById(orderId);

  const updatedOrder = {
    status: 'REVISION',
    revision: (order.revision || 0) + 1,
  };
  return updateOrderRepository(orderId, updatedOrder);
};

export const completeOrder = async (orderId) => {
  if (!orderId) {
    throw new Error('Order id is required');
  }

  const order = await fetchOrderById(orderId);

  await updateCommissionSales(order.commissionId);

  const updatedOrder = { status: 'COMPLETED' };

  return updateOrderRepository(orderId, updatedOrder);
};

export const getTimelineOrder = async (userId) => fetchTimelineOrder(userId);

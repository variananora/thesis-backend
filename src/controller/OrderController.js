import httpStatus from 'http-status';
import {
  completeOrder as completeOrderService,
  confirmOrder as confirmOrderService,
  createOrder,
  getOrders,
  getTimelineOrder,
  updateOrderStatus as updateOrderStatusService,
  updateOrderStatusRevision as updateOrderStatusRevisionService,
} from '../services/OrderService';
import { ORDER_CONFIRMED, ORDER_STATUS_UPDATED } from '../constants/StatusMessages';

export const registerOrder = async (req, res, next) => {
  try {
    const {
      userId,
      params: { commissionId },
    } = req;

    const token = await createOrder(userId, commissionId);

    res.status(httpStatus.CREATED);
    res.send(token);
  } catch (error) {
    next(error);
  }
};

export const obtainBuyerOrders = async (req, res, next) => {
  try {
    const {
      userId,
      params: {
        page,
        pageSize,
      },
    } = req;

    const orders = await getOrders(userId, page, pageSize);

    res.status(httpStatus.OK);
    res.send(orders);
  } catch (error) {
    next(error);
  }
};

export const obtainCreatorOrders = async (req, res, next) => {
  try {
    const {
      userId,
      params: {
        page,
        pageSize,
      },
    } = req;

    const orders = await getOrders(userId, page, pageSize, true);

    res.status(httpStatus.OK);
    res.send(orders);
  } catch (error) {
    next(error);
  }
};

export const obtainTimelineOrder = async (req, res, next) => {
  try {
    const { userId } = req;

    const timeline = await getTimelineOrder(userId);

    res.status(httpStatus.OK);
    res.send(timeline);
  } catch (error) {
    next(error);
  }
};

export const confirmOrder = async (req, res, next) => {
  try {
    const { orderId } = req.params;

    await confirmOrderService(orderId);

    res.status(httpStatus.OK);
    res.send(ORDER_CONFIRMED);
  } catch (error) {
    next(error);
  }
};

export const updateOrderStatus = async (req, res, next) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    await updateOrderStatusService(orderId, status);

    res.status(httpStatus.OK);
    res.send(ORDER_STATUS_UPDATED);
  } catch (error) {
    next(error);
  }
};

export const updateOrderStatusRevision = async (req, res, next) => {
  try {
    const { orderId } = req.params;

    await updateOrderStatusRevisionService(orderId);

    res.status(httpStatus.OK);
    res.send(ORDER_STATUS_UPDATED);
  } catch (error) {
    next(error);
  }
};

export const completeOrder = async (req, res, next) => {
  try {
    const { orderId } = req.params;

    await completeOrderService(orderId);

    res.status(httpStatus.OK);
    res.send(ORDER_STATUS_UPDATED);
  } catch (error) {
    next(error);
  }
};

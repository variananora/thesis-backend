import httpStatus from 'http-status';
import {
  createCommission,
  getCommission,
  getCommissions,
  removeCommission,
  updateCommission as updateCommissionService,
} from '../services/CommissionService';
import { COMMISSION_CREATED } from '../constants/StatusMessages';

export const registerCommission = async (req, res, next) => {
  try {
    const {
      isCreator,
      userId,
      body,
      files,
    } = req;

    const commission = await createCommission(isCreator, userId, body, files);

    res.status(httpStatus.CREATED);
    res.send(commission);
  } catch (error) {
    next(error);
  }
};

export const updateCommission = async (req, res, next) => {
  try {
    const {
      isCreator,
      userId,
      body,
      files,
      params: { commissionId },
    } = req;

    const commission = await updateCommissionService(isCreator, userId, commissionId, body, files);

    res.status(httpStatus.OK);
    res.send(commission);
  } catch (error) {
    next(error);
  }
};

export const unregisterCommission = async (req, res, next) => {
  try {
    const {
      userId,
      params: { commissionId },
    } = req;

    await removeCommission(userId, commissionId);

    res.status(httpStatus.OK);
    res.send(COMMISSION_CREATED);
  } catch (error) {
    next(error);
  }
};

export const obtainCommission = async (req, res, next) => {
  try {
    const { commissionId } = req.params;

    const commission = await getCommission(commissionId);

    res.status(httpStatus.OK);
    res.send(commission);
  } catch (error) {
    next(error);
  }
};

export const obtainCommissions = async (req, res, next) => {
  try {
    const {
      filters,
      sorter,
      searchKeyword,
      page,
      pageSize,
    } = req.query;

    const commission = await getCommissions(filters, sorter, searchKeyword, page, pageSize);

    res.status(httpStatus.OK);
    res.send(commission);
  } catch (error) {
    next(error);
  }
};

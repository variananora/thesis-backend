import httpStatus from 'http-status';
import {
  getUserById,
  removeUser,
  updateCreator as updateCreatorService,
  updateUser as updateUserService,
} from '../services/UserService';
import { becomeCreator as becomeCreatorService } from '../services/AuthenticationService';
import { USER_DELETED } from '../constants/StatusMessages';

export const unregisterUser = async (req, res, next) => {
  try {
    const { userId } = req;

    await removeUser(userId);

    res.status(httpStatus.OK);
    res.send(USER_DELETED);
  } catch (error) {
    next(error);
  }
};

export const obtainUser = async (req, res, next) => {
  try {
    const { userId } = req.params;

    const user = await getUserById(userId);

    res.status(httpStatus.OK);
    res.send(user);
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const {
      userId,
      body,
      file,
    } = req;

    const user = await updateUserService(userId, body, file);

    res.status(httpStatus.OK);
    res.send(user);
  } catch (error) {
    next(error);
  }
};

export const updateCreator = async (req, res, next) => {
  try {
    const {
      userId,
      body,
    } = req;

    const user = await updateCreatorService(userId, body);

    res.status(httpStatus.OK);
    res.send(user);
  } catch (error) {
    next(error);
  }
};

export const becomeCreator = async (req, res, next) => {
  try {
    const {
      userId,
      body,
    } = req;

    const {
      userToken,
      userInfo,
    } = await becomeCreatorService(userId, body);

    res.cookie('accessToken', userToken, {
      httpOnly: true,
    });
    res.status(httpStatus.OK);
    res.send(userInfo);
  } catch (error) {
    next(error);
  }
};

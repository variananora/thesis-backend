import bcrypt from 'bcrypt';
import createError from 'http-errors';
import httpStatus from 'http-status';
import jwt from 'jsonwebtoken';
import {
  INVALID_USERNAME_OR_PASSWORD,
  MISSING_USERNAME_OR_PASSWORD,
  USER_ALREADY_EXISTS,
} from '../constants/StatusMessages';
import {
  createUser, getUserById, getUserByUsername, updateUser,
} from './UserService';
import generateImageData from '../utils/ImageUtils';
import { saveImage } from '../repositories/ImageRepository';

export const verifyPassword = async (user, password) => bcrypt.compare(password, user.password);

export const generateToken = async (user) => {
  const {
    _id,
    username,
    isCreator,
  } = user;

  return jwt.sign(
    {
      id: _id,
      username,
      isCreator,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: '24h',
    },
  );
};

export const hashPassword = async (password) => bcrypt.hash(password, 10);

export const registerUser = async (user, file) => {
  const {
    username,
    password,
  } = user;

  if (!username || !password) {
    throw createError(httpStatus.BAD_REQUEST, MISSING_USERNAME_OR_PASSWORD);
  }

  if (await getUserByUsername(username)) {
    throw createError(httpStatus.CONFLICT, USER_ALREADY_EXISTS);
  }

  const hash = await hashPassword(password);

  if (file) {
    const profileImage = generateImageData(file);
    const image = await saveImage(profileImage);

    const userPayload = {
      ...user,
      password: hash,
      image,
    };

    return createUser(userPayload);
  }

  const userPayload = {
    ...user,
    password: hash,
  };

  return createUser(userPayload);
};

export const loginUser = async (username, password) => {
  if (!username || !password) {
    throw createError(httpStatus.BAD_REQUEST, MISSING_USERNAME_OR_PASSWORD);
  }

  const user = await getUserByUsername(username, true);

  if (!user || !await verifyPassword(user, password)) {
    throw createError(httpStatus.NOT_FOUND, INVALID_USERNAME_OR_PASSWORD);
  }

  const userToken = await generateToken(user);
  const {
    password: userPassword,
    ...userInfo
  } = user.toObject();

  return {
    userToken,
    userInfo,
  };
};

export const becomeCreator = async (userId, body) => {
  const {
    description,
    bankCode,
    accountNumber,
    accountHolderName,
  } = body;

  const userData = {
    isCreator: true,
    description,
    bankDetails: {
      bankCode,
      accountNumber,
      accountHolderName,
    },
  };

  await updateUser(userId, userData);

  const user = await getUserById(userId, false);

  const userToken = await generateToken(user);

  return {
    userToken,
    userInfo: user,
  };
};

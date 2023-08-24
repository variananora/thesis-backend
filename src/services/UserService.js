import createError from 'http-errors';
import httpStatus from 'http-status';
import {
  deleteUser,
  fetchUserById,
  fetchUserByUsername,
  saveUser,
  updateUser as updateUserRepository,
} from '../repositories/UserRepository';
import { USER_DELETE_FAILED } from '../constants/StatusMessages';
import generateImageData from '../utils/ImageUtils';
import { saveImage } from '../repositories/ImageRepository';

// eslint-disable-next-line max-len
export const getUserByUsername = async (username, isPasswordVisible = false) => fetchUserByUsername(username, isPasswordVisible);

// eslint-disable-next-line max-len
export const getUserById = async (userId, isPasswordVisible = false) => fetchUserById(userId, isPasswordVisible);

export const createUser = async (user) => saveUser(user);

export const removeUser = async (userId) => {
  const user = await fetchUserById(userId, false);

  if (user._id.toString() !== userId) {
    throw createError(httpStatus.FORBIDDEN, USER_DELETE_FAILED);
  }

  return deleteUser(userId);
};

export const updateUser = async (userId, body, file) => {
  if (file) {
    const profileImage = generateImageData(file);
    const image = await saveImage(profileImage);

    const newUser = {
      ...body,
      image: image._id,
    };

    return updateUserRepository(userId, newUser);
  }

  return updateUserRepository(userId, body);
};

export const updateCreator = async (userId, body) => {
  const {
    description,
    bankCode,
    accountNumber,
    accountHolderName,
  } = body;

  const newUser = {
    description,
    bankDetails: {
      bankCode,
      accountNumber,
      accountHolderName,
    },
  };

  return updateUserRepository(userId, newUser);
};

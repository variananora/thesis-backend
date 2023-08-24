import createError from 'http-errors';
import httpStatus from 'http-status';
import {
  COMMISSION_NOT_FOUND,
  USER_NOT_COMMISSION_OWNER,
  USER_NOT_CREATOR,
} from '../constants/StatusMessages';
import {
  deleteCommission,
  fetchCommissionById,
  fetchCommissions,
  saveCommission,
  updateCommission as updateCommissionRepository,
  updateCommissionRating as updateCommissionRatingRepository,
} from '../repositories/CommissionRepository';
import { saveImage } from '../repositories/ImageRepository';
import generateImageData from '../utils/ImageUtils';
import { fetchConversationByParticipants } from '../repositories/ConversationRepository';

export const createCommission = async (isCreator, userId, body, files) => {
  if (!isCreator) {
    throw createError(httpStatus.FORBIDDEN, USER_NOT_CREATOR);
  }

  const coverImage = generateImageData(files.cover[0]);
  const cover = await saveImage(coverImage);

  const images = files.images.map(async (file) => {
    const newImage = generateImageData(file);
    const image = await saveImage(newImage);
    return image._id;
  });

  const commission = {
    ...body,
    userId,
    cover: cover._id,
    images: await Promise.all(images),
  };

  return saveCommission(commission);
};

export const updateCommission = async (isCreator, userId, commissionId, body, files) => {
  if (!isCreator) {
    throw createError(httpStatus.FORBIDDEN, USER_NOT_CREATOR);
  }

  const commission = await fetchCommissionById(commissionId);
  if (commission.userId.toString() !== userId) {
    throw createError(httpStatus.FORBIDDEN, USER_NOT_COMMISSION_OWNER);
  }

  // check if images are updated
  let updatedCover;
  let updatedImages;

  if (files.cover) {
    const coverImage = generateImageData(files.cover[0]);
    updatedCover = await saveImage(coverImage);
  }

  if (files.images) {
    updatedImages = files.images.map(async (file) => {
      const newImage = generateImageData(file);
      const image = await saveImage(newImage);
      return image._id;
    });
  }

  const images = [
    ...body.oldImages,
    ...await Promise.all(updatedImages),
  ];

  const updatedCommission = {
    ...body,
    ...files.cover && { cover: updatedCover._id },
    ...files.images && { images },
  };

  return updateCommissionRepository(commissionId, updatedCommission);
};

export const removeCommission = async (userId, commissionId) => {
  const commission = await fetchCommissionById(commissionId);

  if (commission.userId.toString() !== userId) {
    throw createError(httpStatus.FORBIDDEN, USER_NOT_COMMISSION_OWNER);
  }

  return deleteCommission(commissionId);
};

export const getCommission = async (commissionId) => {
  const commission = fetchCommissionById(commissionId);

  if (!commission) {
    throw createError(httpStatus.NOT_FOUND, COMMISSION_NOT_FOUND);
  }

  return commission;
};

// eslint-disable-next-line max-len
export const getCommissions = async (filters, sorter, searchKeyword, page, pageSize) => fetchCommissions(filters, sorter, searchKeyword, page, pageSize);

// eslint-disable-next-line max-len
export const updateCommissionRating = async (commissionId, star) => updateCommissionRatingRepository(commissionId, star);

// eslint-disable-next-line max-len
export const getConversationByParticipants = async (participants) => fetchConversationByParticipants(participants);

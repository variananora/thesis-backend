import httpStatus from 'http-status';
import { createImage, getImageById, removeImage } from '../services/ImageService';
import { IMAGE_DELETED, IMAGE_SAVED } from '../constants/StatusMessages';

export const obtainImageById = async (req, res, next) => {
  try {
    const { imageId } = req.params;

    const image = await getImageById(imageId);

    res.status(httpStatus.OK);
    res.send(image);
  } catch (error) {
    next(error);
  }
};

export const registerImage = async (req, res, next) => {
  try {
    const { body } = req;

    const image = await createImage(body);

    res.status(httpStatus.CREATED);
    res.send({
      message: IMAGE_SAVED,
      id: image._id,
    });
  } catch (error) {
    next(error);
  }
};

export const unregisterImage = async (req, res, next) => {
  try {
    const { imageId } = req.params;

    await removeImage(imageId);

    res.status(httpStatus.OK);
    res.send(IMAGE_DELETED);
  } catch (error) {
    next(error);
  }
};

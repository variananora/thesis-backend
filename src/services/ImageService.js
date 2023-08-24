import { deleteImage, fetchImageById, saveImage } from '../repositories/ImageRepository';

export const getImageById = async (imageId) => fetchImageById(imageId);

export const createImage = async (image) => saveImage(image);

export const removeImage = async (imageId) => deleteImage(imageId);

import Image from '../models/Image';

export const fetchImageById = async (imageId) => Image.findById(imageId);

export const saveImage = async (image) => Image.create(image);

export const deleteImage = async (imageId) => Image.findByIdAndDelete(imageId);

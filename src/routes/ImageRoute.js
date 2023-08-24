import express from 'express';
import checkToken from '../middlewares/CheckToken';
import { obtainImageById, registerImage, unregisterImage } from '../controller/ImageController';
import multerUploader from '../middlewares/MulterUploader';

const imageRoute = express.Router();

imageRoute.get('/:imageId', checkToken, obtainImageById);
imageRoute.post('/', checkToken, multerUploader.single('image'), registerImage);
imageRoute.delete('/:imageId', checkToken, unregisterImage);

export default imageRoute;

import express from 'express';
import { login, logout, register } from '../controller/AuthenticationController';
import multerUploader from '../middlewares/MulterUploader';

const authRoute = express.Router();

authRoute.post('/register', multerUploader.single('image'), register);
authRoute.post('/login', login);
authRoute.post('/logout', logout);

export default authRoute;

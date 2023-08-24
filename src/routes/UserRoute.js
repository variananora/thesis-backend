import express from 'express';
import checkToken from '../middlewares/CheckToken';
import {
  becomeCreator,
  obtainUser,
  unregisterUser,
  updateCreator,
  updateUser,
} from '../controller/UserController';
import multerUploader from '../middlewares/MulterUploader';

const userRoute = express.Router();

userRoute.get('/:userId', checkToken, obtainUser);
userRoute.delete('/', checkToken, unregisterUser);
userRoute.put('/', checkToken, multerUploader.single('image'), updateUser);
userRoute.put('/creator', checkToken, updateCreator);
userRoute.post('/become-creator', checkToken, becomeCreator);

export default userRoute;

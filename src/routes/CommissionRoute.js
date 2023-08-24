import express from 'express';
import {
  obtainCommission,
  obtainCommissions,
  registerCommission,
  unregisterCommission,
  updateCommission,
} from '../controller/CommissionController';
import checkToken from '../middlewares/CheckToken';
import multerUploader from '../middlewares/MulterUploader';

const commissionRoute = express.Router();

commissionRoute.post(
  '/',
  checkToken,
  // multer to handle image uploads
  multerUploader.fields([
    {
      name: 'cover',
      maxCount: 1,
    },
    {
      name: 'images',
      maxCount: 5,
    },
  ]),
  registerCommission,
);
commissionRoute.delete('/:commissionId', checkToken, unregisterCommission);
commissionRoute.get('/:commissionId', obtainCommission);
commissionRoute.put(
  '/:commissionId',
  checkToken,
  multerUploader.fields([
    {
      name: 'cover',
      maxCount: 1,
    },
    {
      name: 'images',
      maxCount: 5,
    },
  ]),
  updateCommission,
);
commissionRoute.get('/', obtainCommissions);

export default commissionRoute;

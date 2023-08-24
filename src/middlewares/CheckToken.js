import jwt from 'jsonwebtoken';
import createError from 'http-errors';
import { INVALID_TOKEN, MISSING_TOKEN } from '../constants/StatusMessages';

// checkToken middleware
// Checks if the request has a valid token
const checkToken = async (req, res, next) => {
  const token = req.cookies.accessToken;

  if (!token) {
    return next(createError(401, MISSING_TOKEN));
  }

  return jwt.verify(token, process.env.JWT_SECRET, async (err, payload) => {
    if (err) {
      return next(createError(403, INVALID_TOKEN));
    }

    req.userId = payload.id;
    req.isCreator = payload.isCreator;

    return next();
  });
};

export default checkToken;

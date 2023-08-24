import httpStatus from 'http-status';
import { USER_CREATED, USER_LOGOUT } from '../constants/StatusMessages';
import { loginUser, registerUser } from '../services/AuthenticationService';

export const register = async (req, res, next) => {
  try {
    const {
      body,
      file,
    } = req;

    await registerUser(body, file);

    res.status(httpStatus.CREATED);
    res.send(USER_CREATED);
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const {
      username,
      password,
    } = req.body;

    const {
      userToken,
      userInfo,
    } = await loginUser(username, password);

    res.cookie('accessToken', userToken, {
      httpOnly: true,
    });
    res.status(httpStatus.OK);
    res.send(userInfo);
  } catch (error) {
    next(error);
  }
};

export const logout = async (req, res) => {
  res.clearCookie('accessToken', {
    secure: true,
  });
  res.status(httpStatus.OK);
  res.send(USER_LOGOUT);
};

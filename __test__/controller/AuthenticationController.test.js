import createError from 'http-errors';
import httpStatus from 'http-status';
import request from 'supertest';
import { USER_CREATED } from '../../src/constants/StatusMessages';
import {
  loginUser,
  registerUser,
} from '../../src/services/AuthenticationService';
import { initializeTestServer } from '../../src/utils/TestUtils';
import {
  mockUserLogin,
  mockUserRawToken,
  mockUserRegister,
} from '../fixtures/AuthenticationFixtures';

jest.mock('../../src/services/AuthenticationService', () => ({
  loginUser: jest.fn(),
  registerUser: jest.fn(),
  findUserDetail: jest.fn(),
  verifyToken: jest.fn(),
}));

xdescribe('AuthenticationController', () => {
  let server;
  let app;

  beforeAll(() => {
    const { app: testApp, server: testServer } = initializeTestServer();
    app = testApp;
    server = testServer;
  });

  afterAll(() => {
    server.close();
  });

  describe('POST /auth/login', () => {
    it('should return 200 OK', async () => {
      loginUser.mockResolvedValue(mockUserRawToken);
      const { body, status } = await request(app)
        .post('/auth/login')
        .send(mockUserLogin);

      expect(loginUser).toHaveBeenCalledWith(mockUserLogin.username, mockUserLogin.password);
      expect(body).toBe(mockUserRawToken);
      expect(status).toBe(httpStatus.OK);
    });

    it('should return 500 Internal Server Error', async () => {
      loginUser.mockRejectedValue(createError(httpStatus.INTERNAL_SERVER_ERROR));
      const { status } = await request(app)
        .post('/auth/login')
        .send(mockUserLogin);

      expect(loginUser).toHaveBeenCalledWith(mockUserLogin.username, mockUserLogin.password);
      expect(status).toBe(httpStatus.INTERNAL_SERVER_ERROR);
    });
  });

  describe('POST /auth/register', () => {
    it('should return 201 Created', async () => {
      registerUser.mockResolvedValue(USER_CREATED);
      const { body, status } = await request(app)
        .post('/auth/register')
        .send(mockUserRegister);

      expect(registerUser).toHaveBeenCalledWith(mockUserRegister);
      expect(body).toBe(USER_CREATED);
      expect(status).toBe(httpStatus.CREATED);
    });

    it('should return 500 Internal Server Error', async () => {
      registerUser.mockRejectedValue(createError(httpStatus.INTERNAL_SERVER_ERROR));
      const { status } = await request(app)
        .post('/auth/register')
        .send(mockUserRegister);

      expect(registerUser).toHaveBeenCalledWith(mockUserRegister);
      expect(status).toBe(httpStatus.INTERNAL_SERVER_ERROR);
    });
  });

  // describe('GET /auth/user-detail', () => {
  //   it('should return 200 OK', async () => {
  //     findUserDetail.mockResolvedValue(mockUserDetails);
  //     const { body, status } = await request(app)
  //       .get('/auth/user-detail')
  //       .send({ token: mockUserRawToken });
  //
  //     expect(findUserDetail).toHaveBeenCalledWith(mockUserRawToken);
  //     expect(body).toEqual(mockUserDetails);
  //     expect(status).toBe(httpStatus.OK);
  //   });
  //
  //   it('should return 500 Internal Server Error', async () => {
  //     findUserDetail.mockRejectedValue(createError(httpStatus.INTERNAL_SERVER_ERROR));
  //     const { status } = await request(app)
  //       .get('/auth/user-detail')
  //       .send({ token: mockUserRawToken });
  //
  //     expect(findUserDetail).toHaveBeenCalledWith(mockUserRawToken);
  //     expect(status).toBe(httpStatus.INTERNAL_SERVER_ERROR);
  //   });
  // });

  // describe('POST /auth/check-token', () => {
  //   it('should return 200 OK', async () => {
  //     verifyToken.mockResolvedValue(mockUserDetails);
  //     const { body, status } = await request(app)
  //       .post('/auth/check-token')
  //       .send({ token: mockUserRawToken });
  //
  //     expect(verifyToken).toHaveBeenCalledWith(mockUserRawToken);
  //     expect(body).toEqual(mockUserDetails);
  //     expect(status).toBe(httpStatus.OK);
  //   });
  //
  //   it('should return 500 Internal Server Error', async () => {
  //     verifyToken.mockRejectedValue(createError(httpStatus.INTERNAL_SERVER_ERROR));
  //     const { status } = await request(app)
  //       .post('/auth/check-token')
  //       .send({ token: mockUserRawToken });
  //
  //     expect(verifyToken).toHaveBeenCalledWith(mockUserRawToken);
  //     expect(status).toBe(httpStatus.INTERNAL_SERVER_ERROR);
  //   });
  // });
});

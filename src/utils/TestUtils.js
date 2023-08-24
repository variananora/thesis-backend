import express from 'express';
import http from 'http';
import createError from 'http-errors';
import httpStatus from 'http-status';
import { normalizePort } from '../config/ExpressConfig';
import errorHandler from '../middlewares/ErrorHandler';
import indexRoutes from '../routes';

/**
 * Get port from environment when found or default to 3000
 */
export const testPortSelector = normalizePort(process.env.TEST_PORT || '3102');

export const initializeTestServer = () => {
  const app = express();
  app.use(express.json());
  indexRoutes(app);
  app.use((req, res, next) => next(
    createError(httpStatus.NOT_FOUND, httpStatus[httpStatus.NOT_FOUND]),
  ));
  app.use(errorHandler);
  const server = http.createServer(app);
  server.listen(testPortSelector);
  return {
    app,
    server,
  };
};

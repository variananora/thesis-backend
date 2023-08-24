import logger from 'morgan';
import cookieParser from 'cookie-parser';
import express from 'express';
import createError from 'http-errors';
import http from 'http';
import httpStatus from 'http-status';
import mongoose from 'mongoose';
import cors from 'cors';
import indexRoutes from './routes';
import 'dotenv/config';
import errorHandler from './middlewares/ErrorHandler';
import { portSelector } from './config/ExpressConfig';

/**
 * Initialize mongoose connection
 */
mongoose.connect(process.env.MONGODB_URI);

/**
 * Initialize express app
 */
const app = express();

/**
 * Express app configuration
 */
app.use(logger('dev'));
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

/**
 * Express app routes
 */
indexRoutes(app);

/**
 * Return 404 error if route not found
 */
app.use((req, res, next) => next(
  createError(httpStatus.NOT_FOUND, httpStatus[httpStatus.NOT_FOUND]),
));

/**
 * Express app error handler
 */
app.use(errorHandler);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(portSelector);

export default app;

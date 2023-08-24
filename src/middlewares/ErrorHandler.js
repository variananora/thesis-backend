/**
 * Error handler middleware
 */
const errorHandler = (error, req, res, next) => {
  // if (res.headersSent) {
  //   return next(error);
  // }
  next(error);
  // res.status(error.status);
  // return res.json({
  //   message: error?.expose ? error.message : httpStatus[error.status],
  //   error: process.env.NODE_ENV === 'development' ? error : {},
  // });
};

export default errorHandler;

/**
 * Collection of express app configuration
 */

/**
 * Normalize a port into a number, string, or false.
 */
export const normalizePort = (val) => {
  const port = parseInt(val, 10);

  if (Number.isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
};

/**
 * Get port from environment when found or default to 3001
 */
export const portSelector = normalizePort(process.env.PORT || '3001');

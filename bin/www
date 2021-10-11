const http = require('http');
const mongoose = require('mongoose');
const app = require('../index.js');
const Logger = require('../config/console');
const logger = new Logger().log();
require('../config/db');

// Normalize a port into a number, string, or false.
function normalizePort(val) {
  const port = parseInt(val, 10);
  if (isNaN(port)) {
    // named pipe
    return val;
  }
  if (port >= 0) {
    // port number
    return port;
  }
  return false;
}

// Event listener for HTTP server "error" event.
function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }
  const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`;
  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      logger.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      logger.error(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
}

const { PORT, HOST } = process.env;
const port = normalizePort(PORT || '8081');
const host = HOST || `0.0.0.0`;

// Create HTTP server.
const server = http.createServer(app);

// Listen on provided port and host.
server.listen(port, host);
server.on('error', onError);
server.on('listening', () => {
  logger.info(`Server started on ${new Date()}`);
  logger.info(
    `server is running at http://${server.address().address}:${
      server.address().port
    }`,
  );
  logger.info(process.env.NODE_ENV);
});

process.on('unhandledRejection', (err, promise) => {
  logger.error(
    'Unhandled rejection (promise: ',
    promise,
    ', reason: ',
    err,
    ').',
  );
});

process.on('uncaughtException', (err, reason) => {
  logger.error('Uncaught Exception: ', reason, ', reason: ', err, ').');
});

const closeAllConnections = async () => {
  server.close(() => {
    logger.info('Http server closed.');
  });
  //   await mongoose.connection.close();
  await mongoose.disconnect();
  logger.info('MongoDb connection closed.');
};

process.on('SIGTERM', () => {
  closeAllConnections().finally(() => process.exit(0));
});
process.on('SIGINT', () => {
  closeAllConnections().finally(() => process.exit(0));
});

process.on('exit', () => {
  logger.info('--------------------App closed-----------------------');
});

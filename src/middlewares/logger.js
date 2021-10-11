const Logger = require('../../config/console');

/**
 * Add logger to all the request
 * @param {HTTP Request} request
 * @param {HTTP Response} response
 * @param {HTTP Next} next
 */
const consoleLogger = (request, response, next) => {
  const logger = new Logger(request.requestId);
  request.logger = logger.log();
  next();
};

module.exports = { consoleLogger };

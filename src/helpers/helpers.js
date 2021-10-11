/* eslint-disable object-shorthand */
const statusCode = require('./constants');

const response = {
  statusCode: statusCode.STATUS_CODE.OK,
  msg: 'Request Success',
  errorMessage: 'Something went wrong, Kindly try again',
  success: function ({ res, headers, status, msg, data, links, meta }) {
    if (headers) {
      res.set(headers);
    }
    if (!data) {
      this.statusCode = statusCode.STATUS_CODE.NO_CONTENT;
    }
    res.status(status || this.statusCode).json({
      msg: msg || this.msg,
      data: data,
      links: links,
      meta: meta,
    });
  },
  error: function ({ res, headers, status, msg, data }) {
    if (headers) {
      res.set(headers);
    }
    res.status(status || 400).json({
      msg: msg || this.errorMessage,
      data: data,
    });
  },
};

module.exports = response;

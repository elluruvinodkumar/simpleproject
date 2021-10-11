const _ = require('lodash');
//const { createLogger, transports, format } = require('winston');
const winston = require('winston');
const logsDb = require('../src/models/serverLogs');
// eslint-disable-next-line no-undef
process.setMaxListeners(0);
class Logger {
  constructor(requestId = null) {
    this.requestId = requestId;
  }

  customFormatter() {
    return winston.format((info) => {
      const { message } = info;
      const args = info[Symbol.for('splat')];
      const strArgs = (args || []).map((arg) => arg).join(' ');
      info.message = `${message} ${strArgs}`;
      return info;
    })();
  }

  /*
    Winston logger configuration for console transport
  */
  log() {
    return winston.createLogger({
      defaultMeta: {
        requestId: this.requestId,
        // eslint-disable-next-line no-undef
        application: process.env.APP_NAME,
      },
      format: winston.format.combine(
        winston.format.timestamp({
          format: 'DD-MM-YYYY HH:mm:ss',
        }),
        winston.format.prettyPrint(),
        winston.format.json(),
        this.customFormatter(),
        winston.format.printf((info) => {
          const timestamp = info.timestamp.trim();
          const requestId = info.requestId;
          const level = info.level;
          const message = (info.message || '').trim();

            const saveFunction = new logsDb({
              timestamp : timestamp,
              level : level,
              message : message,
              //meta : meta,
              //hostname : foundedData.hostname
            });

            saveFunction.save((err) => {
              if (err) {
                console.log("failed to logs save operation"); 
              }

          })
           
          if (_.isNull(requestId) || _.isUndefined(requestId)) {
            return `${timestamp} ${level}: ${message}`;
          } else {
            return `${timestamp} ${level}: processing with requestId [${requestId}]: ${message}`;
          }
        }),
      ),
      transports: [
        new winston.transports.Console({
          level: 'debug',
          handleExceptions: true,
        }),    
         // File transport
      new winston.transports.File({
          filename: 'logs/server.log',
          format: winston.format.combine(
            winston.format.colorize(),
            winston.format.timestamp({format: 'MMM-DD-YYYY HH:mm:ss'}),
            winston.format.align(),
            winston.format.json()
          )
        }),    

         // MongoDB transport
    // new winston.transports.MongoDB({
    //   level: 'info',
    //   //mongo database connection link
    //   db : 'mongodb://localhost:27017/mysale',
    //   options: {
    //       useUnifiedTopology: true
    //   },
    //   // A collection to save json formatted logs
    //   collection: 'serverlogs',
    //   format: winston.format.combine(
    //   winston.format.timestamp(),
    //   // Convert logs to a json format
    //   winston.format.json()),
    //   storeHost: true,
    //   capped: false,
    //   decolorize: false,
    //   metaKey: 'meta',
    // }),

      ],
    });
  }
}

module.exports = Logger;

const mongoose = require('mongoose');
const Logger = require('./console');
const logger = new Logger().log();
//const { getSecret } = require('../src/helpers/key-vault');
const { DATABASE ,MONGODB_URI} = process.env;

mongoose.Promise = global.Promise;

  // Mongoose connection
  mongoose.connect('mongodb://127.0.0.1/', {
    dbName: 'mysale',
    useNewUrlParser: true,
    useUnifiedTopology: true,
    //useCreateIndex: true,
    //useFindAndModify: false,
  });

mongoose.connection.on('error', (err) => {
  //logger.error(err);
  logger.info(
    '%s MongoDB connection error. Please make sure MongoDB is running.',
  );
  process.exit();
});

mongoose.connection.on('open', () => {
  logger.info(`Connected to Database`);
});

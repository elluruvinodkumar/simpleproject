const express = require('express');
const Route = require('./src/routes/index');
const cors = require('cors');
const { consoleLogger } = require('./src/middlewares/logger');
const fileUpload = require('express-fileupload');

// Initializing express app
const app = express();
// Body-parser
app.use(
  express.json({
    limit: '1mb',
  }),
);

app.use(
  express.urlencoded({
    limit: '1mb',
    extended: true,
  }),
);

// File upload
// app.use(
//   fileUpload({
//     useTempFiles: true,
//     tempFileDir: '/tmp/',
//   }),
// );
//cors
app.use(cors());
app.get('/', (req, res) => {
  res.status(200).json({
    msg: 'Welcome to node API services!',
  });
});

// For Logging
app.use(consoleLogger);

app.use('/api', Route);

// Route Not Found - 404
app.use((req, res) => {
  const { logger } = req;
  logger.error(`Requested API route is not found`);
  res.status(404).json({
    msg: 'Requested API route is not available!',
  });
});
module.exports = app;

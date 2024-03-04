const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const compression = require('compression');

const globalErrorHandle = require('./controllers/errorController.js');
const AppError = require('./utils/appError.js');
const cityRouter = require('./routes/cityRoutes.js');
const userRouter = require('./routes/userRoutes.js');

const app = express();

// MIDDLEWARES
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(express.json());
app.use(express.static(`${__dirname}/public`));
app.use(cors());
app.options('*', cors());

/// Serve up production assets
app.use(express.static('./../client/dist'));
// const path = require('path');
// app.get('*', (req, res) => {
//   res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html'));
// });

app.use(compression());

// ROUTES
app.use('/api/v1/cities', cityRouter);
app.use('/api/v1/users', userRouter);

// Handle unhandle routes
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`), 404);
});

// Global Error handling middleware
app.use(globalErrorHandle);

module.exports = app;

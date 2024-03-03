const express = require('express');
const morgan = require('morgan');

const cityRouter = require('./routes/cityRoutes.js');
const userRouter = require('./routes/userRoutes.js');

const app = express();

// MIDDLEWARES
app.use(morgan('dev'));
app.use(express.json());
// app.use(express.static(`${__dirname}/public`));

// ROUTES
app.use('/api/v1/cities', cityRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;

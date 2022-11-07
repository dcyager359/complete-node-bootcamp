const express = require('express');
const morgan = require('morgan');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

// Middleware
app.use(morgan());
app.use(express.json());

app.use((req, res, next) => {
  console.log('custom middleware filter');
  next();
});

app.use((req, res, next) => {
  console.log('custom middleware filter 2');
  req.requestTime = new Date().toISOString();
  next();
});

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;

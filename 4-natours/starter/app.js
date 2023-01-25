const express = require('express');
const morgan = require('morgan');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(express.json());
app.use(express.static(`${__dirname}/public`));
app.use(express.static(`${__dirname}/img`));

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

//handle valid routes
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

//handle invalid request
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find route ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);

module.exports = app;

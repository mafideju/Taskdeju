const express = require('express');
const morgan = require('morgan');

const app = express();

const taskRouter = require('./routes/taskRouter');
const userRouter = require('./routes/userRouter');

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('common'));
}
app.use(express.json());
app.use('/api/v1/tasks', taskRouter);
app.use('/api/v1/users', userRouter);
// app.use(express.static(`${__dirname}/public`));

module.exports = app;

/* eslint-disable no-console */
require('dotenv').config({ path: './config.env' });
require('./logs/logger');
const mongoose = require('mongoose');
const chalk = require('chalk');
const app = require('./app');

const PORT = process.env.PORT || 7777;
const uri = process.env.DATABASE_STRING;

app.listen(PORT, () => {
  console.log(
    chalk.bgBlue.white('\n>> Servidor ')
    + chalk.bgBlue.white('Express ')
    + chalk.bgBlue.white('Rodando ')
    + chalk.bgBlue.red(`@ Porta ${PORT}! <<\n`),
  );
});

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then((connection) => {
    console.log(chalk.bgGreen.white('\n>> Servidor ')
    + chalk.bgGreen.white('MongoDB & ')
    + chalk.bgGreen.white('Mongoose Rodando ')
    + chalk.bgGreen.red('@ Porta 27017! <<\n'), connection.models);
  })
  .catch((err) => console.log(err));

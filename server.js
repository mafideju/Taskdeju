/* eslint-disable no-console */
require('dotenv').config({ path: './config.env' });
require('./logs/logger');
const mongoose = require('mongoose');
const chalk = require('chalk');
const app = require('./app');

const PORT = process.env.PORT || 7777;
const uri = process.env.DATABASE_STRING;

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then((connection) => {
    console.log(chalk.bgYellow.white('\n>> Servidor ')
    + chalk.bgYellow.white('MongoDB & ')
    + chalk.bgYellow.white('Mongoose Rodando ')
    + chalk.bgYellow.red('@ Porta 27017! <<\n'), connection.models);
  })
  .catch((err) => console.log(err));

app.listen(PORT, () => {
  console.log(
    chalk.bgYellow.white('\n>> Servidor ')
    + chalk.bgYellow.white('Express ')
    + chalk.bgYellow.white('Rodando ')
    + chalk.bgYellow.red(`@ Porta ${PORT}! <<\n`),
  );
});

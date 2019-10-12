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
    console.log('mongodb connected => ', connection.models);
  })
  .catch((err) => console.log(err));

app.listen(PORT, () => {
  console.log(
    chalk.bgYellow.blue('\n>> Servidor ')
    + chalk.bgYellow.white('Express ')
    + chalk.bgYellow.blue('Rodando ')
    + chalk.bgYellow.red(`@ Porta ${PORT}! <<\n`),
  );
});

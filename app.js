const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();

const { PORT, NOT_FOUND_ERROR_STATUS } = process.env;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.use((req, res, next) => {
  req.user = {
    _id: '63b44b62cc8f22ba0efd5450',
  };

  next();
});

app.use('/users', require('./routes/users'));

app.use('/cards', require('./routes/cards'));

app.use('*', (req, res) => {
  res.status(NOT_FOUND_ERROR_STATUS).send({
    message: 'Ресурс не найден',
  });
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

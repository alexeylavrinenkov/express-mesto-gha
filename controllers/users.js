require('dotenv').config();
const User = require('../models/user');

const {
  VALIDATION_ERROR_STATUS,
  NOT_FOUND_ERROR_STATUS,
  INTERNAL_SERVER_ERROR_STATUS,
} = process.env;

const getUsers = (req, res) => {
  User.find({})
    .then((users) => {
      if (!users) {
        const err = new Error('Пользователи не найдены');
        err.name = 'notFoundError';
        throw err;
      }

      res.send({ data: users });
    })
    .catch((err) => {
      if (err.name === 'notFoundError') {
        res.status(NOT_FOUND_ERROR_STATUS).send({
          message: err.message,
        });
        return;
      }

      res.status(INTERNAL_SERVER_ERROR_STATUS).send({
        message: 'На сервере произошла ошибка',
      });
    });
};

const getUser = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        const err = new Error('Пользователь не найден');
        err.name = 'notFoundError';
        throw err;
      }

      res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(VALIDATION_ERROR_STATUS).send({
          message: 'Некорректный id пользователя',
        });
        return;
      }

      if (err.name === 'notFoundError') {
        res.status(NOT_FOUND_ERROR_STATUS).send({
          message: err.message,
        });
        return;
      }

      res.status(INTERNAL_SERVER_ERROR_STATUS).send({
        message: 'На сервере произошла ошибка',
      });
    });
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => {
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(VALIDATION_ERROR_STATUS).send({
          message: 'Переданы некорректные данные в метод создания пользователя',
        });
        return;
      }

      res.status(INTERNAL_SERVER_ERROR_STATUS).send({
        message: 'На сервере произошла ошибка',
      });
    });
};

const updateProfile = (req, res) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        const err = new Error('Пользователь не найден');
        err.name = 'notFoundError';
        throw err;
      }

      res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(VALIDATION_ERROR_STATUS).send({
          message: 'Некорректный id пользователя',
        });
        return;
      }

      if (err.name === 'ValidationError') {
        res.status(VALIDATION_ERROR_STATUS).send({
          message: 'Переданы некорректные данные в метод обновления профиля пользователя',
        });
        return;
      }

      if (err.name === 'notFoundError') {
        res.status(NOT_FOUND_ERROR_STATUS).send({
          message: err.message,
        });
        return;
      }

      res.status(INTERNAL_SERVER_ERROR_STATUS).send({
        message: 'На сервере произошла ошибка',
      });
    });
};

const updateAvatar = (req, res) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        const err = new Error('Пользователь не найден');
        err.name = 'notFoundError';
        throw err;
      }

      res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(VALIDATION_ERROR_STATUS).send({
          message: 'Некорректный id пользователя',
        });
        return;
      }

      if (err.name === 'ValidationError') {
        res.status(VALIDATION_ERROR_STATUS).send({
          message: 'Переданы некорректные данные в метод обновления аватара пользователя',
        });
        return;
      }

      if (err.name === 'notFoundError') {
        res.status(NOT_FOUND_ERROR_STATUS).send({
          message: err.message,
        });
        return;
      }

      res.status(INTERNAL_SERVER_ERROR_STATUS).send({
        message: 'На сервере произошла ошибка',
      });
    });
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateProfile,
  updateAvatar,
};

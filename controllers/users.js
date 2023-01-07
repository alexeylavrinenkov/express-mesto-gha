require('dotenv').config();
const User = require('../models/user');

const {
  VALIDATION_ERROR_STATUS,
  NOT_FOUND_ERROR_STATUS,
  INTERNAL_SERVER_ERROR_STATUS,
} = process.env;

const getUser = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(NOT_FOUND_ERROR_STATUS).send({
          message: 'Пользователь не найден',
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
          message: 'Переданы некорректные данные в методы создания пользователя',
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

  User.findByIdAndUpdate(req.user._id, { name, about })
    .then((user) => {
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(VALIDATION_ERROR_STATUS).send({
          message: 'Переданы некорректные данные в методы обновления профиля',
        });
        return;
      }

      if (err.name === 'CastError') {
        res.status(NOT_FOUND_ERROR_STATUS).send({
          message: 'Профиль не найден',
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

  User.findByIdAndUpdate(req.user._id, { avatar })
    .then((user) => {
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(VALIDATION_ERROR_STATUS).send({
          message: 'Переданы некорректные данные в методы обновления аватара',
        });
        return;
      }

      if (err.name === 'CastError') {
        res.status(NOT_FOUND_ERROR_STATUS).send({
          message: 'Профиль не найден',
        });
        return;
      }

      res.status(INTERNAL_SERVER_ERROR_STATUS).send({
        message: 'На сервере произошла ошибка',
      });
    });
};

module.exports = {
  getUser,
  createUser,
  updateProfile,
  updateAvatar,
};

require('dotenv').config();
const Card = require('../models/card');

const {
  VALIDATION_ERROR_STATUS,
  NOT_FOUND_ERROR_STATUS,
  INTERNAL_SERVER_ERROR_STATUS,
} = process.env;

const getCards = (req, res) => {
  Card.find({})
    .then((cards) => {
      res.send({ data: cards });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(NOT_FOUND_ERROR_STATUS).send({
          message: 'Карточки не найдены',
        });
        return;
      }

      res.status(INTERNAL_SERVER_ERROR_STATUS).send({
        message: 'На сервере произошла ошибка',
      });
    });
};

const createCard = (req, res) => {
  const { name, link } = req.body;
  const { _id: userId } = req.user;

  Card.create({ name, link, userId })
    .then((card) => {
      res.send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(VALIDATION_ERROR_STATUS).send({
          message: 'Переданы некорректные данные в методы создания карточки',
        });
        return;
      }

      res.status(INTERNAL_SERVER_ERROR_STATUS).send({
        message: 'На сервере произошла ошибка',
      });
    });
};

const deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      res.send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(NOT_FOUND_ERROR_STATUS).send({
          message: 'Карточка не найдена',
        });
        return;
      }

      res.status(INTERNAL_SERVER_ERROR_STATUS).send({
        message: 'На сервере произошла ошибка',
      });
    });
};

const likeCard = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .then((card) => {
      res.send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(NOT_FOUND_ERROR_STATUS).send({
          message: 'Карточка не найдена',
        });
        return;
      }

      res.status(INTERNAL_SERVER_ERROR_STATUS).send({
        message: 'На сервере произошла ошибка',
      });
    });
};

const dislikeCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })
    .then((card) => {
      res.send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(NOT_FOUND_ERROR_STATUS).send({
          message: 'Карточка не найдена',
        });
        return;
      }

      res.status(INTERNAL_SERVER_ERROR_STATUS).send({
        message: 'На сервере произошла ошибка',
      });
    });
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};

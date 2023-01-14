const Card = require('../models/card');
const {
  validationErrorStatus,
  notFoundErrorStatus,
  internalServerErrorStatus,
} = require('../utils/constants');

const getCards = (req, res) => {
  Card.find({})
    .populate(['owner', 'likes'])
    .then((cards) => {
      res.send({ data: cards });
    })
    .catch(() => {
      res.status(internalServerErrorStatus).send({
        message: 'На сервере произошла ошибка',
      });
    });
};

const createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((card) => {
      res.send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(validationErrorStatus).send({
          message: 'Переданы некорректные данные в метод создания карточки',
        });
        return;
      }

      res.status(internalServerErrorStatus).send({
        message: 'На сервере произошла ошибка',
      });
    });
};

const deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .populate(['owner', 'likes'])
    .then((card) => {
      if (!card) {
        const err = new Error('Карточка не найдена');
        err.name = 'notFoundError';
        throw err;
      }

      res.send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(validationErrorStatus).send({
          message: 'Некорректный id карточки',
        });
        return;
      }

      if (err.name === 'notFoundError') {
        res.status(notFoundErrorStatus).send({
          message: err.message,
        });
        return;
      }

      res.status(internalServerErrorStatus).send({
        message: 'На сервере произошла ошибка',
      });
    });
};

const likeCard = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .populate(['owner', 'likes'])
    .then((card) => {
      if (!card) {
        const err = new Error('Карточка не найдена');
        err.name = 'notFoundError';
        throw err;
      }

      res.send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(validationErrorStatus).send({
          message: 'Некорректный id карточки',
        });
        return;
      }

      if (err.name === 'notFoundError') {
        res.status(notFoundErrorStatus).send({
          message: err.message,
        });
        return;
      }

      res.status(internalServerErrorStatus).send({
        message: 'На сервере произошла ошибка',
      });
    });
};

const dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })
    .populate(['owner', 'likes'])
    .then((card) => {
      if (!card) {
        const err = new Error('Карточка не найдена');
        err.name = 'notFoundError';
        throw err;
      }

      res.send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(validationErrorStatus).send({
          message: 'Некорректный id карточки',
        });
        return;
      }

      if (err.name === 'notFoundError') {
        res.status(notFoundErrorStatus).send({
          message: err.message,
        });
        return;
      }

      res.status(internalServerErrorStatus).send({
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

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const {
  STATUS_CREATED,
} = require('../utils/statusCodes');

const User = require('../models/user');
const BadRequestError = require('../errors/BadRequestError');
const NotUniqueError = require('../errors/NotUniqueError');
const NotFoundError = require('../errors/NotFoundError');

const {
  NODE_ENV,
  JWT_SECRET,
  JWT_DEV_SECRET_KEY,
  SALT_LENGTH,
} = require('../config');

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => {
      res.send(users);
    })
    .catch((err) => {
      next(err);
    });
};

const getUserById = (req, res, next) => {
  const { userId } = req.params;

  User.findById(userId)
    .then((user) => {
      if (!user) {
        next(new NotFoundError(
          `Пользователь по указанному _id:${userId} не найден.`,
        ));
      } else {
        res.send(user);
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError(
          'Переданы некорректные данные _id пользователя.',
        ));
      } else {
        next(err);
      }
    });
};

const getUserMe = (req, res, next) => {
  const userId = req.user._id;
  User
    .findById(userId)
    .then((user) => res.send(user))
    .catch((err) => {
      next(err);
    });
};

const createUser = (req, res, next) => {
  const {
    name,
    about,
    avatar,
    email,
    password,
  } = req.body;
  bcrypt.hash(password, SALT_LENGTH)
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    }))
    .then((newUser) => {
      res.status(STATUS_CREATED).send({
        name: newUser.name,
        about: newUser.about,
        avatar: newUser.avatar,
        email: newUser.email,
      });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(
          'Переданы некорректные данные при создании пользователя',
        ));
      } else if (err.code === 11000) {
        next(new NotUniqueError(
          'Не удалось создать пользователя с данным email.',
        ));
      } else {
        next(err);
      }
    });
};

const updateUserById = (req, res, next) => {
  const { name, about } = req.body;
  const userId = req.user._id;

  User.findByIdAndUpdate(
    userId,
    { name, about },
    { new: true, runValidators: true },
  )
    .then((user) => {
      if (!user) {
        next(new NotFoundError(
          `Пользователь по указанному _id:${userId} не найден.`,
        ));
      } else {
        res.send(user);
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(
          'Переданы некорректные данные при обновлении профиля.',
        ));
      } else {
        next(err);
      }
    });
};

const updateAvatarById = (req, res, next) => {
  const { avatar } = req.body;
  const userId = req.user._id;

  User.findByIdAndUpdate(
    userId,
    { avatar },
    { new: true, runValidators: true },
  )
    .then((user) => {
      if (!user) {
        next(new NotFoundError(
          `Пользователь по указанному _id:${userId} не найден.`,
        ));
      } else {
        res.send(user);
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(
          'Переданы некорректные данные при обновлении аватара.',
        ));
      } else {
        next(err);
      }
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  User
    .checkUserCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : JWT_DEV_SECRET_KEY,
        { expiresIn: '7d' },
      );
      res.send({ jwt: token });
    })
    .catch((err) => {
      next(err);
    });
};

module.exports = {
  getUsers,
  getUserById,
  getUserMe,
  createUser,
  updateUserById,
  updateAvatarById,
  login,
};

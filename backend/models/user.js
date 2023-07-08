const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const linkValidation = require('../utils/linkValidation');
const UnauthorizedError = require('../errors/UnauthorizedError');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      minlength: [2, 'Минимальная длина поля составляет 2 символа'],
      maxlength: [30, 'Максимальная длина поля составляет 30 символов'],
      default: 'Жак-Ив Кусто',
    },
    about: {
      type: String,
      minlength: [2, 'Минимальная длина поля составляет 2 символа'],
      maxlength: [30, 'Максимальная длина поля составляет 30 символов'],
      default: 'Исследователь',
    },
    avatar: {
      type: String,
      default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
      validate: {
        validator: (url) => linkValidation.test(url),
        message: 'Переданная строка не является URL изображения.',
      },
    },
    email: {
      type: String,
      required: [true, `Поле ${this.email} является обязательным.`],
      unique: true,
      validate: {
        validator: (email) => validator.isEmail(email),
        message: 'Переданная строка не является email-ом.',
      },
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
  },
  { versionKey: false },
);

userSchema
  .statics
  .checkUserCredentials = function checkUserCredentials(email, password) {
    return this.findOne({ email }).select('+password')
      .then((user) => {
        if (!user) {
          return Promise.reject(new UnauthorizedError());
        }
        return bcrypt.compare(password, user.password)
          .then((correctPassword) => {
            if (!correctPassword) {
              return Promise.reject(new UnauthorizedError());
            }
            return user;
          });
      });
  };

module.exports = mongoose.model('user', userSchema);

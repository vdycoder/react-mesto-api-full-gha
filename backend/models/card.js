const mongoose = require('mongoose');
const linkValidation = require('../utils/linkValidation');

const cardSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      minlength: [2, 'Минимальная длина поля составляет 2 символа'],
      maxlength: [30, 'Максимальная длина поля составляет 30 символов'],
      required: [true, `Значение ${this.name} должно быть заполнено.`],
    },
    link: {
      type: String,
      required: [true, 'Значение URL изображения должно быть заполнено.'],
      validate: {
        validator: (url) => linkValidation.test(url),
        message: 'Переданная строка не является URL изображения.',
      },
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      reference: 'user',
      ref: 'user',
      required: true,
    },
    likes: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          reference: 'user',
          ref: 'user',
        },
      ],
      default: [],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { versionKey: false },
);

module.exports = mongoose.model('card', cardSchema);

const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const helmet = require('helmet');

const routes = require('./routes');
const handleErrors = require('./middlewares/handleErrors');
const cors = require('./middlewares/cors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { PORT, DB_URL, LIMITS } = require('./config');

mongoose.connect(DB_URL, {
  useNewUrlParser: true,
});

const app = express();
app.use(helmet());
app.use(cors); // проверяем CORS
app.use(LIMITS);
app.use(express.json());
app.use(requestLogger); // подключаем логгер запросов
app.use(routes);
app.use(errorLogger); // подключаем логгер ошибок
app.use(errors());
app.use(handleErrors);

app.listen(PORT);

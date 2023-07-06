const handleErrors = (err, req, res, next) => {
  if (err.statusCode) {
    res.status(err.statusCode).send({
      message: err.message,
    });
  } else {
    res.status(500).send({
      message: err.message || 'Ошибка по умолчанию.',
    });
  }
  next();
};

module.exports = handleErrors;

class BadRequestError extends Error {
  constructor(message) {
    super(message || 'Не переданы имя пользователя или пароль.');
    this.statusCode = 400;
  }
}

module.exports = BadRequestError;

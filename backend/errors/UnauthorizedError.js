class UnauthorizedError extends Error {
  constructor(message) {
    super(message || 'Переданы некорректные имя пользователя или пароль.');
    this.statusCode = 401;
  }
}

module.exports = UnauthorizedError;

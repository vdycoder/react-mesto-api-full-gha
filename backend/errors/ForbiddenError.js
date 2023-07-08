class ForbiddenError extends Error {
  constructor(message) {
    super(message || 'Отказано в доступе.');
    this.statusCode = 403;
  }
}

module.exports = ForbiddenError;

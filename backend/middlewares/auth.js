const jwt = require('jsonwebtoken');

const UnauthorizedError = require('../errors/UnauthorizedError');

const { NODE_ENV, JWT_SECRET } = process.env;
const JWT_DEV_SECRET_KEY = 'super-duper-private-key';

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(new UnauthorizedError('Требуется пройти авторизацию.'));
  } else {
    const token = authorization.replace('Bearer ', '');
    let payload;

    try {
      payload = jwt.verify(
        token,
        NODE_ENV === 'production' ? JWT_SECRET : JWT_DEV_SECRET_KEY,
      );
    } catch (err) {
      next(new UnauthorizedError('Требуется пройти авторизацию.'));
    }
    req.user = payload;
    next();
  }
  next();
};

module.exports = auth;

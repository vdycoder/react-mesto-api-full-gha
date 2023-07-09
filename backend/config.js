require('dotenv').config();
const rateLimit = require('express-rate-limit');

const {
  PORT = 3000,
  DB_URL = 'mongodb://localhost:27017/mestodb',
  NODE_ENV = 'development',
  JWT_SECRET = 'super-duper-private-key',
} = process.env;

const JWT_DEV_SECRET_KEY = 'super-duper-private-key';
const SALT_LENGTH = 10;

const LIMITS = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

module.exports = {
  PORT,
  DB_URL,
  NODE_ENV,
  JWT_SECRET,
  JWT_DEV_SECRET_KEY,
  SALT_LENGTH,
  LIMITS,
};

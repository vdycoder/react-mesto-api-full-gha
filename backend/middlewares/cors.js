const allowedCors = [
  'https://api.mesto.vdycoder.nomoreparties.sbs',
  'https://mesto.vdycoder.nomoreparties.sbs',
  'http://api.mesto.vdycoder.nomoreparties.sbs',
  'http://mesto.vdycoder.nomoreparties.sbs',
  'http://localhost:3000',
  'http://localhost:3001',
];

const cors = (req, res, next) => {
  const { origin } = req.headers;
  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }
  const { method } = req;
  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
  const requestHeaders = req.headers['access-control-request-headers'];
  res.header('Access-Control-Allow-Credentials', true);

  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    return res.end();
  }

  return next();
};

module.exports = cors;

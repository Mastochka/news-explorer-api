const jwt = require('jsonwebtoken');
const { DEV_JWT_SECRET } = require('../config');
const { errorsMessages } = require('../consts');

const { NODE_ENV, JWT_SECRET } = process.env;
const UnauthorizedError = require('../errors/unauthorized-err');

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    throw new UnauthorizedError(errorsMessages.unauthorizedErr);
  }
  let payload;
  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : DEV_JWT_SECRET);
  } catch (err) {
    next(err);
  }
  req.user = payload;
  next();
};

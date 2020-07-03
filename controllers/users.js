const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user.js');
const UnauthorizedError = require('../errors/unauthorized-err');
const { DEV_JWT_SECRET } = require('../config');
const { errorsMessages, messages } = require('../consts');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.createUser = (req, res, next) => {
  const { email, name, password } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => {
      User.create({ email, name, password: hash })
        .then((user) => res.status(201).send({ data: { name: user.name, email: user.email } }))
        .catch(next);
    })
    .catch(next);
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new UnauthorizedError(errorsMessages.wrongEmailorPassErr);
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new UnauthorizedError(errorsMessages.wrongEmailorPassErr);
          }
          const token = jwt.sign(
            { _id: user._id },
            NODE_ENV === 'production' ? JWT_SECRET : DEV_JWT_SECRET,
            { expiresIn: '7d' },
          );
          return res.cookie('jwt', token, {
            maxAge: 3600000 * 24 * 7,
            httpOnly: true,
          }).send({ message: messages.login });
        })
        .catch(next);
    })
    .catch(next);
};

module.exports.getUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => res.send({ data: { name: user.name, email: user.email } }))
    .catch(next);
};

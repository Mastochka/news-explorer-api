const { errorsMessages, mongoCodes } = require('../consts');

module.exports = (err, req, res, next) => {
  const { statusCode = 500, message } = err;
  if (err.name === 'ValidationError') {
    return res.status(400).send({ message: errorsMessages.validationErr, error: message });
  }
  if (err.name === 'MongoError' && err.code === mongoCodes.dublicate) {
    return res.status(409).send({ message: errorsMessages.dublicateErr });
  }
  if (err.name === 'CastError') {
    return res.status(400).send({ message: errorsMessages.castError });
  }
  res.status(statusCode).send({ message: statusCode === 500 ? errorsMessages.serverErr : message });
  return next();
};

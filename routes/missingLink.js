const router = require('express').Router();
const NotFoundError = require('../errors/not-found-err');
const { errorsMessages } = require('../consts');

module.exports = router;
router.all('/*', (req, res, next) => Promise.reject(new NotFoundError(errorsMessages.missingLink))
  .catch(next));

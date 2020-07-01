const { errorsMessages } = require('../consts');

module.exports.checkPassword = (req, res, next) => {
  const { password } = req.body;
  if (!password || !password.trim()) {
    res.status(400).send({ message: errorsMessages.requiredPassword });
  } else next();
};

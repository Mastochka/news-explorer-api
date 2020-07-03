const router = require('express').Router();

const users = require('./users');
const articles = require('./articles');
const usersAuth = require('./usersAuth');
const missingLink = require('./missingLink');
const auth = require('../middlewares/auth');


router.use('/', usersAuth);
router.use('/', auth);
router.use('/articles', articles);
router.use('/users', users);
router.use(missingLink);
module.exports = router;

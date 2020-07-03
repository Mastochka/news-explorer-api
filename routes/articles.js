const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { createArticle, deleteArticle, findArticles } = require('../controllers/articles');

router.post('/', celebrate({
  body: Joi.object().keys({
    keyword: Joi.string().required(),
    title: Joi.string().required(),
    text: Joi.string().required(),
    date: Joi.string().required(),
    source: Joi.string().required(),
    link: Joi.string().required().uri(),
    image: Joi.string().required(),
  }),
}), createArticle);

router.get('/', findArticles);

router.delete('/:articleId', celebrate({
  params: Joi.object().keys({
    articleId: Joi.string().alphanum().length(24),
  }),
}), deleteArticle);

module.exports = router;

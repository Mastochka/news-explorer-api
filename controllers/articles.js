const Article = require('../models/article');
const ForbiddenError = require('../errors/forbidden-err');
const NotFoundError = require('../errors/not-found-err');
const { errorsMessages, messages } = require('../consts');

module.exports.createArticle = (req, res, next) => {
  const {
    keyword, title, text, date, source, link, image,
  } = req.body;
  Article.create({
    keyword, title, text, date, source, link, image, owner: req.user._id,
  })
    .then((article) => {
      res.status(201).send({
        data: {
          _id: article._id,
          keyword: article.keyword,
          title: article.title,
          text: article.text,
          date: article.date,
          source: article.source,
          link: article.link,
          image: article.image,
        },
      });
    })
    .catch(next);
};

module.exports.deleteArticle = (req, res, next) => {
  Article.findById(req.params.articleId).select('+owner')
    .then((article) => {
      if (!article) {
        throw new NotFoundError(errorsMessages.articleNotFoundErr);
      }
      if (article.owner.toString() !== req.user._id) {
        throw new ForbiddenError(errorsMessages.notAllowedErr);
      }
      return article.remove().then(() => res.send({ message: messages.articleDeleted }));
    })
    .catch(next);
};

module.exports.findArticles = (req, res, next) => {
  Article.find({ owner: req.user._id })
    .then((articles) => res.send({ data: articles }))
    .catch(next);
};

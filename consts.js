const errorsMessages = {
  articleNotFoundErr: 'Статьи не существует',
  wrongEmailorPassErr: 'Неправильные почта или пароль',
  notAllowedErr: 'Нет доступа',
  unauthorizedErr: 'Необходима авторизация',
  castError: 'Запрос к несуществующему объекту',
  validationErr: 'Ошибка валидации',
  serverErr: 'На сервере произошла ошибка',
  dublicateErr: 'Пользователь с этой почтой уже существует',
  missingLink: 'Не существующий адрес',
  requiredPassword: 'Поле "password" должно быть заполнено',
};

const messages = {
  articleDeleted: 'Статья удалена',
  login: 'Успешная авторизация',
};

const mongoCodes = {
  dublicate: 11000,
};

module.exports = {
  errorsMessages,
  messages,
  mongoCodes,
};

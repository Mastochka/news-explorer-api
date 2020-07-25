const express = require('express');

require('dotenv').config();

const cors = require('cors');

const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const { errors } = require('celebrate');

const { rateLimiter } = require('./rateLimiter');

const { NODE_ENV, DATABASE_URL } = process.env;
const { PORT, DEV_DATABASE_URL } = require('./config');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

const { requestLogger, errorLogger } = require('./middlewares/logger');
const errorHandler = require('./middlewares/errorHandler');
const index = require('./routes/index');

mongoose.connect(NODE_ENV === 'production' ? DATABASE_URL : DEV_DATABASE_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(helmet());

app.use(rateLimiter);

const corsOptions = {
  origin: ['https://mastochka.github.io', 'http://localhost:8081', 'http://localhost:8080'],
  methods: 'GET, POST, PUT, PATCH, DELETE, HEAD',
  preflightContinue: false,
  optionsSuccessStatus: 204,
  allowedHeaders: ['Content-Type'],
  credentials: true,
};

app.use('*', cors(corsOptions));

app.use(requestLogger);

app.use(index);

app.use(errors());
app.use(errorLogger);
app.use(errorHandler);

app.listen(PORT, () => {});

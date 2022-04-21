const path = require('path');
const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const monogoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const cookieParser = require('cookie-parser');
const userRouter = require('./routes/userRoutes');
const postRouter = require('./routes/postRoutes');
const viewRouter = require('./routes/viewRoutes');
const globalErrorHandler = require('./controllers/errorController');
const AppError = require('./utils/appError');

const app = express();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

/////////// GLOBAL Middleware

// note: SERVING STATIC FILES
app.use(express.static(path.join(__dirname, 'public')));

// note: SET SECURITY HTTP HEADERS
app.use(
  helmet({
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false,
  })
);

// note: DEVELOPMENT LOGGING
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// note: LIMIR REQUESTS FORM SAME API
const limiter = rateLimit({
  max: 100,
  windowMs: 15 * 60 * 1000,
  message: 'Too many requests from this ip, Please try again in an hour.',
});
app.use('/api', limiter);

// note: BODY PARSER, READING DATA FROM BODY INTO REQ.BODY
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(cookieParser());

// note: DATA SANITIZATION AGAINST NoSQL QUERY INJECTION
app.use(monogoSanitize());

// note: DATA SANITIZATION AGAINST XSS(XROSS-SITE SCRIPTING ATTACKS)
app.use(xss());

// note: PREVENT PARAMETER POLLUTION
// app.use(
//   hpp({
//     whitelist: [
//       'duration',
//       'ratingsAverage',
//       'ratingsQuantity',
//       'maxGroupSize',
//       'difficulty',
//       'price',
//     ],
//   })
// );

// note: BODY PARSER, READING DATA FROM BODY INTO REQ.BODY
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(cookieParser());

app.use('/', viewRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/posts', postRouter);

// note: GLOBAL ERROR HANDLING MIDDLEWARE
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});
app.use(globalErrorHandler);

module.exports = app;

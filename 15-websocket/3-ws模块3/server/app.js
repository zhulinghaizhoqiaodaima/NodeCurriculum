var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
// let session = require('express-session')
// const MongoStore = require("connect-mongo");

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loginsRouter = require('./routes/login');
const JWT = require('./utils/jwt');
const chatRouter = require('./routes/chat.js');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  if (req.url.includes('login')) {
    next()
    return;
  }
  const token = req.headers['authorization']?.split(" ")[1]
  if (token) {
      try {
        const payload =JWT.verify(token)
        const newToken =JWT.generate({
          id:payload.id,
          username:payload.username
        },'1d')
        res.header('Authorization',newToken)
        next()
      } catch (error) {
          res.status(401).send({code:-1,err:error})
      }
  } else {
    next()
  }

})


app.use('/login', loginsRouter);
app.use('/', indexRouter);
app.use('/api/user', usersRouter);
app.use('/chat', chatRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

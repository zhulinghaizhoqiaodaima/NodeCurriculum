var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
let session = require('express-session')
const MongoStore = require("connect-mongo");

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loginsRouter = require('./routes/login');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


//注册session
app.use(session({
  name: 'zhulinhaisystem',
  secret: 'dwhadhgwzdfstg', // 服务器生成 session 的签名
  cookie: {
    maxAge: 1000 * 60 * 10,
    secure: false, // fasle代表http就可以获取得到
  },
  resave: true,// 更新session后,重新计算过期时间
  saveUninitialized: true, // 初始化的时候无效，类似未激活的磁卡
  rolling: true, //为 true 表示 超时前刷新，cookie 会重新计时； 为 false 表示在超时前刷新多少次，都是按照第一次刷新开始计时。
  store: MongoStore.create({
    mongoUrl: 'mongodb://127.0.0.1:27017/zhulinhai_session',
    ttl: 1000 * 60 * 10 // 过期时间
  }),
}))

//设置中间件,session过期校验
app.use((req, res, next) => {
  if(req.url.includes('login')) {
    next()
    return;
  }
  if (req.session.user) {
    req.session.date = Date.now()
    next()
  } else {
    req.url.includes('api')?res.status(401).send({ok:0}): res.redirect('/login')
  }
})
app.use('/login', loginsRouter);
app.use('/', indexRouter);
app.use('/api/user', usersRouter);

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

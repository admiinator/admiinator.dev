var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var fs = require('node:fs');
const { fstat } = require('fs');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

function regRoutes(p='') {
  let r = 'routes'
  fs.readdirSync(`./${r}/${p}`).forEach(f => {
    fs.statSync(`./${r}/${p}/${f}`).isDirectory()
      ? (f !== "dist" && f !== "utils") && regRoutes(`${p}/${f}`)
      : app.use(`/${p}/${f.split('.')[0]}`, require(`./${r}/${p}/${f}`));
  });
}

regRoutes();

app.get('/', (req, res, next) => {
  res.status(301).redirect('/home');
})

app.use('/home', require('./routes/home'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

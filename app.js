//import necessary files
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


const fs = require('fs');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// app.use(cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/**
 * Registers routes as reading files from ./routes
 * p = path, f = folder/file, r = './routes'/root
 * Because variable 'p' as in ./${r}{p}/${f} is treated as a directory, it automatically puts '/' as a prefix and therefore should take away when making full str interpolation
 */
function registerRoutes(p='') {
  let r = 'routes'
  fs.readdirSync(`./${r}${p}`).forEach(f => {
    if(fs.statSync(`./${r}${p}/${f}`).isDirectory()) {
      if (f !== "dist" && f !== "utils") {
        registerRoutes(`${p}/${f}`);
      }
      else console.log(f, 'is a either a "dist" or "utils" folder. Skipping...')
    }
    else {
      f = f.split('.')[0];
      console.log(`Registered route ${p}/${f}`);
      app.use(`${p}/${f}`, require(`./${r}${p}/${f}`));
    }
  });
}

registerRoutes();

app.get('/', (req, res, next) => {
  res.status(301).redirect('/home');
});

app.use((req, res, next) => {
  next(createError(404));
})

// error handler
app.use(function(err, req, res, next) {
  console.log("error handler called")
  console.log("request", req);
  err ||= createError(404);
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page if it's a user
  res.redirect(`/err/${err.status||404}`);
  //Set error status if it's not a user (most likely a missing element)
});

module.exports = app;
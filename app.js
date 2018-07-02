var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var app = express();
var api = require('./server/routes/apiRoutes');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

var DIST_DIR = path.join(__dirname, 'dist');

app.get('/', function(req, res) {
  console.log('\n\n / \n\n');
  res.redirect('/users');
  return;
});

app.get('/users', function(req, res) {
  console.log('\n\n TASKS \n\n');
  res.sendFile(path.join(DIST_DIR, 'index.html'));
  return;
});

app.get('/dashboard', function(req, res) {
  res.sendFile(path.join(DIST_DIR, 'index.html'));
  return;
});

app.use(express.static(path.join(__dirname, 'dist')));

app.use('/api',   api);
app.use('/node_modules', express.static(__dirname + '/node_modules'));


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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

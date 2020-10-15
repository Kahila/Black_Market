var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var logger = require('morgan');
var sessMiddleware = require('node-sass-middleware');

//specify location of the rout
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loginRouter = require('./routes/login');
var registerRouter = require('./routes/register');
var homeRouter = require('./routes/home');
var settingsRouter = require('./routes/settings');
var checkoutRouter = require('./routes/checkout');
var cartRouter = require('./routes/cart');
var logoutRouter = require('./routes/logout');
var verifyRouter = require('./routes/verify');
var addRouter = require('./routes/add');
var adminRouter = require('./routes/admin');
var removeRouter = require('./routes/remove');
var historyRouter = require('./routes/history');
var uploadRouter = require('./routes/upload');
var adminBooksRouter = require('./routes/adminBooks');
var uploadsRouter = require('./routes/uploads');
var userRemoveRouter = require('./routes/userRemove');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(sessMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: true, 
  sourceMap: true
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'secret',
}))

app.use(function(req, res, next){
  res.locals.user = req.session.user;
  res.locals.errorMessages = req.session.errorMessages;
  next()
})

//let express know the rout 
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use('/home', homeRouter);
app.use('/settings', settingsRouter);
app.use('/checkout',checkoutRouter);
app.use('/cart', cartRouter);
app.use('/logout', logoutRouter);
app.use('/verify', verifyRouter);
app.use('/add', addRouter);
app.use('/admin', adminRouter);
app.use('/remove', removeRouter);
app.use('/history', historyRouter);
app.use('/upload', uploadRouter);
app.use('/adminBooks', adminBooksRouter);
app.use('/uploads', uploadsRouter);
app.use('/userRemove', userRemoveRouter);
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

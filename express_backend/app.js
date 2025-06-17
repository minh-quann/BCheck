var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var { CreateErrorRes } = require('./utils/ResHandler');

const db = require('./config/database');
const models = require('./models');
const bcrypt = require('bcrypt');
const { User } = models

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var rolesRouter = require('./routes/roles');
var authRouter = require('./routes/auth');
var jobRoute = require('./routes/job');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/roles', rolesRouter);
app.use('/auth', authRouter);
app.use('/jobs', jobRoute);


(async () => {
  try {
    // await db.sync({ force: true });
    // console.log("Database synced successfully");

    // const hashPass = await bcrypt.hash('admin123', 10);
    // const adminUser = await User.create({
    //   name: 'Admin',
    //   email: 'admin@site.com',
    //   phone_number: '1234567890',
    //   password: hashPass,
    //   tokenResetPassword: null,
    //   tokenResetPasswordExp: null,
    // });
    // console.log("Admin user created:", adminUser.toJSON());

    await db.sync();
  } catch (error) {
    console.error("Sync error:", error);
  }
})();

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
  CreateErrorRes(res,err.status||500,err)
});


module.exports = app;

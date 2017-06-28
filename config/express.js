var config = require('./config');
var express = require('express');
var morgan = require('morgan');
var compression = require('compression');
var bodyParser = require('body-parser');
var sass = require('node-sass-middleware');
var validator = require('express-validator');
var cookieSession = require('cookie-session');
var session = require('express-session');
var passport = require('passport');
var flash = require('connect-flash');
var RedisStroe = require('connect-redis')(session);


module.exports = function(){
  var app = express();
if (process.env.NODE_ENV==='development') {
  app.use(morgan('dev'));
}
else{
  app.use(compression);
}

app.use(session({
  secret : config.sessionSecret,
  resave : false,
  saveUninitialized : true
}));
app.use(flash()); // call before passport
app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(validator());//check validate

app.set('views','./app/views');
app.set('view engine','jade');

app.use(sass({
  src: './sass',
  dest: './public/css',
  outputStyle:'compressed',
  prefix:'/css',
  // debug: true ,
  indentedSyntax: true
}));
//static file in public
app.use(express.static('./public'));

require('../app/routes/index.routes')(app);
require('../app/routes/user.routes')(app);
return app;

}

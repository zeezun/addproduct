var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('mongoose').model('User');
var Product = require('mongoose').model('Product');
module.exports = function() {
    passport.use(new LocalStrategy(function(username, password, done){
      User.findOne({ username: username }, function(err, user){
        if (err) { return done(err); }
        if (!user || !user.authenticate(password)) {
          return done(null, false, {
            message: 'Invalid username of password'
          });
        }
        return done(null, user);
      });
    }));
};

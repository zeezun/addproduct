var user = require('../controllers/user.controller');
var passport= require('passport')

module.exports = function(app) {

  app.route('/signup')
        .get(user.renderSignup)
        .post(user.signup);



  app.route('/login')
        .get(user.renderLogin)
        .post(passport.authenticate('local', {
          successRedirect: '/',
          failureRedirect: '/login',
          failureFlash: true
  }));

  app.post('/logout', user.logout);
  app.route('/index')
        .get(user.renderIndex);



app.route('/user')
.post(user.create)
.get(user.list);

app.route('/user/:username')
  .get(user.read)
  .put(user.update)
  .delete(user.delete);
app.param('username', user.userByUsername);

};

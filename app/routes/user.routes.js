var user = require('../controllers/user.controller');


module.exports = function(app) {

  app.route('/register')
    .get(user.renderRegister);

      app.route('/login')
        .get(user.renderLogin);



  app.post('/login', user.login);
  app.post('/logout', user.logout);

};

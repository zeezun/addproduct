exports.login = function(req, res){
  console.log(req.body);
  console.log('Email: ' + req.body.email);
  console.log('Passwored: ' + req.body.password);
  req.checkBody('email', 'Invalid email').notEmpty().isEmail();
  req.sanitizeBody('email').normalizeEmail();
  var errors = req.validationErrors();
  if (errors){
    res.render('index',{
      title: 'There have been validation errors: ' + JSON.stringify(errors),
      isLoggedIn: false
    });
    return;
  }a
  if (req.body.remember == 'remember'){
    req.session.remember = true;
    req.session.email = req.body.email;
  }

  res.render('index', {
    title: 'Logged in as ' + req.body.email,
    isLoggedIn: true
  });
};

exports.logout = function(req, res){
  req.session = null;
  res.render('index', {
    title: 'See you again later',
    isLoggedIn: false
  });
};
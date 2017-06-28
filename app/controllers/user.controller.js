var User = require('mongoose').model('User');
var passport = require('passport')

var getErrorMessage = function(err) {
  var messages = '';
  if (err.code) {
    switch (err.code) {
      case 11000:
      case 11001:
          messages = 'username ซ้ำค่ะ กรุณากรอกใหม่';
          break;
        default:
          messages = 'มีบ้างอย่างผิดพลาดค่ะ'
        }
      }else {
        for (var errName in err.errors) {
          if (err.errors[errName].message) {
            messages = err.errors[errName].message;
          }
        }
      }
      return messages;
};
exports.renderSignup = function(req,res){
 if(!req.user){
  res.render('signup',{
  title:'Sign up',
  messages:req.flash('error')
  });
 }else {
  return res.redirect('/');
 }

};
exports.renderLogin = function(req,res){
 if(!req.user){
  res.render('login',{
   title:'Log in',
   messages:req.flash('error')||req.flash('info')
  });
 }else{
  return res.redirect('/');
 }
};
exports.signup = function(req,res,next){
 if(!req.user){//chekc user login
  var user = new User(req.body);
  user.provider = 'local';

  user.save(function(err){
   if(err){
    var message = getErrorMessage(err);

    req.flash('error',message);
    return res.redirect('/signup');
   }

   req.login(user,function(err){//method login  from package passport
    // call strategy   config/strategies/local.js
    if(err) return next(err);
    return res.redirect('/');
   });
  });

 }else{
  return res.redirect('/');
 }
};

  exports.signup = function(req, res, next) {
      if (!req.user) {
        var user = new User(req.body);
        user.provider = 'local';

        user.save(function(err) {
          if (err) {
              var message = getErrorMessage(err);

              req.flash('error', message);
              return res.redirect('/signup');
            }

          req.login(user, function(err) {
              if (err) return next(err);
              return res.redirect('/');
          });
        });
      } else {
      return res.redirect('/');
    }
  };
  exports.renderSignup = function(req, res) {
        if (!req.user) {
        res.render('signup', {
          title: 'Sign up',
          messages: req.flash('error')
        });
      }else {
        return res.res.redirect('/');
      }
  };


  exports.renderIndex= function(req, res){
    res.render('index',{
      title: 'Index',
    });
  };

  exports.list = function(req,res,next){
   User.find({},function(err,User){// find in mongoDB
     if(err){
      return next(err);
     }else{
      res.json(User);
     }
   });
  };


  exports.create = function(req, res, next) {
    var user = new User(req.body);

    user.save(function(err) {
      if (err) {
          return next(err);
        } else {
          res.json(user);
        }
    });
  };
  exports.delete = function(req, res, next) {
    req.user.remove(function(err) {
      if (err) {
          return next(err);
        }else {
          res.json(req.user);
        }
    });
  };
  exports.update = function(req, res, next){
      User.findOneAndUpdate({username: req.user.username}, req.body,
        function(err, user) {
          if (err) {
            return next(err);
          } else {
              res.json(user);
          }
      });
  };
  exports.read = function(req, res){
      res.json(req.user);
  };
  exports.userByUsername = function(req,res,next,username){
   User.findOne({
    username:username
   },function(err,user){
    if(err){
     return next(err);
    }else{
     req.user = user;
     next();
    }
   });
  };
  exports.logout = function(req,res){
   req.logout();// method   passport
   res.redirect('/');
  };

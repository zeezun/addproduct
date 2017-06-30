exports.render = function(req, res){

if(req.user && req.user.username === 'zeezun') {
    res.render('add', {
    title: 'add' ,
    username : req.user ? req.user.username : ''
      });
  } else {
    res.render('index', {
    title: 'Hello World' ,
    username : req.user ? req.user.username : ''
      });
    }
};

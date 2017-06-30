var Product = require('mongoose').model('Product');
var passport = require('passport')


exports.renderAdd = function(req,res){
 if(!req.product){
  res.render('add',{
  title:'Add',
  messages:req.flash('error')
});
 }else {
  return res.redirect('/');
 }
};

exports.add = function(req,res,next){
//  console.log('aaaaaaaaaaaaaaaaaaa' + req.product);
 if(!req.product){//chekc user login
  var product = new Product(req.body);
  product.provider = 'local';

  product.save(function(err){
   if(err){
    var message = getErrorMessage(err);


    return res.redirect('/add');
   }
 });
}else{
  return res.redirect('/');
 }
};


  exports.create = function(req, res, next) {
    var product = new Product(req.body);

    product.save(function(err) {
      if (err) {
          return next(err);
        } else {
          res.json(product);
        }
    });
  };

  exports.list = function(req,res,next){
   Product.find({},function(err,Product){// find in mongoDB
     if(err){
      return next(err);
     }else{
      res.json(Product);
     }
   });
  };

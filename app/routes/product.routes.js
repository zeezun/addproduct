var product = require('../controllers/product.controller');


module.exports = function(app) {

  app.route('/add') //link page
      .get(product.renderAdd)
      .post(product.add);


      app.route('/product') //database
      .post(product.create)
      .get(product.list);



  };

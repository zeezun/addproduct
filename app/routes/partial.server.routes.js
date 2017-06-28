module.exports = function(app) {
  var partial = require('../controllers/partial.server.controller');
  app.get('/module/:module/views/:partial', partial.render);
};

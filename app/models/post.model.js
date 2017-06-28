var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PostSchema = Schema({
      title:{
        type: String,
        require: true
      },
      content : {
        type: String,
        require: true
      },
      author: {
        type: Schema.ObjectId,
        ref: 'User'
      }
});
mongoose.model('Post', PostSchema);

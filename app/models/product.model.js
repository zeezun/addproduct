var mongoose = require('mongoose');
//var crypto = require('crypto');
var Schema = mongoose.Schema;

var ProductSchema = new Schema({
    nameproduct: String,
    price: String,
    image: String
});

mongoose.model('Product', ProductSchema);

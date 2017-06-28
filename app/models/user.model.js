var mongoose = require('mongoose');
var crypto = require('crypto');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  firstName: String,
  username: {
    type: String,
    unique: true,
    require: 'Username is required',
    trim: true,
  },
  email: {
    type: String,
    index: true,
    match: /.+\@.+\.+/
  },
  password: {
      type: String,
      validate: [
        function(password){
          return password && password.length >= 6;
        },'Password must be at least 6 characters']
      },
  salt : {
    type: String
  },
  provider: {
    type: String,
    require: 'provider is required'
  },
  providerId: String,
  providerDate: {},

create: {
type : Date,
default: Date.now
}

});

UserSchema.pre('save',function(next){// pre-save
 if(this.password){

   this.salt = new Buffer(crypto.randomBytes(16).toString('base64'),'base64');
   this.password = this.hashPassword(this.password);
 }
 next();
});

UserSchema.methods.hashPassword = function(password){
 //crete hash password
 return crypto.pbkdf2Sync(password,this.salt,10000,64).toString('base64');
};
UserSchema.methods.authenticate = function(password){
 return this.password === this.hashPassword(password);
 //return password after hash === this.hashPassword(password user );
};

mongoose.model('User',UserSchema);//User is Modelname (table)

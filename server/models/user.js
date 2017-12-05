var mongoose = require('mongoose');
var crypto = require('crypto'),
    algorithm = 'aes-256-ctr',
    password = 'd6F3Efeq';

function encrypt(text){
  var cipher = crypto.createCipher(algorithm,password)
  var crypted = cipher.update(text,'utf8','hex')
  crypted += cipher.final('hex');
  return crypted;
}
 
function decrypt(text){
  var decipher = crypto.createDecipher(algorithm,password)
  var dec = decipher.update(text,'hex','utf8')
  dec += decipher.final('utf8');
  return dec;
}

var Schema = mongoose.Schema;

var UserSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true,
      validate: function(v) {
        return /(.+)@(.+){2,}\.(.+){2,}/.test(v);
      },
    },
    password: { type: String, required: true },
    age: { type: Number, required: true }
});

UserSchema.pre('validate', function(next) {
  this.password = encrypt(this.password);
  next();
});

UserSchema.statics.authenticate = function({ email: email, password: password }) {
  return new Promise((resolve, reject) => {    
    if(!email && !password) {
      reject('No email or password supplied');
    }
  
    var encryptedPass = encrypt(password);
  
    this.findOne({ email: email, password: encryptedPass })
      .then(function(obj) {
        if(obj) {
          resolve(obj);
        }
        
        reject('Invalid email or password');
      })
      .catch(function(err) {
        reject(err)
      })
  });
}

//Export function to create "SomeModel" model class
module.exports = mongoose.model('User', UserSchema);
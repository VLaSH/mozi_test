var jwt = require('jsonwebtoken');

function createToken(payload = {}) {
  return new Promise(function(resolve, reject) {
    jwt.sign(payload, process.env.JWT_SECRET, function(err, token) {
      if(err) {
        reject(err);
      } else {
        resolve(token)
      }
    })
  })
}

function verifyToken(token) {
  return new Promise(function(resolve, reject) {
    if(!token) {
      reject('no token supplied');
    }
    
    jwt.verify(token, process.env.JWT_SECRET, function(err, decoded) {
      if(err) {
        reject(err);
      } else {
        resolve(token)
      }
    })
  })
}

module.exports = {
  createToken,
  verifyToken
};
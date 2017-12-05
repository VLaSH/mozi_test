var jwt = require('jsonwebtoken');

function createToken(payload = {}) {
  return new Promise(function(resolve, reject) {
    jwt.sign(payload, process.env.JWT_SECRET || 'secret', function(err, token) {
      if(err) {
        reject(err);
      } else {
        resolve(token)
      }
    })
  })
}

// One of edge cases. If token is invalid 401 is sent to client.
// If it is socket connection, the handshake is considered invalid.
function verifyToken(token) {
  return new Promise(function(resolve, reject) {
    if(!token) {
      reject('no token supplied');
    }
    
    jwt.verify(token, process.env.JWT_SECRET || 'secret', function(err, decoded) {
      if(err) {
        reject(err);
      } else {
        resolve(decoded)
      }
    })
  })
}

function authorizeRequest(authHeader) {
  if(authHeader && authHeader.match('Bearer')) {
    let [, token] = authHeader.split(' ');
    return verifyToken(token);
  }

  return Promise.reject('no token specified');
}

module.exports = {
  createToken,
  verifyToken,
  authorizeRequest
};
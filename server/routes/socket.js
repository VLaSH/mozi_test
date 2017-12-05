const Mood = require('../models/mood');
const jwt = require('../utils/jwt');

function socketRoute(server) {
  const io = require('socket.io')(server, { path: '/socket' });
  
  io.use((socket, next) => {
    jwt.authorizeRequest(socket.handshake.headers['authorization'])
      .then(function(decoded) {
        socket.data = { userId: decoded.id }
        return next();
      })
      .catch(function() {
        console.log('not authorized', socket.handshake.headers['authorization'])
        return next(new Error('authentication error'));    
      })
  });
  
  io.on('connection', function(socket, data) {
    console.log('connection established');
    listenMood(socket);
  })

  function listenMood(socket) {
    socket.on('mood', function(data, res) {
      console.log('message received', res);

      var newMood = new Mood(Object.assign({ userId: socket.data.userId }, data));
      newMood.save()
        .then(function() {
          socket.emit('mood', { status: 'ok', message: `Mood ${data.moodValue} saved to database.` });
        })
        .catch(function(err) {
          socket.emit('mood', { status: 'error', message: err });
        });
    });
  }  
}

module.exports = socketRoute;



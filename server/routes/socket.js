const Mood = require('../models/mood');

function socketRoute(server) {
  const io = require('socket.io')(server, { path: '/socket' });
  io.on('connection', function(socket) {
    console.log('connection established');
    listenMood(socket);
  })

  function listenMood(socket) {
    socket.on('mood', function(data, res) {
      console.log('message received');

      var newMood = new Mood(data);
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



var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(process.env.DATABASE_URL);
mongoose.connection.on('error', console.error.bind(console, 'connection error:'));

module.exports = mongoose.connection;
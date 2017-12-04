var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(process.env.DATABASE_URL || 'mongodb://localhost/mozi-test');
mongoose.connection.on('error', console.error.bind(console, 'connection error:'));

module.exports = mongoose.connection;
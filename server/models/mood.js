var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var MoodSchema = new Schema({
  userId: { type: String, required: true },
  moodValue: { type: String, required: true }
});

//Export function to create "SomeModel" model class
module.exports = mongoose.model('Mood', MoodSchema);
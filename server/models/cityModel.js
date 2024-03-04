const mongoose = require('mongoose');

const citySchema = new mongoose.Schema({
  cityName: {
    type: String,
    unique: true,
    required: [true, 'A city must have a name'],
  },
  country: String,
  emoji: String,
  date: String,
  notes: String,
  position: Object,
});
const City = mongoose.model('City', citySchema);

module.exports = City;

const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const app = require('./app');

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose.connect(DB, {}).then(con => {
  console.log(con.connection);
  console.log('DB connection successful!');
});

const citySchema = new mongoose.Schema({
  cityName: {
    type: String,
    unique: true,
  },
  country: String,
  emoji: String,
  date: String,
  notes: String,
  position: Object,
});
const City = mongoose.model('City', citySchema);

const testCity = new City({
  cityName: 'Madrid',
  country: 'Spain',
  emoji: '🇪🇸',
  date: '2027-07-15T08:22:53.976Z',
  notes: '',
  position: { lat: 40.46635901755316, lng: -3.7133789062500004 },
});

testCity
  .save()
  .then(doc => {
    console.log(doc);
  })
  .catch(err => {
    console.log('ERROR: ', err);
  });

// START SERVER
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}...`);
});

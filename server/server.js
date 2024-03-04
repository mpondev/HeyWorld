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

// START SERVER
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}...`);
});

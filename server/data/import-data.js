// Script for deleting/importing data to database
// Run:
//  Delete: node data/import-data.js --delete
//  Import: node data/import-data.js --import

const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const City = require('./../models/cityModel.js');

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose.connect(DB, {}).then(con => {
  console.log('DB connection succesful!');
});

// Read JSON file
const cities = JSON.parse(fs.readFileSync(`${__dirname}/cities.json`, 'utf-8'));

// Import data into database
const importData = async () => {
  try {
    await City.create(cities);
    console.log('Data successfully loaded!');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

// Delete all data from collection
const deleteData = async () => {
  try {
    await City.deleteMany();
    console.log('Data successfully deleted!');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}

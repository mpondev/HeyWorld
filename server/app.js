const fs = require('fs');
const express = require('express');

const app = express();

// MIDDLEWARES
// app.use(express.json());
// app.use(express.static(`${__dirname}/public`));

const cities = JSON.parse(fs.readFileSync(`${__dirname}/data/cities.json`));

app.get('/api/v1/cities', (req, res) => {
  res.status(200).json({
    status: 'success',
    results: cities.length,
    data: {
      cities,
    },
  });
});

module.exports = app;

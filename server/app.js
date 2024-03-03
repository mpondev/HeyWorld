const fs = require('fs');
const express = require('express');

const app = express();

// MIDDLEWARES
app.use(express.json());
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

app.post('/api/v1/cities', (req, res) => {
  const newID = cities[cities.length - 1].id + 1;
  const newCity = Object.assign({ id: newID }, req.body);
  console.log(req.body);

  cities.push(newCity);

  fs.writeFile(`${__dirname}/data/cities.json`, JSON.stringify(cities), err => {
    res.status(201).json({
      status: 'success',
      data: {
        city: newCity,
      },
    });
  });
});

module.exports = app;

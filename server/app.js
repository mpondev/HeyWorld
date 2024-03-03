const fs = require('fs');
const express = require('express');

const app = express();

// MIDDLEWARES
app.use(express.json());
// app.use(express.static(`${__dirname}/public`));

let cities = JSON.parse(fs.readFileSync(`${__dirname}/data/cities.json`));

app.get('/api/v1/cities', (req, res) => {
  res.status(200).json({
    status: 'success',
    results: cities.length,
    data: {
      cities,
    },
  });
});

app.get('/api/v1/cities/:id', (req, res) => {
  const id = req.params.id * 1;
  const city = cities.find(el => el.id === id);

  if (!city) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      city,
    },
  });
});

app.post('/api/v1/cities', (req, res) => {
  const newID = cities[cities.length - 1].id + 1;
  const newCity = Object.assign({ id: newID }, req.body);

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

app.patch('/api/v1/cities/:id', (req, res) => {
  const id = req.params.id * 1;
  const city = cities.find(el => el.id === id);

  if (!city) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      city: '<Updated city here...>',
    },
  });
});

app.delete('/api/v1/cities/:id', (req, res) => {
  const id = req.params.id * 1;
  const city = cities.find(el => el.id === id);

  if (!city) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }

  cities = cities.filter(city => city.id !== id);

  fs.writeFile(`${__dirname}/data/cities.json`, JSON.stringify(cities), err => {
    res.status(204).json({
      status: 'success',
      data: null,
    });
  });
});

module.exports = app;

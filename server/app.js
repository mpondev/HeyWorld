const fs = require('fs');
const express = require('express');

const app = express();

// MIDDLEWARES
app.use(express.json());
// app.use(express.static(`${__dirname}/public`));

let cities = JSON.parse(fs.readFileSync(`${__dirname}/data/cities.json`));

// GET all cities
const getAllCities = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: cities.length,
    data: {
      cities,
    },
  });
};

// GET a single city
const getCity = (req, res) => {
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
};

// CREATE a new city
const createCity = (req, res) => {
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
};

// UPDATE a city (not implemented by now)
const updateCity = (req, res) => {
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
};

// DELETE a city
const deleteCity = (req, res) => {
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
};

// app.get('/api/v1/cities', getAllCities);
// app.get('/api/v1/cities/:id', getCity);
// app.post('/api/v1/cities', createCity);
// app.patch('/api/v1/cities/:id', updateCity);
// app.delete('/api/v1/cities/:id', deleteCity);

app.route('/api/v1/cities').get(getAllCities).post(createCity);
app
  .route('/api/v1/cities/:id')
  .get(getCity)
  .patch(updateCity)
  .delete(deleteCity);

module.exports = app;

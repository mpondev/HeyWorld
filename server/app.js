const fs = require('fs');
const express = require('express');
const morgan = require('morgan');

const app = express();

// MIDDLEWARES
app.use(morgan('dev'));
app.use(express.json());
// app.use(express.static(`${__dirname}/public`));

let cities = JSON.parse(fs.readFileSync(`${__dirname}/data/cities.json`));

// ROUTE HANDLERS
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

// Functionality not implemented by now (only handlers)
const getAllUsers = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!',
  });
};

const getUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!',
  });
};

const createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!',
  });
};
const updateUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!',
  });
};
const deleteUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!',
  });
};

// app.get('/api/v1/cities', getAllCities);
// app.get('/api/v1/cities/:id', getCity);
// app.post('/api/v1/cities', createCity);
// app.patch('/api/v1/cities/:id', updateCity);
// app.delete('/api/v1/cities/:id', deleteCity);

// ROUTES
const cityRouter = express.Router();
const userRouter = express.Router();

cityRouter.route('/').get(getAllCities).post(createCity);
cityRouter.route('/:id').get(getCity).patch(updateCity).delete(deleteCity);

userRouter.route('/').get(getAllUsers).post(createUser);
userRouter.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

app.use('/api/v1/cities', cityRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;

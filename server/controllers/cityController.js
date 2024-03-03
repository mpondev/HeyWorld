const fs = require('fs');

let cities = JSON.parse(fs.readFileSync(`${__dirname}/../data/cities.json`));

exports.checkId = (req, res, next, val) => {
  console.log(`City ID is: ${val}`);
  const id = req.params.id * 1;
  const city = cities.find(el => el.id === id);

  if (!city) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }

  next();
};

exports.checkBody = (req, res, next) => {
  if (!req.body.cityName || !req.body.country) {
    return res.status(400).json({
      status: 'fail',
      message: 'Missing city name or country',
    });
    next();
  }
};

exports.getAllCities = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: cities.length,
    data: {
      cities,
    },
  });
};

exports.getCity = (req, res) => {
  const id = req.params.id * 1;
  const city = cities.find(el => el.id === id);

  res.status(200).json({
    status: 'success',
    data: {
      city,
    },
  });
};

exports.createCity = (req, res) => {
  const newID = cities[cities.length - 1].id + 1;
  const newCity = Object.assign({ id: newID }, req.body);

  cities.push(newCity);

  fs.writeFile(
    `${__dirname}/../data/cities.json`,
    JSON.stringify(cities),
    err => {
      res.status(201).json({
        status: 'success',
        data: {
          city: newCity,
        },
      });
    }
  );
};

// (Not implemented yet)
exports.updateCity = (req, res) => {
  const id = req.params.id * 1;
  const city = cities.find(el => el.id === id);

  res.status(200).json({
    status: 'success',
    data: {
      city: '<Updated city here...>',
    },
  });
};

exports.deleteCity = (req, res) => {
  const id = req.params.id * 1;
  const city = cities.find(el => el.id === id);

  cities = cities.filter(city => city.id !== id);

  fs.writeFile(
    `${__dirname}/../data/cities.json`,
    JSON.stringify(cities),
    err => {
      res.status(204).json({
        status: 'success',
        data: null,
      });
    }
  );
};

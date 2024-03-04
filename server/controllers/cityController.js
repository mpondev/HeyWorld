const City = require('./../models/cityModel.js');

exports.getAllCities = async (req, res) => {
  try {
    const cities = await City.find();
    res.status(200).json({
      status: 'success',
      results: cities.length,
      data: {
        cities,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.getCity = async (req, res) => {
  try {
    // City.findOne({ _id: req.params.id })
    const city = await City.findById(req.params.id);
    res.status(200).json({
      status: 'success',
      data: {
        city,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.createCity = async (req, res) => {
  try {
    const newCity = await City.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        city: newCity,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

// (Not implemented yet)
exports.updateCity = (req, res) => {
  // const id = req.params.id * 1;
  // const city = cities.find(el => el.id === id);
  // res.status(200).json({
  //   status: 'success',
  //   data: {
  //     city: '<Updated city here...>',
  //   },
  // });
};

exports.deleteCity = (req, res) => {
  // const id = req.params.id * 1;
  // const city = cities.find(el => el.id === id);
  // cities = cities.filter(city => city.id !== id);
  // fs.writeFile(
  //   `${__dirname}/../data/cities.json`,
  //   JSON.stringify(cities),
  //   err => {
  //     res.status(204).json({
  //       status: 'success',
  //       data: null,
  //     });
  //   }
  // );
};

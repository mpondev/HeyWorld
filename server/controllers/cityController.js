const City = require('./../models/cityModel.js');
const APIFeatures = require('./../utils/apiFeatures.js');

exports.aliasTopWestern = (req, res, next) => {
  req.query.limit = '3';
  req.query.sort = '-position.lng';
  req.query.fields = 'cityName, country, position';
  next();
};

exports.getAllCities = async (req, res) => {
  try {
    // Execute query
    const features = new APIFeatures(City.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    const cities = await features.query;

    // Send response
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
exports.updateCity = async (req, res) => {
  try {
    const city = await City.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
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

exports.deleteCity = async (req, res) => {
  try {
    await City.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

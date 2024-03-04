const City = require('./../models/cityModel.js');
const APIFeatures = require('./../utils/apiFeatures.js');
const catchAsync = require('./../utils/catchAsync.js');

exports.aliasTopWestern = (req, res, next) => {
  req.query.limit = '3';
  req.query.sort = '-position.lng';
  req.query.fields = 'cityName, country, position';
  next();
};

exports.getAllCities = catchAsync(async (req, res, next) => {
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
});

exports.getCity = catchAsync(async (req, res, next) => {
  // City.findOne({ _id: req.params.id })
  const city = await City.findById(req.params.id);

  res.status(200).json({
    status: 'success',
    data: {
      city,
    },
  });
});

exports.createCity = catchAsync(async (req, res, next) => {
  const newCity = await City.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      city: newCity,
    },
  });
});

// (Not implemented yet)
exports.updateCity = catchAsync(async (req, res, next) => {
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
});

exports.deleteCity = catchAsync(async (req, res) => {
  await City.findByIdAndDelete(req.params.id);
  res.status(204).json({
    status: 'success',
    data: null,
  });
});

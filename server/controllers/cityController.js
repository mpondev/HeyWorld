const City = require('./../models/cityModel.js');

exports.getAllCities = async (req, res) => {
  try {
    // Build query
    // Filtering
    const queryObj = { ...req.query };
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach(el => delete queryObj[el]);

    // Advanced filtering
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);

    let query = City.find(JSON.parse(queryStr));

    //Sorting
    if (req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' ');
      query = query.sort(sortBy);
    } else {
      // default sort
      query = query.sort('-date');
    }

    // Field limiting (projecting)
    if (req.query.fields) {
      const fields = req.query.fields.split(',').join(' ');
      query = query.select(fields);
    } else {
      // default field limiting
      query = query.select('-__v');
    }

    // Execute query
    const cities = await query;

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

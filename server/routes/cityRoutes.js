const express = require('express');
const cityController = require('./../controllers/cityController.js');

const router = express.Router();

// Aliasing
router
  .route('/top-3-western')
  .get(cityController.aliasTopWestern, cityController.getAllCities);

router
  .route('/')
  .get(cityController.getAllCities)
  .post(cityController.createCity);
router
  .route('/:id')
  .get(cityController.getCity)
  .patch(cityController.updateCity)
  .delete(cityController.deleteCity);

module.exports = router;

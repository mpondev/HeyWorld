const express = require('express');
const cityController = require('../controllers/cityController.js');

const router = express.Router();

router.param('id', cityController.checkId);

router
  .route('/')
  .get(cityController.getAllCities)
  .post(cityController.checkBody, cityController.createCity);
router
  .route('/:id')
  .get(cityController.getCity)
  .patch(cityController.updateCity)
  .delete(cityController.deleteCity);

module.exports = router;

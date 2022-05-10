var express = require('express');
var router = express.Router();

// Require controller modules.
var forecast_controller = require('../controllers/forecastController');

/// FORECAST ROUTES ///

// GET forecast home page.
router.get('/', forecast_controller.index);

// GET all forecasts page.
router.get('/all', forecast_controller.forecast_list);

//GET forecast detail page
router.get('/:id', forecast_controller.forecast_detail);

module.exports = router;

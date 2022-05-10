var Forecast = require('../models/forecast');
var async = require('async');

// Display forecast homepage.
exports.index = function(req, res) {

    async.parallel({
        forecast_count: function(callback) {
            Forecast.countDocuments({}, callback); // Pass an empty object as match condition to find all documents of this collection
        }
    }, function(err, results) {
        res.render('index', { title: 'Coastal Water Forecast from Melbourne Weather Station', error: err, data: results });
    });
};

// Display list of all forecasts.
exports.forecast_list = function(req, res) {
    Forecast.find({}, 'reportDate reportTime')
    .sort({reportDate : 1})
    .exec(function (err, list_forecasts) {
      if (err) { return next(err); }
      //Successful, so render
      res.render('forecast_list', { title: 'All Forecasts', forecast_list: list_forecasts });
    });
};

// Display detail page for a specific forecast.
exports.forecast_detail = function(req, res, next) {
    async.parallel({
        forecast: function(callback) {
            Forecast.findById(req.params.id)
              .exec(callback)
        }
    }, function(err, results) {
        if (err) { return next(err); } // Error in API usage.
        if (results.forecast==null) { // No results.
            var err = new Error('Forecast not found');
            err.status = 404;
            return next(err);
        }
        // Successful, so render.
        res.render('forecast_detail', { title: 'Forecast Detail', data: results } );
    });
};



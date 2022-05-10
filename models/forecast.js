var mongoose = require('mongoose');
const { DateTime } = require("luxon");

var Schema = mongoose.Schema;

var ForecastSchema = new Schema(
  {
      updated: { type: Date, default: Date.now() },
      reportDate: {type: Date, required: true,},
      reportTime: {type: String, required: true,},
      reportName: {type: String, required: true,},
      source: {type: String, required: true, maxLength: 100},
      synopsis: {type: String, required: true,},
      westWall: {type: Number, required: true,},
      area: {type: String, required: true,},
      areaForecast: {type: String, required: true,}
  }
);

ForecastSchema
.virtual('reportDate_formatted')
.get(function () {
  return DateTime.fromJSDate(this.reportDate).toLocaleString(DateTime.DATE_MED);
});

// Virtual for forecast's URL
ForecastSchema
.virtual('url')
.get(function () {
  return '/forecasts/' + this._id;
});


//Export model
module.exports = mongoose.model('Forecast', ForecastSchema);

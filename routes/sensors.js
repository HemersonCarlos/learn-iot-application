var express = require('express');
var router = express.Router();
var devicesService = require('../services/devicesService');

router.get('/', function(req, res, next) {
  var sensors = devicesService.getSensors();

  res.render('sensors', { sensors: sensors });
}); 

router.post('/:id/add', function(req, res, next) {
  var sensorId = req.params.id;
  var temperature = req.body.temperature;
  var humidity = req.body.humidity;

  devicesService.addMeasurement(sensorId, temperature, humidity)
  res.send(200);
});

module.exports = router;
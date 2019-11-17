var express = require('express');
var router = express.Router();
var devicesService = require('../services/devicesService');

router.get('/:id', function(req, res, next) {
  var actuatorId = req.params.id;

  var actuators = devicesService.getActuators();
  var actuator = actuators.find((actuator) => actuator.id == actuatorId);

  res.json(actuator);
});

module.exports = router;
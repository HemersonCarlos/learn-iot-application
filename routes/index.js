var express = require('express');
var router = express.Router();
var devicesService = require('../services/devicesService');

/* GET home page. */
router.get('/', function(req, res, next) {

  var sensors = devicesService.getSensors();
  var actuators = devicesService.getActuators();

  res.render('index', { title: 'Plataforma IoT', sensors: sensors, actuators: actuators } );
});

router.post('/:id', function(req, res, next) {

  var actuators = devicesService.getActuators();
  var id = req.params.id;
  var actuator = actuators.find(actuator => actuator.id == id);

  actuator.status = actuator.status ? 0 : 1;

  devicesService.saveFileActuators(actuators);

  res.redirect('/');

});

module.exports = router;
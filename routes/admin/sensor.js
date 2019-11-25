var express = require('express');
var router = express.Router();
var devicesService = require('../../services/devicesService');

router.get('/', function(req, res, next) {

    var sensor = devicesService.getSensors();

    var data = {
        sensor: sensor
    }

    res.render('admin/sensor/index', data);

});

router.get('/create', function(req, res, next) { 

    res.render('admin/sensor/create');

});

router.post('/create', function(req, res, next) {

    var sensor = devicesService.getSensors();
    var newId =  sensor.length + 1;

    var newSensor = {};
    newSensor.id = newId;
    newSensor.name = req.body.theSensorName;
    newSensor.measurements = [];

    devicesService.saveNewSensors(newSensor);

    res.redirect('/admin/sensor');

});

module.exports = router;
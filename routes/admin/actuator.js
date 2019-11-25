var express = require('express');
var router = express.Router();
var devicesService = require('../../services/devicesService');

router.get('/', function(req, res, next) {

    var actuator = devicesService.getActuators();

    var data = {
        actuator: actuator
    }

    res.render('admin/actuator/index', data);

});

router.get('/create', function(req, res, next) { 

    res.render('admin/actuator/create');

});

router.post('/create', function(req, res, next) {

    var actuator = devicesService.getActuators()
    var newId =  actuator.length + 1;
    var newActuator = {};

    newActuator.id = newId;
    newActuator.name = req.body.theActuatorName;
    newActuator.status = req.body.actuatorStatus == "on" ? 1 : 0;

    devicesService.saveNewActuator(newActuator);

    res.redirect('/admin/actuator');

});

router.post('/:id', function(req, res, next) {

    var actuators = devicesService.getActuators();
    var id = req.params.id;
    var actuator = actuators.find(actuator => actuator.id == id);

    actuator.status = actuator.status ? 0 : 1;

    devicesService.saveFileActuators(actuators);

    res.redirect('/admin/actuator');

});

module.exports = router;
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

    devicesService.saveNewActuator(newActuator);

    res.redirect('/admin/actuator');

});

module.exports = router;
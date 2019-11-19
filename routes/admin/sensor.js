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

module.exports = router;
var express = require('express');
var router = express.Router();
var devicesService = require('../services/devicesService');

/* GET home page. */
router.get('/', function(req, res, next) {

  var sensors = devicesService.getSensors();

  res.render('index', { title: 'Plataforma IoT', sensors: sensors } );
});

module.exports = router;
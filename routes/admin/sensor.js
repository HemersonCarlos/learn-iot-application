var express = require('express');
var router = express.Router();
var devicesService = require('../../services/devicesService');

router.get('/', function(req, res, next) {

    res.render('admin/sensor/index');

});

module.exports = router;
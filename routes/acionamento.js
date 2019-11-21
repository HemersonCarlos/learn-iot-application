const express = require('express');
const routes = express.Router();
const devicesService = require('../services/devicesService');

route.post('/', function(req, res, next) {

    json = lerArquivo()

    let status = req.body.status;
    let id = req.body.id;

    json.find(v => v.id == id).status = status == 1 ? 0 : 1;

    //redirect
    res.send(200);
});



module.exports = routes
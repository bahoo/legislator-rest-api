'use strict';


var express = require('express');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.json());

var LegislatorDB = require('../legislator_db');
var legislatorDb = new LegislatorDB();

var apiUrlPrefix = '/api/1';

app.get(apiUrlPrefix + '/legislators', function (request, response) {
    var legislators;
    if(Object.keys(request.query).length){
        legislators = legislatorDb.filter(request.query);
    } else {
        legislators = legislatorDb.findAll();
    }
    response.json({legislators: legislators});
});

app.get(apiUrlPrefix + '/legislators/:id', function (request, response) {
    try {
        response.json(legislatorDb.find(request.params.id));
    } catch (exeception) {
        response.sendStatus(404);
    }
});

app.post(apiUrlPrefix + '/legislators', function (request, response) {
    try{
        var isNew = request.body.hasOwnProperty('id');
        legislatorDb.save(request.body);
        var status = isNew ? 200: 201;
        response.status(status).json(request.body);
    } catch (err){
        response.status(500).json({'error': err.message});
    }
});

module.exports = app;
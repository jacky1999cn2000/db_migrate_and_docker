'use strict';

var express = require('express'),
    cors = require('cors'),
    bodyParser = require('body-parser'),
    routes = require('./modules/routes');

// run migrations
if(process.env.NODE_ENV !== 'test') {
	var migrate = require('./modules/migrate');
}

// setup express
var app = express();

// configure middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// routes
app.get('/available', routes.available);
app.get('/version', routes.version);
app.get('/owners', routes.getOwners);
app.get('/pets', routes.getPets);

app.listen(3000);

console.log("api gateway listening...");

// for testing purposes
module.exports = app;

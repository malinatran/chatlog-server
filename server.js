// Requirements
var express = require('express');
var router = express.Router();
var port = process.env.PORT || 3000;
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var moment = require('moment');
var validator = require('./validator');
var eventSummaryHelper = require('./event_summary_helper');

// Listener
app.listen(port);

// Models
var Event = require('./event.js');

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Database
mongoose.connect('mongodb://localhost:27017');

// HTTP Requests & Routing
// 1. Submit event
app.post('/event', function(req, res) {

  try {
    validator.validateEvent(req.body);
  } catch (error) {
    return res.status(400).send({
      error: error.message
    });
  }

  var event = new Event(req.body);

  event.save(function(err) {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send({ 'status': 'ok' });
    }
  });
});

// 2. Event details
app.get('/events', function(req, res) {

  try {
    validator.validateDateRange(req.query.from, req.query.to);
  } catch (error) {
    return res.status(400).send({
      error: error.message
    })
  }

  Event.find({
    'date': {
      '$gte': new Date(req.query.from), 
      '$lte': new Date(req.query.to) 
    }
  }).exec(function(err, events) {
    res.send(events);
  });
});

// 3. Event summary
app.get('/summary', function(req, res) {

  try {
    validator.validateDateRange(req.query.from, req.query.to);
    validator.validateTimeframe(req.query.by);
  } catch (error) {
    return res.status(400).send({
      error: error.message
    })
  }

  var startDate = new Date(req.query.from);
  var endDate = new Date(req.query.to);
  var timeframe = req.query.by;

  Event.find({
    'date': {
      '$gte': startDate, 
      '$lte': endDate
    }
  }).then(function(events) {
    var summary = eventSummaryHelper.summarizeEvents(events, startDate, endDate, timeframe);
    res.send(summary);
  });
});
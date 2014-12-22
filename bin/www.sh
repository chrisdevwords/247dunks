#!/usr/bin/env node
var debug = require('debug')('express');
var app = require('../index.js');

app.set('port', process.env.PORT || 5000);

var server = app.listen(app.get('port'), function() {
  debug('Express server listening on port ' + server.address().port);
});
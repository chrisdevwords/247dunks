"use strict";

var root = window || global;
var $ = require('jquery');
var Backbone = require('backbone');

Backbone.$ = root.jQuery = root.$ = $;

var AppView = require('./AppView');
var app = module.exports = {};

$(function(){
    app.view = new AppView();
}); 

module.exports = app;
"use strict";

var root = window || global;
var $ = require('jquery');
var Backbone = require('backbone');

Backbone.$ = root.jQuery = root.$ = $;

var AppView = require('./AppView');
var app = module.exports = {};

$(function () {

    var SV = root.__SERVER_VARS__ || {};
    var imgurData = JSON.parse(SV.imgur || "{}");

    app.view = new AppView({
        useVideo : $('html').hasClass('no-touch'),
        imgur :imgurData
    });

    window.app = app;
    
}); 

module.exports = app;
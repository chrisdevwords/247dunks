"use strict";

var root = window || global;
var $ = require('jquery');
var Backbone = require('backbone');

Backbone.$ = root.jQuery = root.$ = $;
Backbone.LocalStorage = require("backbone.localstorage");

var AppView = require('./AppView');
var app = module.exports = {};

$(function () {

    var SV = root.__SERVER_VARS__ || {};
    var imgur = JSON.parse(SV.imgur || "{data:{}}");
    var youtube = SV.youtube || {};

    app.view = new AppView({
        useVideo : $('html').hasClass('no-touch'),
        medium : 'youtube',
        imgur :imgur.data,
        youtube : youtube
    });

    window.app = app;
    
}); 

module.exports = app;
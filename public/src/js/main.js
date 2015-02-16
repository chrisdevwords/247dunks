'use strict';

var root = window || global;
var $ = require('jquery');
var Backbone = require('backbone');

Backbone.$ = root.jQuery = root.$ = $;
Backbone.LocalStorage = require('backbone.localstorage');

var AppView = require('./AppView');
var app = module.exports = {};

$(function () {

    var SV = root.__SERVER_VARS__ || {};
    var imgur = JSON.parse(SV.imgur || '{}');
    var youtube = SV.youtube || {};
    var useVideo = $('html').hasClass('no-touch');

    app.view = new AppView({
        useVideo : useVideo,
        medium : useVideo ? 'youtube' : 'imgur',
        imgur : imgur,
        youtube : youtube
    });

    window.app = app;
});

module.exports = app;

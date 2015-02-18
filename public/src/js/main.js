'use strict';

var root = window || global;
var $ = require('jquery');
var Backbone = require('backbone');
var swfobject = require('swfobject');

Backbone.$ = root.jQuery = root.$ = $;
Backbone.LocalStorage = require('backbone.localstorage');

var AppView = require('./AppView');
var app = module.exports = {};

$(function () {

    var SV = root.__SERVER_VARS__ || {};
    var imgur = JSON.parse(SV.imgur || '{}');
    var youtube = SV.youtube || {};
    var useVideo = $('html').hasClass('no-touch');
    var hasFlash = swfobject.hasFlashPlayerVersion('10.1');

    app.view = new AppView({
        useVideo : useVideo,
        hasFlash : hasFlash,
        medium : hasFlash ? 'youtube' : 'imgur',
        imgur : imgur,
        youtube : youtube
    });

    window.app = app;
});

module.exports = app;

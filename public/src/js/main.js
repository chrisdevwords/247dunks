"use strict";

var $ = require('jquery');
var AppView = require('./AppView');

var appView;
$(function(){
    appView = new AppView();
}); 

module.exports = appView;
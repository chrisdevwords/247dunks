"use strict";

var root = window || global;
var $ = require('jquery');
var Backbone = require('backbone');
var templates = require('../templates/templates');

Backbone.$ = root.jQuery = root.$ = $;

module.exports = Backbone.View.extend({
  
  initialize: function(){
    console.log('wuuut')
    this.render();
  },

  render: function () {
    $('body').append(templates.testTemplate({ title: $('img').attr('alt') }));
  }

});

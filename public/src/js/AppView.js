"use strict";

var root = window || global;
var $ = require('jquery');
var Backbone = require('backbone');
Backbone.$ = root.jQuery = root.$ = $;


module.exports = Backbone.View.extend({
  
  initialize: function(){
    console.log('wuuut')
    this.render();
  },

  render: function () {
    $('body').prepend('<p>wooooooooooooooo</p>');
  }

});

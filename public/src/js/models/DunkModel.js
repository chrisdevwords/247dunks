"use strict";

var Backbone = require('backbone');

module.exports = Backbone.Model.extend({

    initialize : function (options) {
        this.on('change', this.checkWidth);
    },
    checkWidth : function (mode) {
        this.set('orientation', this.get('width') > this.get('height') ? 'landscape' : 'portrait');
    }
});
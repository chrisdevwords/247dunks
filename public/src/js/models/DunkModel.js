"use strict";

var Backbone = require('backbone');

var DunkModel = Backbone.Model.extend({

    defaults : {
	    medium : 'imgur'
    },

    initialize : function (options) {
        this.on('change', this.checkWidth);
    },
    checkWidth : function (mode) {
        this.set('orientation', this.get('width') > this.get('height') ? 'landscape' : 'portrait');
    }
});

module.exports = DunkModel;
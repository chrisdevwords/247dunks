"use strict";

var _ = require('underscore');
var Backbone = require('backbone');

module.exports =  Backbone.Collection.extend({

    parse : function (data) {
        if ( !_.isEmpty(data) && _.isArray(data.data)) {
            return data.data;
        }
        return data;
    },

    random : function () {
        return this.at(Math.floor(this.length * Math.random()));
    },

    url : function() {
        return 'api/imgur/dunks';
    }

});





"use strict";

var _ = require('underscore');
var Backbone = require('backbone');

var ViewedDunks = Backbone.Collection.extend({

    localStorage: new Backbone.LocalStorage("247Dunks_viewed"),

    comparator: 'time',

    model : Backbone.Model.extend({
        defaults : function () {
            return {
                time : new Date().getTime()
            }
        }
    }),

    clearMedium : function(medium) {
        _.each(this.where({medium: medium}), function (model) {
            model.destroy();
        });
    },

    clearAll : function () {
        this.each(function(model){
            model.destroy();
        });
    }


    //todo this needs a clear method
    //todo and a cap function
    //todo and a expire by date function
});

module.exports = ViewedDunks;
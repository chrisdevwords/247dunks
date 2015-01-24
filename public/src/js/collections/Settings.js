"use strict";

var Backbone = require('backbone');

var Pages = Backbone.Collection.extend({

    localStorage: new Backbone.LocalStorage("247Dunks_page"),
    model : Backbone.Model.extend({
        defaults : function () {
            return {
                val : 0
            }
        }
    }),

    increment : function (medium) {
        var pageNum = this.get(medium).get('val') + 1;
        this.get(medium).save({val: pageNum});
        return pageNum;
    },

    floor : function (medium) {
        this.get(medium).save({val: 0});
        return 0;
    },

    getPage : function (medium) {
        var medium = this.get(medium);
        return medium ? medium.get('val') : 0;
    }
});

module.exports = {Pages:Pages};

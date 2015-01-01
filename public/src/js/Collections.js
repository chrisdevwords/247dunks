"use strict";

var Backbone = require('backbone');

module.exports = {
    ImgurDunks : Backbone.Collection.extend({
       randomAwesomeDunk : function () {
            return this.at(Math.round(Math.random()*this.length));
       }
    })
};





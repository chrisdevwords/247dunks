"use strict";

var Backbone = require('backbone');

module.exports = {
    ImgurDunks : Backbone.Collection.extend({

        
        
        curate : function () {
            // trim here
            this.filter(function(dunk){
                var title = dunk.get('title');
                if (title.toLowerCase().indexOf('frisbee') != -1 ){
                    return false;
                }
                return true;
            });
        },

        randomAwesomeDunk : function () {
            var index = Math.floor(this.length * Math.random());
            return this.remove(this.at(index));
        }
    })
};





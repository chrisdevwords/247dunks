"use strict";

var Backbone = require('backbone');

module.exports =  Backbone.Collection.extend({

    /**
     * this will check against a whitelist of the following:
     * the last 200 or so gifs/videos the user has seen (local storage)
     * a white list fetched from the user's local storage
     * a white list bootstrapped from the server on page load
     */
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
});





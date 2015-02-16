'use strict';

var _ = require('underscore');
var Backbone = require('backbone');
var DunkModel = require('../models/DunkModel');

var Dunks =  Backbone.Collection.extend({

    random : function () {
        return this.at(Math.floor(this.length * Math.random()));
    }

});

var ImgurDunks =  Dunks.extend({

    model : DunkModel.Imgur,

    parse : function (data) {
        if (!_.isEmpty(data) && _.isArray(data.data)) {
            return data.data;
        }
        return data;
    },

    url : function () {
        return 'api/imgur/dunks';
    }

});

var YoutubeDunks =  Dunks.extend({

    nextPageToken : null,
    model : DunkModel.Youtube,

    parse : function (data) {
        this.nextPageToken = data.nextPageToken;
        if (!_.isEmpty(data) && _.isArray(data.items)) {
            return data.items;
        }
        return [];
    },

    url : function () {
        return 'api/youtube/dunks';
    }

});

module.exports = {
    Imgur   : ImgurDunks,
    Youtube : YoutubeDunks
};

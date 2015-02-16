'use strict';

var _ = require('underscore');
var Backbone = require('backbone');

var Dunks =  Backbone.Collection.extend({

    random : function () {
        return this.at(Math.floor(this.length * Math.random()));
    }

});

var ImgurDunks =  Dunks.extend({

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

    model : Backbone.Model.extend({

        defaults : {
            medium : 'youtube'
        },

        parse : function (data) {
            if (!_.isEmpty(data.id)) {
                data.id =  data.id.videoId;
            }
            return data;
        },
        initialize : function (atts) {
            if (_.isObject(atts.id)) {
                this.set('id', atts.id.videoId);
            }
        }
    }),

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

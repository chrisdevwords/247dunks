'use strict';

var Backbone = require('backbone');

var DunkModel = Backbone.Model.extend({

    defaults : {
        medium : 'imgur',
        orirentation : 'landscape'
    }

});

var ImgurDunk = DunkModel.extend({
    initialize : function () {
        this.on('change', this.checkWidth);
    },
    checkWidth : function () {
        this.set('orientation', this.get('width') > this.get('height') ? 'landscape' : 'portrait');
    }
});

var YoutubeDunk = DunkModel.extend({

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

});

module.exports = {
    Dunk : DunkModel,
    Imgur : ImgurDunk,
    Youtube : YoutubeDunk
};

'use strict';

var Backbone = require('backbone');
var templates = require('../../templates/templates');

var ImgurVideoView = Backbone.View.extend({

    id : 'dunkVideo',
    tagName : 'video',
    template : templates.imgurVideoSrc,
    logOutput : true,
    logErrors : true,

    attributes : {
        autoplay : 'autoplay',
        preload : 'auto'
    },

    events : {
        'ended' : function () {
            if (this.logOutput) {
                console.log('video ended...');
            }
            this.$el.trigger('dunkComplete', this.model.get('currentDunk').toJSON());
        },
        'waiting' : function () {
            if (this.logOutput || this.logErrors) {
                console.log('video waiting...');
            }
        },
        'stalled' : function () {
            if (this.logOutput || this.logErrors) {
                console.log('video stalled...');
            }
        },
        'loadedmetadata' : function () {
            if (this.logOutput) {
                console.log('meta data...');
            }
        },
        'playing' : function () {
            if (this.logOutput) {
                console.log('video playing...');
            }
        },
        'canplaythrough' : function () {
            if (this.logOutput) {
                console.log('video can play through...');
            }
        }
    },

    initialize : function () {
        this.model.get('currentDunk').on('change:id', this.renderSrc, this);
    },

    renderSrc : function () {
        var dunk = this.model.get('currentDunk').toJSON();
        if (dunk.medium !== 'imgur') {
            return;
        }
        this.$el.html(this.template(dunk));
        this.el.load();
        return this.delegateEvents();
    }

});

module.exports = ImgurVideoView;

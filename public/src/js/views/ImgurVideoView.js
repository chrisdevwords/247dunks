"use strict";

var Backbone = require('backbone');
var templates = require('../../templates/templates');

var ImgurVideoView = Backbone.View.extend({

    id : 'dunkVideo',
    tagName : 'video',
    template : templates.imgurVideoSrc,
    logOutput : true,

    attributes : {
        autoplay : 'autoplay',
        preload : 'auto'
    },

    events : {
        'ended' : function () {
            if (this.logOutput) {
                console.log('video ended...');
            }
            this.$el.trigger('dunkComplete', this.model.get('id'));
        },
        'waiting' : function () {
            if (this.logOutput) {
                console.log('video waiting...');
            }
        },
        'stalled' : function () {
            if (this.logOutput) {
                console.log('video stalled...');
            }
        },
        'loadedmetadata' : function () {
            //$(this).parent().css('padding-top', ( .5*($(window).innerHeight()- $(this).height())) + 'px');
            //console.log($(this).parent().attr('style'));
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
        this.model.bind('change', this.renderSrc, this);
    },

    renderSrc : function () {
        this.$el.html(this.template(this.model.toJSON()));
        this.el.load();
        return this.delegateEvents();
    }

});

module.exports = ImgurVideoView;
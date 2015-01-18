"use strict";

var Backbone = require('backbone');
var templates = require('../../templates/templates');

var ImgurVideoView = Backbone.View.extend({

    id : 'dunkVideo',
    tagName : 'video',
    template : templates.imgurVideoSrc,

    attributes : {
        autoplay : 'autoplay',
        preload : 'auto'
    },

    events : {
        'ended' : function () {
            this.$el.trigger('dunkComplete');
        },
        'waiting' : function () {
            console.log('video waiting...');
        },
        'stalled' : function () {
            console.log('video stalled...');
        },
        'loadedmetadata' : function () {
            //$(this).parent().css('padding-top', ( .5*($(window).innerHeight()- $(this).height())) + 'px');
            //console.log($(this).parent().attr('style'));
            console.log('meta data...');
        },
        'playing' : function () {
            console.log('video playing...');
        },
        'canplaythrough' : function () {
            console.log('video can play through...');
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
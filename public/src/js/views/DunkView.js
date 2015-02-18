'use strict';

var _ = require('underscore');
var Backbone = require('backbone');
var DunkModel = require('./../models/DunkModel');
var ImgurVideoView = require('./ImgurVideoView');
var ImgurGifView = require('./ImgurGifView');
var YoutubeView = require('./YoutubeView');

var DunkView = Backbone.View.extend({

    el : '#content',

    mediaViews : {
        imgur : null,
        youtube : null
    },

    initialize : function (options) {

        //this.model = new DunkModel.Dunk({medium : options.medium});
        options = _.extend(options, {model : this.model});

        if (options.useVideo) {
            if (options.hasFlash) {
                this.mediaViews.youtube = new YoutubeView(options);
            }
            this.mediaViews.imgur = new ImgurVideoView(options);
        } else {
            this.mediaViews.imgur = new ImgurGifView(options);
        }
        this.model.on('change:orientation', this.onOrientationChange, this);
        this.model.on('change:medium', function (model, medium) {
            this.setMedium(medium);
        }, this);
    },

    onOrientationChange : function (model, orientation) {
        switch (orientation) {
            case 'portrait':
                this.$el.addClass('portrait');
                break;
            default :
                this.$el.removeClass('portrait');
                break;
        }
    },

    setMedium : function (medium) {
        var mediumView = this.mediaViews[medium];
        if (mediumView && this.currentView != mediumView) {
            if (this.currentView) {
                this.currentView.remove();
            }
            this.currentView = mediumView;
            this.$el.find('.content-wrap').append(this.currentView.render().$el);
        }
        return this.delegateEvents();
    },

    render : function () {
        DunkView.__super__.render.call(this);
        return this.setMedium(this.model.get('medium'));
    }
});

module.exports = DunkView;

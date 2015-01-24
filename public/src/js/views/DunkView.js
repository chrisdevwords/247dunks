"use strict";

var _ = require('underscore');
var Backbone = require('backbone');
var DunkModel = require('./../models/DunkModel');
var ImgurVideoView = require('./ImgurVideoView');
var ImgurGifView = require('./ImgurGifView');

var DunkView = Backbone.View.extend({

    el : '#content',

    mediaViews : {
      imgur : null,
      youtube : null
    },

    initialize : function (options) {

        var ImgurView = options.useVideo ? ImgurVideoView : ImgurGifView;

        this.model = new DunkModel();
        this.mediaViews.imgur = new ImgurView(_.extend(options, {model: this.model}));

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
        return this;
    },

    render : function () {
        DunkView.__super__.render.call(this);
        return this.setMedium('imgur');
    }
});

module.exports = DunkView;
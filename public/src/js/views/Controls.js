'use strict';

var Backbone = require('backbone');
var templates = require('../../templates/templates');
var FullScreen = require('../lib/FullScreen');

var Controls = Backbone.View.extend({

    el : '#bottomNav',

    events : {
        'click .full-screen-toggle' : 'toggleFullScreen'
    },

    initialize : function (options) {
        if (options.useVideo) {
            this.template = templates.videoControls;
        } else {
            this.template = templates.gifControls;
        }
    },

    render : function () {
        Controls.__super__.render.call(this);
        this.$el.html(this.template({}));
        return this;
    },

    toggleFullScreen : function () {
        FullScreen.getInstance().toggle();
    }
});

module.exports = Controls;

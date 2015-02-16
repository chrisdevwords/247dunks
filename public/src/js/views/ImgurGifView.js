'use strict';

var Backbone = require('backbone');
var templates = require('../../templates/templates');

var ImgurGifView = Backbone.View.extend({

    id : 'dunGif',
    className : 'gif-wrap imgur',
    tagName : 'div',
    template : templates.imgurGif,

    initialize : function (options) {
        this.model = options.model;
        this.model.bind('change', this.render, this);
    },

    render : function () {
        ImgurGifView.__super__.render.call(this);
        return this.renderContent();
    },

    renderContent : function () {
        this.$el.html(this.template(this.model.toJSON()));
        return this.delegateEvents();
    }

});

module.exports = ImgurGifView;

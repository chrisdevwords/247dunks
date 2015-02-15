"use strict";

var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');
var templates = require('../../templates/templates');
var swfobject = require('swfobject');
var root = window || root || {};

var YoutubeView = Backbone.View.extend({

    id: 'youtubeWrap',
    tagName: 'div',
    template: templates.youtubePlayer,
    player: null,

    ytEvents : {
        'onStateChange' : 'onYTStateChange',
        'onError'       : 'onYTError',
        'onApiChange'   : 'onYTApiChange'
    },


    initialize : function () {},

    loadVideo : function () {
        var model = this.model.toJSON();
        if (model.medium !== 'youtube') {
            return;
        }
        this.loadSWFObject()
            .done(function(player){
                player.loadVideoById(model.id);
            }).fail(function(err){
                console.error(err);
            });
        return this.delegateEvents();
    },

    loadSWFObject : function () {
        var self = this;
        var def = $.Deferred();
        var id = 'ytPlayer';
        var url;

        if (this.player) {
            def.resolve(this.player);
            return def.promise();
        }
        if (!swfobject.hasFlashPlayerVersion("10.1")) {
            def.reject({message:'flash player 10.1 not available'});
            return def.promise();
        }
        url = "http://www.youtube.com/apiplayer?enablejsapi=1&version=3&playerapiid=" + id;
        swfobject.embedSWF(url, id, "100%", "100%", "10.1", null, null, { id: id }, { allowScriptAccess: "always" });
        root.onYouTubePlayerReady = function (playerId) {
            self.bindPlayer(playerId);
            def.resolve(self.player);
        };

        return def.promise();
    },

    bindPlayer : function (playerId) {

        var self = this;
        var player = document.getElementById(playerId);

        root.onYTStateChange = function (state){
            console.log('state change', state);
            switch (state) {
                case 0 :
                    self.$el.trigger('dunkComplete', self.model.toJSON());
                    break;
            }
        };
        root.onYTError = function (code) {
            console.error('youtube error', code);
        };
        root.onYTApiChange = function () {
            console.log('youtube api change', player.getOptions());
        };

        _.each(this.ytEvents, function (listener, event) {
            player.addEventListener(event, listener);
        });

        this.player = player;
    },


    remove : function () {
        if (this.player) {
            _.each(this.ytEvents, function (listener, event) {
                this.player.removeEventListener(event, listener);
                root[listener] = null;
            }, this);
            this.player = null;
        }
        root.onYouTubePlayerReady = null;
        YoutubeView.__super__.remove.call(this);
    },

    render : function () {
	    YoutubeView.__super__.render.call(this);
        this.model.bind('change:id', this.loadVideo, this);
        this.$el.html(this.template());
	    return this;
    }

});

module.exports = YoutubeView;
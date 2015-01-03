"use strict";

var $ = require('jquery');
var Backbone = require('backbone');
var templates = require('../templates/templates');
var Collections = require('./Collections');

module.exports = Backbone.View.extend({

    el: '#main',
    useVideo : false,

    events : {
        'click #newDunk'   : 'newDunk',
        'click #dunkGif'   : 'newDunk',
        'click #dunkVideo' : 'newDunk'
    },

    initialize: function (options) {
        var self = this;
        this.options = options;
        this.useVideo = options.useVideo || false;
        this.model = new Backbone.Model({
            header : '247 Dunks!'
        });
        this.model.on('change:dunk', function (){
            self.renderDunk();
        })
        this.render();
        this.newDunk();
    },

    render: function () {
        var templateVars = _.extend({}, this.model.toJSON());
        var self = this;
        this.$el.html(templates.mainTemplate(templateVars)); //todo this will go into swig 
        return this.delegateEvents();
    },

    renderDunk : function () {
        var templateVars = _.extend({}, this.model.toJSON());
        var template = this.useVideo ? templates.videoTemplate : templates.gifTemplate;
        (this.$el.find('.guts')).html(template(templateVars));
        if(this.useVideo) {
            this.listenToVideo();
        } else {
            // put some sort of timeout for resetting the gif here?
        }
        return this.delegateEvents();
    },

    listenToVideo : function () {
        var self = this;
        var $video = this.$el.find('#dunkVideo');
        $video.on('ended', function () {
            self.newDunk();
        });
        $video.on('waiting', function () {
            console.log('video waiting...');
        });
        $video.on('stalled', function () {
            console.log('video stalled...');
        });
        $video.on('stalled', function () {
            console.log('video error...');
        });
    },
    
    newDunk : function () {
        if (!this.imgur || !this.imgur.length) {
            this.imgur = new Collections.ImgurDunks(this.options.imgur.data);
            this.imgur.curate();
        }
        this.model.set({dunk:this.imgur.randomAwesomeDunk().toJSON()});
    }

});

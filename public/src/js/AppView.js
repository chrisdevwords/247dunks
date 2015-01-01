"use strict";

var $ = require('jquery');
var Backbone = require('backbone');
var templates = require('../templates/templates');
var Collections = require('./Collections');

module.exports = Backbone.View.extend({

    el: '#main',
    
    events : {
        'click #newDunk' : 'newDunk',
        'click #dunkGif' : 'newDunk'
    },

    initialize: function (options){
        console.log('wuuut');
        var self = this;
        this.gifs = new Collections.ImgurDunks(options.imgur.data);
        this.model = new Backbone.Model({
            header : '247 Dunks!'
        });
        this.model.on('change:dunk', function (){
            self.render();
        })
        this.newDunk();
    },

    render: function () {
        var templateVars = _.extend({}, this.model.toJSON());
        //todo this will go into swig once we have it all nailed down...
        this.$el.html(templates.mainTemplate(templateVars));
        $(this.$el.find('.guts')).html(templates.contentTemplate(templateVars));
    },

    newDunk : function () {
        this.model.set({dunk:this.gifs.randomAwesomeDunk().toJSON()});
    }

});

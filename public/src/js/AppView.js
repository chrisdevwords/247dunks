"use strict";

var $ = require('jquery');
var Backbone = require('backbone');
var templates = require('../templates/templates');
var DunkCollection = require('./collections/Dunks');
var DunkView = require('./views/DunkView');

module.exports = Backbone.View.extend({

    el: '#main',
    useVideo : false,

    events : {
        'click .new-dunk-btn' : 'newDunk',
        'click .dunk-gif'     : 'newDunk',
        'click #dunkVideo'    : 'newDunk',
        'dunkComplete'        : 'newDunk'
    },

    initialize: function (options) {

        this.options = options;

        this.render();

        this.dunkView = new DunkView(options);
        this.dunkView.render();
        this.newDunk();
    },

    render: function () {
        this.$el.html(templates.mainTemplate({header : '247 Dunks!'})); //todo this will go into swig
        return this.delegateEvents();
    },

    newDunk : function () {

        if (!this.imgur || !this.imgur.length) {
            this.imgur = new DunkCollection(this.options.imgur.data);
            this.imgur.curate();
        }
        this.dunkView.model.set(this.imgur.randomAwesomeDunk().toJSON());

    }

});

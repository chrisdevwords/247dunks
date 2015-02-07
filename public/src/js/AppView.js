"use strict";

var Backbone = require('backbone');
var templates = require('../templates/templates');
var DunkView = require('./views/DunkView');
var Controls = require('./views/Controls');
var AppModel = require('./models/AppModel');
var FullScreen = require('./lib/FullScreen');

module.exports = Backbone.View.extend({

    el: '#main',

    events : {
        'click .new-dunk-btn' : 'onNewDunkClick',
        'click .dunk-gif'     : 'onNewDunkClick',
        'click #dunkVideo'    : 'onNewDunkClick',
        'dunkComplete'        : 'onDunkComplete'
    },

    initialize: function (options) {

        var self = this;

        this.render();

        this.model = new AppModel({}, {
            defaultData : {
                imgur : options.imgur.data
            }
        });

        this.dunkView = new DunkView(options);
        this.dunkView.render();

        this.controls = new Controls(options);
        this.controls.render();

        this.model.fetch().done(function(){
            self.newDunk();
        }).fail(function(err) {
            console.log(err);
        });

        FullScreen.getInstance().on(FullScreen.FULL_SCREEN_CHANGE, function(){
            self.$el.toggleClass('full-screen');
        });

    },

    render: function () {
        this.$el.html(templates.mainTemplate({header : '247 Dunks!'})); //todo this will go into swig
        return this.delegateEvents();
    },

    onDunkComplete: function (event, id) {
        this.model.dunkViewed(id, 'imgur');
        this.newDunk();
    },

    onNewDunkClick : function (event) {
        var dunk = this.dunkView.model;
        this.model.dunkViewed(dunk.get('id'), 'imgur');
        this.newDunk();
    },

    newDunk : function () {

        var self = this;

        this.model.nextDunk()
            .done(function(dunk){
                self.dunkView.model.set(dunk.toJSON());
            })
            .fail(function(err){
                console.log(err);
            });

    }

});

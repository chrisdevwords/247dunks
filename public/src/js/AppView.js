"use strict";

var Backbone = require('backbone');
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

	    this.model = new AppModel({medium:options.medium}, {
            defaultData : {
                imgur : options.imgur,
                youtube : options.youtube
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

    onDunkComplete: function (event, dunk) {
	    this.model.dunkViewed(dunk.id, dunk.medium);
        this.newDunk();
    },

    onNewDunkClick : function (event) {
        var dunk = this.dunkView.model;
	    this.model.dunkViewed(dunk.get('id'), dunk.get('medium'));
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

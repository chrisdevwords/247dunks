"use strict";

var Backbone = require('backbone');
var templates = require('../templates/templates');
var DunkView = require('./views/DunkView');
var AppModel = require('./models/AppModel');

module.exports = Backbone.View.extend({

    el: '#main',
    useVideo : false,

    events : {
        'click .new-dunk-btn' : 'newDunk', //todo need to add click handler for next dunk
        'click .dunk-gif'     : 'newDunk',
        'click #dunkVideo'    : 'newDunk',
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

        this.model.fetch().done(function(){
            self.newDunk();
        }).fail(function(err) {
            console.log(err);
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

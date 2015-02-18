'use strict';

var Backbone = require('backbone');
var DunkView = require('./views/DunkView');
var Controls = require('./views/Controls');
var AppModel = require('./models/AppModel');
var FullScreen = require('./lib/FullScreen');

module.exports = Backbone.View.extend({

    el : '#main',

    events : {
        'click .new-dunk-btn' : 'onNewDunkClick',
        'click .dunk-gif'     : 'onNewDunkClick',
        'click #dunkVideo'    : 'onNewDunkClick',
        'dunkComplete'        : 'onDunkComplete',
        'playerError'         : 'onPlayerError'
    },

    initialize : function (options) {

        var _this = this;

        this.model = new AppModel({
            medium : options.medium,
            defaultData : {
                imgur : options.imgur,
                youtube : options.youtube
            },
            availableMedia : options.useVideo && options.hasFlash ? ['imgur', 'youtube'] : ['imgur']
        });

        this.dunkView = new DunkView(_.extend({model : this.model}, options));
        this.dunkView.render();

        this.controls = new Controls(options);
        this.controls.render();

        this.model.fetch().done(function () {
            _this.newDunk();
        }).fail(function (err) {
            console.log(err);
        });

        FullScreen.getInstance().on(FullScreen.FULL_SCREEN_CHANGE, function () {
            _this.$el.toggleClass('full-screen');
        });

        this.model.on('change:medium', this.newDunk, this);
    },

    onDunkComplete : function (event, dunk) {
        this.model.dunkViewed(dunk.id, dunk.medium);
        this.newDunk();
    },

    onNewDunkClick : function (event) {
        var dunk = this.model.get('currentDunk');
        this.model.dunkViewed(dunk.get('id'), dunk.get('medium'));
        this.newDunk();
    },

    onPlayerError : function (event, error) {

        if (error.isFatal) {
            console.log('switch media if possible else just show static');
            //show static
        } else {
            this.model.dunkViewed(error.id, error.medium);
            this.newDunk();
        }

    },

    newDunk : function () {

        var _this = this;

        this.model.nextDunk()
            .done(function (dunk) {
                // current dunk should reside in the model, not dunkView.model --- dunkView.model should have the same model as this view
                // maybe the player views retain their models...
                _this.model.get('currentDunk').set(dunk.toJSON());//dunkView.model.set(dunk.toJSON());
            })
            .fail(function (err) {
                console.log(err);
            });

    }

});

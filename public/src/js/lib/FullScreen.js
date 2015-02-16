'use strict';

var _ = require('underscore');
var Backbone = require('backbone');

var _EVENT_TYPES = ['webkitfullscreenchange', 'mozfullscreenchange', 'fullscreenchange'];
var _instance;

function FullScreen () {

    var _this = this;

    var _onFullScreenChange = function () {
        _this.trigger(FullScreen.FULL_SCREEN_CHANGE);
        if (_this.isFullScreen()) {
            _this.trigger(FullScreen.ENTER_FULL_SCREEN);
        } else {
            _this.trigger(FullScreen.EXIT_FULL_SCREEN);
        }
    };

    _.each(_EVENT_TYPES, function (eventType) {
        document.addEventListener(eventType, _onFullScreenChange);
    });

}

_.extend(FullScreen, {

    FULL_SCREEN_CHANGE : 'fullScreenChange',
    EXIT_FULL_SCREEN   : 'exitFullScreen',
    ENTER_FULL_SCREEN  : 'enterFullScreen',

    getInstance : function () {
        if (!_instance) {
            _instance = new FullScreen();
        }
        return _instance;
    }

});

_.extend(FullScreen.prototype, {

    toggle : function () {
        if (this.isFullScreen()) {
            this.cancelFullScreen();
        } else {
            this.requestFullScreen();
        }
    },

    requestFullScreen : function () {

        var dEl = document.documentElement;

        if (_.isFunction(dEl.requestFullScreen)) {
            dEl.requestFullScreen();
        } else if (_.isFunction(dEl.mozRequestFullScreen)) {
            dEl.mozRequestFullScreen();
        } else if (_.isFunction(dEl.webkitRequestFullScreen)) {
            dEl.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
        }

    },

    cancelFullScreen : function () {

        if (_.isFunction(document.cancelFullScreen)) {
            document.cancelFullScreen();
        } else if (_.isFunction(document.mozCancelFullScreen)) {
            document.mozCancelFullScreen();
        } else if (_.isFunction(document.webkitCancelFullScreen)) {
            document.webkitCancelFullScreen();
        }

    },

    isFullScreen : function () {
        return !_.isEmpty(document.fullScreenElement) ||
            document.mozFullScreen || document.webkitIsFullScreen;
    }

}, Backbone.Events);

module.exports = FullScreen;

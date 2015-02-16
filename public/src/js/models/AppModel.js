'use strict';

var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');
var ViewedDunks = require('../collections/ViewedDunks');
var Dunks = require('../collections/Dunks');
var Settings = require('../collections/Settings');

var AppModel = Backbone.Model.extend({

    defaults : function () {
        return {
            medium : 'imgur',
            pages : new Settings.Pages,
            imgur : new Dunks.Imgur,
            youtube : new Dunks.Youtube,
            viewed : new ViewedDunks
        }
    },

    initialize : function (atts, options) {

        this.options = options;

        _.each(options.defaultData, function (data, medium) {
            var col = this.get(medium);
            if (col) {
                col.add(col.parse(data));
            } else {
                console.error('collection not defined for', medium);
            }
        }, this);

    },

    fetch : function () {

        var _this = this;
        var pages = this.get('pages');
        var medium = this.get('medium');

        return this.get('viewed').fetch()
            .then(function fetchPagesFromStorage () {
                return pages.fetch();
            })
            .then(function fetchCurrentMediumPage () {
                if (!pages.get(medium)) {
                    pages.create({
                        id : medium,
                        val : 0
                    });
                } else if (pages.getPage(medium)) {
                    return _this.fetchPage(medium, pages.getPage(medium));
                }
                return _this.curate(medium);
            });
    },

    curate : function (medium) {

        var def = $.Deferred();
        var dunks = this.get(medium);
        var pages = this.get('pages');
        var viewed = this.get('viewed').where({medium : medium});

        dunks.remove(_.pluck(viewed, 'id'));

        if (dunks.length) {
            def.resolve();
        } else {
            // increment medium page no.
            return this.fetchPage(
                medium,
                pages.increment(medium, dunks.nextPageToken)
            );
        }

        return def.promise();
    },

    fetchPage : function (medium, pageNum) {

        var _this = this;
        var dunks = this.get(medium);
        var pages = this.get('pages');
        var viewed = this.get('viewed');

        return dunks.fetch({data : {page : pageNum}}).then(function () {
            if (!dunks.length && pageNum === 0) {
                return $.Deferred().reject({
                    message : medium + ' service returning empty'
                }).promise();
            }
            if (!dunks.length) {
                // if dunks api result is empty for this page
                // clear the localStorage for the medium,
                viewed.clearMedium(medium);
                // reset the page number to 0,
                pages.floor(medium);
                // set dunks to default from options
                dunks.set(_this.options.defaultData[medium])
            }
            return _this.curate(medium);
        });

    },

    dunkViewed : function (id, medium) {
        var removed = this.get(medium).remove(id);
        this.get('viewed').create({id : id, medium : medium});
        return removed;
    },

    nextDunk : function () {

        var medium = this.get('medium');
        var def = $.Deferred();
        var dunks = this.get(medium);

        if (dunks.length) {
            def.resolve(dunks.random());
        } else {
            this.curate(medium).done(function () {
                def.resolve(dunks.random());
            });
        }
        return def.promise();
    }
});

module.exports = AppModel;

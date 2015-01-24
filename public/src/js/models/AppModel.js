"use strict";

var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');
var ViewedDunks = require('../collections/ViewedDunks');
var ImgurDunks = require('../collections/Dunks');
var Settings = require('../collections/Settings');


var AppModel = Backbone.Model.extend({

    defaults : function () {
        return {
            pages : new Settings.Pages,
            imgur : new ImgurDunks,
            viewed : new ViewedDunks
        }
    },

    initialize : function (atts, options) {

        this.options = options;
        this.get('imgur').add(options.defaultData.imgur);

    },

    fetch : function () {

        var self = this;
        var pages = this.get('pages');

        return this.get('viewed').fetch()
            .then(function(){
                return pages.fetch();
            })
            .then(function() {
                if (!pages.get('imgur')) {
                    pages.create({id: 'imgur', val: 0});
                } else if (pages.getPage('imgur')) {
                    return self.fetchPage('imgur', pages.getPage('imgur'));
                }
                return self.curate('imgur');
            });//append other then -> this.curate(medium)
    },

    curate : function (medium) {

        var def = $.Deferred();
        var dunks = this.get(medium);
        var pages = this.get('pages');
        var viewed = this.get('viewed');

        dunks.remove(viewed.pluck('id'));

        if (dunks.length) {
            def.resolve();
        } else {
            // increment medium page no.
            return this.fetchPage(medium, pages.increment('imgur'));
        }

        return def.promise();
    },

    fetchPage : function(medium, pageNum) {

        var self = this;
        var dunks = this.get(medium);
        var pages = this.get('pages');
        var viewed = this.get('viewed');

        return dunks.fetch({data : {page : pageNum}}).then(function() {
            if (!dunks.length && pageNum === 0) {
                return $.Deferred().reject({
                    message: medium + ' service returning empty'
                }).promise();
            }
            if (!dunks.length) {
                // if dunks api result is empty for this page
                // clear the localStorage for the medium,
                viewed.clearMedium(medium);
                // reset the page number to 0,
                pages.floor(medium);
                // set dunks to default from options
                dunks.set(self.options.defaultData[medium])
            }
            return self.curate(medium);
        });

    },

    dunkViewed : function (id, medium) {
        var removed = this.get(medium).remove(id);
        this.get('viewed').create({id: id, medium : medium});
        return removed;
    },

    nextDunk : function () {

        var index;
        var medium = 'imgur';
        var def = $.Deferred();
        var dunks = this.get(medium);

        if(dunks.length) {
            def.resolve(dunks.random());
        } else {
            this.curate(medium).done(function(){
                def.resolve(dunks.random());
            });
        }
        return def.promise();
    }
});


module.exports = AppModel;
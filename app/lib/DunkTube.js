'use strict';

var _ = require('underscore');
var $ = require('jquery-deferred');
var YouTube = require('youtube-node');

function DunkTube (apiKey) {
    YouTube.apply(this, _.toArray(arguments));
    this.setKey(apiKey);
    this.addParam('type', 'video');
    this.addParam('videoDuration', 'short');
}

_.extend(DunkTube, {
    QUERY : 'slam+dunk+basketball',
    COUNT : 50
});

_.extend(DunkTube.prototype, YouTube.prototype, {

    constructor : DunkTube,

    dunkSearch : function (query, count) {
        var def = $.Deferred();
        var cb = function (result) {
            if (result.error) {
                def.reject(result);
            } else {
                def.resolve(result);

            }
        };
        this.search(query, count, cb);
        return def.promise();
    }
});

module.exports = DunkTube;

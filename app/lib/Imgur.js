'use strict';

var Proxy = require('./Proxy');
var $ = require('jquery-deferred');

function Imgur (apiKey) {
    this.apiKey = apiKey;
}

Imgur.prototype.search = function (query, sort, page) {

    var def = $.Deferred();
    var proxy = new Proxy();
    var options = {
        host : 'api.imgur.com',
        path : '/3/gallery/search/' + sort + '/' + page + '/?q=' + query,
        headers : {
            'Authorization'	: 'Client-ID ' + this.apiKey
        }
    };

    proxy.getJSON(options,
        function (status, response) {
            var resp = {
                status : status,
                data : response
            };
            if (status === 200) {
                def.resolve(resp);
            } else {
                def.reject(resp);
            }
        }
    );

    return def.promise();
};

module.exports = Imgur;

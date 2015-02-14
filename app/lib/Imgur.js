"use strict";

var _ = require('underscore');
var Proxy = require('./Proxy');
var $ = require('jquery-deferred');

var API_KEY;

function Imgur (api_key) {
	API_KEY = api_key;
}

_.extend(Imgur.prototype, {
	
	search : function (query, sort, page) {

		var def = $.Deferred();
		var proxy = new Proxy();
		var options = {
  			host: 'api.imgur.com',
  			path: '/3/gallery/search/' + sort + '/' + page + '/?q='+query,
    		headers: {
        		'Authorization'	: 'Client-ID ' + API_KEY
    		}
		};

		proxy.getJSON(options, function (status, response) {
			if (status === 200) {
				def.resolve({status:status, data:response});
			} else {
				def.reject({status:status, data:response});
			}
		});

		return def.promise();
	}
});

module.exports = Imgur;
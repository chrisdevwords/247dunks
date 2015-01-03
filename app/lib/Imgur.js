"use strict";

var _ = require('underscore');
var Proxy = require('./Proxy');

var API_KEY;

function Imgur (api_key) {
	API_KEY = api_key;
}

_.extend(Imgur.prototype, {
	
	search : function (query, sort, page, onResult) {
		var proxy = new Proxy();
		var options = {
  			host: 'api.imgur.com',
  			path: '/3/gallery/search/' + sort + '/' + page + '/?q='+query,
    		headers: {
        		'Authorization'	: 'Client-ID ' + API_KEY,
    		}
		};
		return proxy.getJSON(options, onResult);
	}
});

module.exports = Imgur;
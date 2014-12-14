"use strict";

var _ = require('underscore');
var http = require("http");
var https = require("https");

var API_KEY;

function Imgur (api_key) {
	API_KEY = api_key;
}

_.extend(Imgur.prototype, {
	
	search : function (tag, ext, onResult) {
		
		var url = 'api.imgur.com'
		var path = '/3/gallery/search/?q=' + tag + '+ext%3A' + ext;
		
		var options = {
  			host: url,
  			port: 443,
  			path: path,
  			method: 'GET',
    		headers: {
        		'Authorization'	: 'Client-ID ' + API_KEY,
        		'Content-type' 	: 'application/json'
    		}
		};
		return this.getJSON(options, onResult);
	},


	getJSON : function (options, onResult) {

		var prot;
		var req;
		var output = '';

		prot = options.port == 443 ? https : http;

    	req = prot.request(options, function(res) {
  			//console.log('STATUS: ' + res.statusCode);
  			//console.log('HEADERS: ' + JSON.stringify(res.headers));
  			res.setEncoding('utf8');
  			res.on('data', function (chunk) {
    			output += chunk;
  			});
  			res.on('end', function(){
  				onResult(res.statusCode, output);
  			});
		}).end();
	}

});

module.exports = Imgur;
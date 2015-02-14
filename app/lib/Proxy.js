"use strict";

var _ = require('underscore');
var http = require("http");
var https = require("https");

function Proxy () {

}

_.extend(Proxy.prototype, {

	getJSON : function (options, onResult) {

		var prot;
		var output = '';
		
		options = options || {};
		options = _.extend({port: 443, method : 'GET'}, options);
		
		prot = options.port == 443 ? https : http;

    	return prot.request(options, function(res) {
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

module.exports = Proxy;
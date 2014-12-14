var express = require('express');
var app = express();
var Imgur = require('./app/service/Imgur');

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));

app.get('/', function (request, response) {
  var result = 'Hello';
  var times = process.env.TIMES || 5;
  for (var i=0; i<times; i++) {
  	result += ' DUNKS'
  }
  result += '!';
  response.send(result);
});

app.get('/imgur', function (request, response) {
	
	var imgur = new Imgur(process.env.IMGUR_KEY || request.query.imgur_key || '');
	var result = imgur.search('slam+dunk','gif', function (status, obj) {
		console.log('response status:', status);
		response.json(obj);
	});

	/*
	var result = 'Set up a service to search imgur.';
	result += '<br/>';
	result += 'TODO implement <a href="http://stackoverflow.com/questions/9577611/http-get-request-in-node-js-express"' +
				' target="_blank">This example</a>';
	*/
});

app.listen(app.get('port'), function () {
  console.log("Node app is running at localhost:" + app.get('port'));
});

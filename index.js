var express = require('express');
var app = express();
var Imgur = require('./app/service/Imgur');

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));

app.get('/', function (request, response) {
	var result = 'Hello';
	var times = process.env.TIMES || 5;
	for (var i=0; i<times; i++) {
		result += ' <a href="/imgur?q=dunk+ext%3Agif">';
		result += 'DUNKS'
		result += '</a>';
	}
	result += '!';
	response.send(result);
});

/**
 * to be consumed by the front-end code
**/
app.get('/imgur', function (request, response) {
	var q = escape(request.param('q').split(' ').join('+'));
	var imgur = new Imgur(process.env.IMGUR_KEY || request.param('imgur_key') || '');
	imgur.search(q, function (status, obj) {
		console.log('response status:', status);
		response.send(obj);
	});
});

app.listen(app.get('port'), function () {
  console.log("Node app is running at localhost:" + app.get('port'));
});

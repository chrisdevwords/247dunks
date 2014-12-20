var express = require('express');
var app = express();
var Imgur = require('./app/service/Imgur');
var YouTube = require('youtube-node');

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));

app.get('/', function (request, response) {
	var result = '<h1>Hello DUNKS!<h1>';
		result += '<a href="/imgur?q=dunk+ext%3Agif">GIFS of DUNKS</a><br/>';
		result += '<a href="/youtube?q=dunk+count=9">TUBES of DUNKS</a><br/>';
		result += 'IT\'s 24/7 DUNKS!!!';
	response.send(result);
});

/**
 * to be consumed by the front-end code
**/
app.get('/imgur', function (request, response) {
	var q = escape((request.param('q')|| '').split(' ').join('+'));
	var imgur = new Imgur(process.env.IMGUR_KEY || request.param('imgur_key') || '');
	imgur.search(q, function (status, data) {
		console.log('response status:', status);
		response.send(data);
	});
});

app.get('/youtube', function (request, response){
	var q = request.param('q') || '';
	var count = Number(request.param('count'));
	var youTube = new YouTube();
	count = !isNaN(count) && (count > 0) ? count : 5;
	youTube.setKey(process.env.YOUTUBE_KEY || request.param('youtube_key') || '');
	youTube.search(q, count, function(resultData) {
  		response.send(resultData);
	});
})

app.listen(app.get('port'), function () {
  console.log("Node app is running at localhost:" + app.get('port'));
});

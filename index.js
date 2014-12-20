var express = require('express');
var app = express();
var swig = require('swig');
var Imgur = require('./app/service/Imgur');
var YouTube = require('youtube-node');

app.engine('swig', swig.renderFile);
app.set('view engine', 'swig');
app.set('views', __dirname + '/app/view/templates');

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));
app.get('/', function (request, response) {
    var gifs;
    var imgur = new Imgur(process.env.IMGUR_KEY || request.param('imgur_key') || '');
    imgur.search('dunk+ext%3Agif', function (status, resp) {
        console.log('response status:', status);
        gifs = JSON.parse(resp).data;
        response.render('index', {
            title : 'DUNKS!',
            gif : gifs[Math.floor(gifs.length*Math.random())]
        });
    });
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
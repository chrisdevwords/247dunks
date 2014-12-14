var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));

app.get('/', function(request, response) {
  var result = 'Hello';
  var times = process.env.TIMES || 5;
  for (var i=0; i<times; i++) {
  	result += ' DUNKS'
  }
  result += '!';
  response.send(result);
});

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'));
});

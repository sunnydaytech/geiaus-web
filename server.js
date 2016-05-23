var express = require('express');
var app = express();

app.use('/static', express.static(__dirname + '/public'));
app.get('/', function(req, res){
  res.send('hello world');
});

app.listen(8080);

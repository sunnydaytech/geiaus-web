var express = require('express');
var app = express();

// Configure template
var exphbs = require('express-handlebars');
app.engine('.hbs', exphbs({defaultLayout: 'default', extname: '.hbs'}));
app.set('view engine', '.hbs');

app.use('/static', express.static(__dirname + '/public'));
app.get('/', function(req, res){
  res.render('index');
});

app.get('/signin', function(req, res){
  res.render('signin');
});

app.get('/signup', function(req, res){
  res.render('signup');
});



app.listen(8080);

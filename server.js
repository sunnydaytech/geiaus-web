'use strict';

var express = require('express');
var app = express();
var grpc = require('grpc');
const PROTO_PATH = __dirname + '/submodules/geiaus-server/proto/user.proto';
var user = grpc.load(PROTO_PATH).proto;
var userClient = new user.UserManage('localhost:50051', grpc.credentials.createInsecure());

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
  let createUserRequest = {
    user_to_create: {
      user_id: 1,
      user_name: 'test',
      email: 'test@gmail.com',
      phone_number: '6506918096' }
  }
  userClient.createUser(createUserRequest, function(err, data) {
    if (err) {
      console.log(err);
      return;
    }
    console.log(data);
  })
  res.render('signup');
});



app.listen(8080);

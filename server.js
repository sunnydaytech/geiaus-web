'use strict';

var express = require('express');
var app = express();
var Long = require("long");
var program = require('commander');

program
  .version('0.0.1')
  .option('--backend [backendAddress]', 'Specify geiaus-server address')
  .parse(process.argv)

var bodyParser = require('body-parser')
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
})); 

var grpc = require('grpc');
const PROTO_PATH = __dirname + '/submodules/geiaus-server/proto/user.proto';
var user = grpc.load(PROTO_PATH).proto;
// geiaus-server: 10.51.251.165
let geiausServer = 'localhost:50051';
if (program.backend) {
  geiausServer = program.backend;
}
var userClient = new user.UserManage(geiausServer, grpc.credentials.createInsecure());

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

app.post('/signin', function(req, res){
  let username = req.body.username;
  console.log('Looking up user with username: ' + username);
  let lookupUserRequest = {
    user_name: username
  }
  userClient.lookupUser(lookupUserRequest, function(err, lookupUserResp) {
    if (!lookupUserResp.user) {
      // account not found.
      res.render('signin');
      return;
    } else {
      console.log(lookupUserResp);
      res.redirect('/c/password?userId=' + lookupUserResp.user.user_id);
    }
  });
});

app.get('/c/password', function(req, res) {
  res.render('password', {userId: req.query.userId});
});

app.post('/c/password', function(req, res) {
  let checkPasswordReq = {
    user_id: Long.fromString(req.body.userId),
    password: req.body.password 
  };
  console.log(checkPasswordReq);
  userClient.checkPassword(checkPasswordReq, function(err, checkPasswordResp) {
    if (err) {
      console.log(err);
      return;
    }
    if (checkPasswordResp.match) {
      res.redirect('/signin/success');
    } else {
      res.render('password');
    }
  });
});


app.get('/signup', function(req, res){
  res.render('signup');
});

app.post('/signup', function(req, res) {
  let username = req.body.username;
  let password = req.body.password;
  console.log(username + "::" + password);
  let createUserRequest = {
    user_name: username,
  };
  userClient.createUser(createUserRequest, function(err, createUserResp) {
    console.log(createUserResp);
    let user = createUserResp.created_user;
    let setPasswordRequest = {
      user_id: user.user_id,
      password: password
    };
    userClient.setPassword(setPasswordRequest, function(err, setPasswordResp) {
      console.log(setPasswordResp);
      res.redirect('/signup/success');
    });
  });
});



app.listen(8080);

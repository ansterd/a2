
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
// var user = require('./routes/user');
var http = require('http');
var path = require('path');
 

var AWS = require('aws-sdk');

AWS.config.loadFromPath('./config.json');

var ec2_1 = new AWS.EC2({region: "ap-northeast-1"});
var ec2_2 = new AWS.EC2({region: "us-east-1"});

// new AWS.EC2().stopInstances({ InstanceIds : ["i-d965b7de"]}, function(error, data) {
  // if (error) {
    // console.log(error); // an error occurred
  // } else {
    // console.log(data[2]); // request succeeded
//     
//     
  // }
// });

var app = express();

// all environments
app.set('port', process.env.PORT || 80);
app.engine('.html', require('ejs').__express);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.cookieParser());
app.use(express.session({secret: '1234567890QWERTY'}));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'bower_components')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// !-- Debug -!
// app.get('/', routes.index);
app.get('/', routes.debug);

app.post('/login', routes.login);
app.get('/logout', routes.logout);
// app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});





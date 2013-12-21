var express = require('express');
var fs = require('fs');
var path = require('path');
var rsvp = require('./rsvp');

var default_port = 8080;
var static_dir = 'static';
var index_html = path.join(__dirname, static_dir) + '/html/index.html';

var app = express();
app.use(express.logger());
app.use('/static', express.static(path.join(__dirname, static_dir)));
app.use(app.router);
app.use(express.errorHandler());
app.use(express.bodyParser());

app.get('/', function(request, response) {
  fs.readFile(index_html, encoding = 'utf8', function(err, data) {
    if (err) console.log("Couldn't read index.html file: %s", err);
    response.send(data);
  });
});

app.post('/', function(request, response) {
  console.log(request.body);
  response.send(request.body);
  var info = [request.body.title, request.body.firstName, request.body.lastName];
  rsvp.guest(info);
});

var port = process.env.PORT || default_port;
app.listen(port, function() {
  console.log("Listening on %s.", port);
});

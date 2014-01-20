var express = require('express');
var fs = require('fs');
var path = require('path');
var rsvp = require('./rsvp');

var default_port = 8080;
var static_dir = 'static';
var index_html = path.join(__dirname, static_dir) + '/html/index.html';
var port = process.env.PORT || default_port;
var app = express();

app.configure(function() {
  app.use(express.logger());
  app.use('/static', express.static(path.join(__dirname, static_dir)));
  app.use(express.errorHandler());
  app.use(express.urlencoded());
  app.use(app.router); // Needs to be called last.
});

app.listen(port, function() {
  console.log("Listening on %s.", port);
});

app.get('/', function(request, response) {
  fs.readFile(index_html, encoding = 'utf8', function(err, data) {
    if (err) console.log("Couldn't read index.html file: %s", err);
    response.send(data);
  });
});

app.post('/', function(request, response) {
  console.log(request.body);
  response.send(request.body);
  var info = [request.body.title, request.body.first_name,
      request.body.last_name, request.body.accepted,
      request.body.party_size_adults, request.body.party_size_kids,
      request.body.email, request.body.allergies, request.body.comments];
  rsvp.guest(info);
});


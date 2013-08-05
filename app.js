var express = require('express');
var fs = require('fs');
var path = require('path');

var default_port = 8080;
var static_dir = 'static';

var app = express();
app.use(express.logger());
app.use('/static', express.static(path.join(__dirname, static_dir)));
app.use(app.router);
app.use(express.errorHandler());

app.get('/', function(request, response) {
  fs.readFile('index.html', encoding = 'utf8', function(err, data) {
    if (err) throw err;
    response.send(data);
  });
});

var port = process.env.PORT || default_port;
app.listen(port, function() {
  console.log("Listening on %s.", port);
});

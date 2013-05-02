var express = require('express');

var routes = require('./routes');
var experiences = require('./routes/experience');

var http = require('http')
var path = require('path');

var app = express();

app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/experiences', experiences.all);
app.get('/experiences/:id', experiences.id);
app.post('/experiences', experiences.insert);

app.get('/users/:username/experiences', experiences.user);

app.post('/test', function(request, response) {
  console.log(request.body);      // your JSON
  response.send(request.body);    // echo the result back
});

http.createServer(app).listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});
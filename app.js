var express = require('express');

var experiences = require('./routes/experience');
var apikey = require('./apikey');

var http = require('http')
var path = require('path');
var passport = require('passport');

var app = express();

app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());
app.use(app.router);

if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/experiences', experiences.all);
app.get('/experiences/:id', experiences.id);
app.post('/experiences', experiences.insert);

app.get('/users/:username/experiences', experiences.user);

/*
app.post('/test', function(request, response) {
  console.log(request.body);      // your JSON
  response.send(request.body);    // echo the result back
});
*/

app.post('/test',
	passport.authenticate('localapikey', { failureRedirect: '/unauthorized' }),
  function(req, res) {
    res.json({ message: "Authenticated" })
});

app.get('/unauthorized', function(req, res) {
	res.json({ message: "Not authenticated" })
});

http.createServer(app).listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});
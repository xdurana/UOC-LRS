var express = require('express');
var http = require('http')
var path = require('path');

var statements = require('./routes/statement');

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
app.use(app.router);

if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.post('/xAPI/statements', statements.post);
app.get('/xAPI/statements', statements.get);

http.createServer(app).listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});
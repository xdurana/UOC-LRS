var express = require('express');
var http = require('http')

var statements = require('./routes/statement');
var config = require('./config');

var app = express();

app.set('port', config.port());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.json());
app.use(app.router);

if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.post('/xapi/statements', statements.post);
app.put('/xapi/statements', statements.put);
app.get('/xapi/statements', statements.get);

http.createServer(app).listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});
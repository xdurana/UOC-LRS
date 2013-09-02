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

app.use(function(err, req, res, next) {
    console.error(err.stack);
    next(err);
});

app.get('/xapi/statements/test', function (req, res, callback) {
    statements.test(function (err, result) {
        if(err) { console.log(err); callback(err); return; }
        res.json(result);
    });
});

app.post('/xapi/statements', function (req, res, callback) {
    statements.post(req.body, function (err, result) {
        if(err) { console.log(err); callback(err); return; }
        res.json(result);
    });
});

app.put('/xapi/statements', function (req, res, callback) {
    statements.put(req.query.statementId, req.body, function (err, result) {
        if(err) { console.log(err); callback(err); return; }
        res.json(result);
    });
});

http.createServer(app).listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});
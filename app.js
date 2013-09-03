var express = require('express');
var http = require('http')

var statements = require('./routes/statement');
var filter = require('./routes/filter');
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

app.delete('/xapi/statements', function (req, res, callback) {
    statements.delete(function (err, result) {
        if(err) { console.log(err); callback(err); return; }
        res.json(result);
    });
});

app.post('/xapi/statements', function (req, res, callback) {
    console.log(req.body);
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

app.get('/xapi/statements', function (req, res, callback) {
    statements.get(function (err, result) {
        if(err) { console.log(err); callback(err); return; }
        console.log(result);
        res.json(result);
    });
});

app.get('/xapi/statements/filter/idp/:idp', function (req, res, callback) {
    filter.byidp(req.params.idp, function (err, result) {
        if(err) { console.log(err); callback(err); return; }
        res.json(result);
    });
});

app.get('/xapi/statements/filter/subject/:domainid', function (req, res, callback) {
    filter.bysubject(req.params.domainid, function (err, result) {
        if(err) { console.log(err); callback(err); return; }
        res.json(result);
    });
});

app.get('/xapi/statements/filter/classroom/:domainid', function (req, res, callback) {
    filter.byclassroom(req.params.domainid, function (err, result) {
        if(err) { console.log(err); callback(err); return; }
        res.json(result);
    });
});

app.get('/xapi/statements/filter/activity/:eventid', function (req, res, callback) {
    filter.byactivity(req.params.eventid, function (err, result) {
        if(err) { console.log(err); callback(err); return; }
        res.json(result);
    });
});

http.createServer(app).listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});
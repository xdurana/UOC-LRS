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

app.get(config.base() + '/xapi/statements', function (req, res, callback) {
    statements.get(function (err, result) {
        if(err) { console.log(err); callback(err); return; }
        res.json(result);
    });
});

app.post(config.base() + '/xapi/statements', function (req, res, callback) {
    statements.post(req.body, function (err, result) {
        if(err) { console.log(err); callback(err); return; }
        res.json(result);
    });
});

app.put(config.base() + '/xapi/statements', function (req, res, callback) {
    statements.put(req.query.statementId, req.body, function (err, result) {
        if(err) { console.log(err); callback(err); return; }
        res.json(result);
    });
});

app.get(config.base() + '/guaita/idp/:idp', function (req, res, callback) {
    filter.byidp(req.params.idp, function (err, result) {
        if(err) { console.log(err); callback(err); return; }
        res.json(result);
    });
});

app.get(config.base() + '/guaita/idp/:idp/last', function (req, res, callback) {
    filter.byidplast(req.params.idp, function (err, result) {
        if(err) { console.log(err); callback(err); return; }
        res.json(result);
    });
});

app.get(config.base() + '/guaita/subjects/:domainid', function (req, res, callback) {
    filter.bysubject(req.params.domainid, function (err, result) {
        if(err) { console.log(err); callback(err); return; }
        res.json(result);
    });
});

app.get(config.base() + '/guaita/classrooms/:domainid', function (req, res, callback) {
    filter.byclassroom(req.params.domainid, function (err, result) {
        if(err) { console.log(err); callback(err); return; }
        res.json(result);
    });
});

app.get(config.base() + '/guaita/activities/:eventid', function (req, res, callback) {
    filter.byactivity(req.params.eventid, function (err, result) {
        if(err) { console.log(err); callback(err); return; }
        res.json(result);
    });
});

app.get(config.base() + '/guaita/tools/:resourceid', function (req, res, callback) {
    filter.bytool(req.params.resourceid, function (err, result) {
        if(err) { console.log(err); callback(err); return; }
        res.json(result);
    });
});

app.get(config.base() + '/guaita/idp/:idp/subjects/:domainid', function (req, res, callback) {
    filter.byidpandsubject(req.params.idp, req.params.domainid, function (err, result) {
        if(err) { console.log(err); callback(err); return; }
        res.json(result);
    });
});

app.get(config.base() + '/guaita/idp/:idp/classrooms/:domainid', function (req, res, callback) {
    filter.byidpandclassroom(req.params.idp, req.params.domainid, function (err, result) {
        if(err) { console.log(err); callback(err); return; }
        res.json(result);
    });
});

app.get(config.base() + '/guaita/idp/:idp/activities/:eventid', function (req, res, callback) {
    filter.byidpandactivity(req.params.idp, req.params.eventid, function (err, result) {
        if(err) { console.log(err); callback(err); return; }
        res.json(result);
    });
});

app.get(config.base() + '/guaita/idp/:idp/tools/:resourceid', function (req, res, callback) {
    filter.byidpandtool(req.params.idp, req.params.resourceid, function (err, result) {
        if(err) { console.log(err); callback(err); return; }
        res.json(result);
    });
});

app.get(config.base() + '/guaita/idp/:idp/subjects/:domainid/last', function (req, res, callback) {
    filter.byidpandsubjectlast(req.params.idp, req.params.domainid, function (err, result) {
        if(err) { console.log(err); callback(err); return; }
        res.json(result);
    });
});

app.get(config.base() + '/guaita/idp/:idp/classrooms/:domainid/last', function (req, res, callback) {
    filter.byidpandclassroomlast(req.params.idp, req.params.domainid, function (err, result) {
        if(err) { console.log(err); callback(err); return; }
        res.json(result);
    });
});

app.get(config.base() + '/guaita/idp/:idp/activities/:eventid/last', function (req, res, callback) {
    filter.byidpandactivitylast(req.params.idp, req.params.eventid, function (err, result) {
        if(err) { console.log(err); callback(err); return; }
        res.json(result);
    });
});

app.get(config.base() + '/guaita/idp/:idp/tools/:resourceid/last', function (req, res, callback) {
    filter.byidpandtoollast(req.params.idp, req.params.resourceid, function (err, result) {
        if(err) { console.log(err); callback(err); return; }
        res.json(result);
    });
});

app.post(config.base() + '/guaita/all/:max', function (req, res, callback) {
    filter.all(req.body, req.params.max, function (err, result) {
        if(err) { console.log(err); callback(err); return; }
        res.json(result);
    });
});

app.post(config.base() + '/guaita/count', function (req, res, callback) {
    filter.count(req.body, function (err, result) {
        if(err) { console.log(err); callback(err); return; }
        res.json(result);
    });
});

http.createServer(app).listen(app.get('port'), function() {
    statements.connect(function (err, callback) {
        if(err) { console.log(err); callback(err); return; }
        console.log('Express server listening on port ' + app.get('port'));
    });
});
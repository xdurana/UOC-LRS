var express = require('express');
var http = require('http')

var db = require('./lib/dao/db');
var guaita = require('./lib/controllers/guaita');
var xapi = require('./lib/controllers/xapi');
var config = require('./config');

var app = express();

app.set('port', config.port());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.json());
app.use(app.router);

/**
 * [description]
 * @param  {[type]}   err  [description]
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
app.use(function(err, req, res, next) {
    console.error(err.stack);
    next(err);
});

/**
 * [description]
 * @param  {[type]}   err  [description]
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
app.use(function(err, req, res, next) {
    res.status(500);
    res.json({
        status: 500,
        url: req.url,
        error: err 
    });
});

app.get('/app/lrs/xapi/statements', xapi.get);
app.put('/app/lrs/xapi/statements', xapi.put);
app.post('/app/lrs/xapi/statements', xapi.post);

app.post('/app/lrs/guaita', guaita.byfilter);

app.get('/app/lrs/guaita/idp/:idp', guaita.byidp);
app.get('/app/lrs/guaita/idp/:idp/last', guaita.byidplast);
app.get('/app/lrs/guaita/idp/:idp/subjects/:domainid', guaita.byidpandsubject);
app.get('/app/lrs/guaita/idp/:idp/subjects/:domainid/last', guaita.byidpandsubjectlast);
app.get('/app/lrs/guaita/idp/:idp/classrooms/:domainid', guaita.byidpandclassroom);
app.get('/app/lrs/guaita/idp/:idp/classrooms/:domainid/last', guaita.byidpandclassroomlast);
app.get('/app/lrs/guaita/idp/:idp/activities/:eventid', guaita.byidpandactivity);
app.get('/app/lrs/guaita/idp/:idp/activities/:eventid/last', guaita.byidpandactivitylast);
app.get('/app/lrs/guaita/idp/:idp/tools/:resourceid', guaita.byidpandtool);
app.get('/app/lrs/guaita/idp/:idp/tools/:resourceid/last', guaita.byidpandtoollast);

app.get('/app/lrs/guaita/subjects/:domainid', guaita.bysubject);
app.get('/app/lrs/guaita/classrooms/:domainid', guaita.byclassroom);
app.get('/app/lrs/guaita/activities/:eventid', guaita.byactivity);
app.get('/app/lrs/guaita/tools/:resourceid', guaita.bytool);

app.post('/app/lrs/guaita/all/:max', guaita.all);
app.post('/app/lrs/guaita/count', guaita.count);

http.createServer(app).listen(app.get('port'), function() {
    db.connect(function (err, callback) {
        if (err) return callback(err);
        console.log('Express server listening on port ' + app.get('port'));
    });
});
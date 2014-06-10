var express = require('express');
var http = require('http')

var db = require('./lib/dao/db');
var guaita = require('./lib/controllers/guaita');
var xapi = require('./lib/controllers/xapi');
var user = require('./lib/controllers/user');
var config = require('./config');

var app = express();

app.set('port', config.port());
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

app.post('/app/lrs/xapi/statements', xapi.post);

app.get('/app/lrs/guaita/idp/:idp', user.authorize, guaita.byidp);
app.get('/app/lrs/guaita/idp/:idp/last', user.authorize, guaita.byidplast);
app.get('/app/lrs/guaita/idp/:idp/subjects/:domainid', user.authorize, guaita.byidpandsubject);
app.get('/app/lrs/guaita/idp/:idp/subjects/:domainid/last', user.authorize, guaita.byidpandsubjectlast);
app.get('/app/lrs/guaita/idp/:idp/classrooms/:domainid', user.authorize, guaita.byidpandclassroom);
app.get('/app/lrs/guaita/idp/:idp/classrooms/:domainid/last', user.authorize, guaita.byidpandclassroomlast);
app.get('/app/lrs/guaita/idp/:idp/activities/:eventid', user.authorize, guaita.byidpandactivity);
app.get('/app/lrs/guaita/idp/:idp/activities/:eventid/last', user.authorize, guaita.byidpandactivitylast);
app.get('/app/lrs/guaita/idp/:idp/tools/:resourceid', user.authorize, guaita.byidpandtool);
app.get('/app/lrs/guaita/idp/:idp/tools/:resourceid/last', user.authorize, guaita.byidpandtoollast);
app.get('/app/lrs/guaita/subjects/:domainid', user.authorize, guaita.bysubject);
app.get('/app/lrs/guaita/classrooms/:domainid', user.authorize, guaita.byclassroom);
app.get('/app/lrs/guaita/activities/:eventid', user.authorize, guaita.byactivity);
app.get('/app/lrs/guaita/tools/:resourceid', user.authorize, guaita.bytool);

http.createServer(app).listen(app.get('port'), function() {
    db.connect(function (err, callback) {
        if (err) return callback(err);
        console.log('Express server listening on port ' + app.get('port'));
    });
});
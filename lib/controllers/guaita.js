var db = require('../dao/db');

/**
 * [dbcall description]
 * @param  {[type]}   req    [description]
 * @param  {[type]}   res    [description]
 * @param  {[type]}   filter [description]
 * @param  {Function} next   [description]
 * @return {[type]}          [description]
 */
var dbcall = function(req, filter, next) {
    var statements = db.collection('statements');
    if (req.query.n === '0') {
        return db.all(filter, statements, function (err, docs) {
            return next(err, docs);
        });
    } else if (req.query.n) {
        return db.some(filter, parseInt(req.query.n) || 1, statements, function (err, docs) {
            return next(err, docs);
        });
    } else {
        return db.count(filter, statements, function (err, docs) {
            return next(err, docs);
        });
    }
}

/**
 * [byfilter description]
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
var byfilter = exports.byfilter = function (req, res, next) {
    return dbcall(req, req.body, function (err, docs) {
        if (err) return next(err);
        res.json(docs);
    });
}

/**
 * [byidp description]
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
var byidp = exports.byidp = function (req, res, next) {
    var filter = { 'actor.account.name': req.params.idp };
    return dbcall(req, filter, function (err, docs) {
        if (err) return next(err);
        res.json(docs);
    });
}

/**
 * [bysubject description]
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
var bysubject = exports.bysubject = function (req, res, next) {
    var filter = { 'context.extensions.uoc:lrs:subject:id': req.params.domainid };
    return dbcall(req, filter, function (err, docs) {
        if (err) return next(err);
        res.json(docs);
    });
}

/**
 * [byclassroom description]
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
var byclassroom = exports.byclassroom = function (req, res, next) {
    var filter = { 'context.extensions.uoc:lrs:classroom:id': req.params.domainid };
    return dbcall(req, filter, function (err, docs) {
        if (err) return next(err);
        res.json(docs);
    });    
}

/**
 * [byactivity description]
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
var byactivity = exports.byactivity = function (req, res, next) {
    var filter = { 'context.extensions.uoc:lrs:activity:id': req.params.eventid };
    return dbcall(req, filter, function (err, docs) {
        if (err) return next(err);
        res.json(docs);
    });    
}

/**
 * [bytool description]
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
var bytool = exports.bytool = function (req, res, next) {
    var filter = { 'context.extensions.uoc:lrs:tool:id': req.params.resourceid };
    return dbcall(req, filter, function (err, docs) {
        if (err) return next(err);
        res.json(docs);
    });    
}

/**
 * [byidpandsubject description]
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
var byidpandsubject = exports.byidpandsubject = function (req, res, next) {
    var filter = { $and:[{ 'actor.account.name': req.params.idp }, { 'context.extensions.uoc:lrs:subject:id': req.params.domainid }]};
    return dbcall(req, filter, function (err, docs) {
        if (err) return next(err);
        res.json(docs);
    });
}

/**
 * [byidpandclassroom description]
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
var byidpandclassroom = exports.byidpandclassroom = function (req, res, next) {
    var filter = { $and:[{ 'actor.account.name': req.params.idp }, { 'context.extensions.uoc:lrs:classroom:id': req.params.domainid }]};
    return dbcall(req, filter, function (err, docs) {
        if (err) return next(err);
        res.json(docs);
    });
}

/**
 * [byidpandactivity description]
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
var byidpandactivity = exports.byidpandactivity = function (req, res, next) {
    var filter = { $and:[{ 'actor.account.name': req.params.idp }, { 'context.extensions.uoc:lrs:activity:id': req.params.eventid }]};
    return dbcall(req, filter, function (err, docs) {
        if (err) return next(err);
        res.json(docs);
    });
}

/**
 * [byidpandtool description]
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
var byidpandtool = exports.byidpandtool = function (req, res, next) {
    var filter = { $and:[{ 'actor.account.name': req.params.idp }, { 'object.definition.extensions.uoc:lrs:tool:id': req.params.resourceid }]};
    return dbcall(req, filter, function (err, docs) {
        if (err) return next(err);
        res.json(docs);
    });
}

/**
 * [byidplast description]
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
var byidplast = exports.byidplast = function (req, res, next) {
    var filter = { 'actor.account.name': req.params.idp };
    return db.some(filter, 1, function (err, docs) {
        if (err) return next(err);
        res.json(docs);
    });    
}

/**
 * [byidpandsubjectlast description]
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
var byidpandsubjectlast = exports.byidpandsubjectlast = function (req, res, next) {
    var filter = { $and:[{ 'actor.account.name': req.params.idp }, { 'context.extensions.uoc:lrs:subject:id': req.params.domainid }]};
    return db.some(filter, 1, function (err, docs) {
        if (err) return next(err);
        res.json(docs);
    });
}

/**
 * [byidpandclassroomlast description]
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
var byidpandclassroomlast = exports.byidpandclassroomlast = function (req, res, next) {
    var filter = { $and:[{ 'actor.account.name': req.params.idp }, { 'context.extensions.uoc:lrs:classroom:id': req.params.domainid }]};
    return db.some(filter, 1, function (err, docs) {
        if (err) return next(err);
        res.json(docs);
    });
}

/**
 * [byidpandactivitylast description]
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
var byidpandactivitylast = exports.byidpandactivitylast = function (req, res, next) {
    var filter = { $and:[{ 'actor.account.name': req.params.idp }, { 'context.extensions.uoc:lrs:activity:id': req.params.eventid }]};
    return db.some(filter, 1, function (err, docs) {
        if (err) return next(err);
        res.json(docs);
    });
}

/**
 * [byidpandtoollast description]
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
var byidpandtoollast = exports.byidpandtoollast = function (req, res, next) {
    var filter = { $and:[{ 'actor.account.name': req.params.idp }, { 'object.definition.extensions.uoc:lrs:tool:id': req.params.resourceid }]};
    return db.some(filter, 1, function (err, docs) {
        if (err) return next(err);
        res.json(docs);
    });
}

/**
 * [byidphistory description]
 * @param  {[type]}   idp  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
var byidphistory = exports.byidphistory = function(idp, datetime, next) {
    db.collection('cache').find({ "idp": idp }).toArray(function(err, docs) {
        if (docs.length > 0) return next(null, docs[0].count);
        db.collection('statements').count({ $and:[{ "actor.account.name": idp }, { "timestamp": { "$regex": "" + datetime } }] }, function (err, value) {
            if (err) return next(err);
            var data = {
                idp: idp,
                datetime: datetime,
                count: value
            };
            db.collection('cache').insert(data, function (err, docs) {
                return next(err, value);
            });
        });
    });
}
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
    if (req.query.n === '0') {
        return db.all(filter, function (err, docs) {
            return next(err, docs);
        });
    } else if (req.query.n) {
        return db.some(filter, parseInt(req.query.n) || 1, function (err, docs) {
            return next(err, docs);
        });
    } else {
        return db.count(filter, function (err, docs) {
            return next(err, docs);
        });
    }
}

/**
 * [all description]
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
var all = exports.all = function (req, res, next) {
    return db.some(req.body, req.params.max, function (err, docs) {
        if (err) return next(err);
        res.json(docs);
    });
}

/**
 * [explain description]
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
var explain = exports.explain = function(req, res, next) {
    return db.explain(req.body, req.params.max, function (err, docs) {
        if (err) return next(err);
        res.json(docs);
    });
}

/**
 * [count description]
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
var count = exports.count = function (req, res, next) {
    return db.count(req.body, function (err, docs) {
        if (err) return next(err);
        res.json(docs);
    });
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
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
var byidphistory = exports.byidphistory = function (req, res, next) {
    var datetime = "2014-02-12T08";
    db.byidphistory(req.params.idp, datetime, function (err, docs) {
        if (err) return next(err);
        res.json(docs);
    });
}
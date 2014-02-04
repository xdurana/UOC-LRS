var mongo = require('mongodb');
var uuid = require('node-uuid');
var async = require('async');

var config = require('../../config');
var statements;

/**
 * [connect description]
 * @param  {Function} next [description]
 * @return {[type]}            [description]
 */
exports.connect = function(next) {
    var MongoClient = mongo.MongoClient;
    MongoClient.connect(config.db(), function(err, db) {
        if (err) return next(err);
        db.createCollection('statements', function(err, collection) {
            if (err) return next(err);
            index(collection, function(err) {
                statements = collection;
                return next(err);
            });
        });
    });
}

/**
 * [index description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
var index = function(statements, next) {
    async.parallel([
        function (next) {
            statements.ensureIndex("actor.account.name", { background: true }, function(err, indexname) {
                return next(err, indexname);
            });
        },
        function (next) {
            statements.ensureIndex("context.extensions.uoc:lrs:subject:id", { background: true }, function(err, indexname) {
                return next(err, indexname);
            });
        },
        function (next) {
            statements.ensureIndex("context.extensions.uoc:lrs:classroom:id", { background: true }, function(err, indexname) {
                return next(err, indexname);
            });
        },
        function (next) {
            statements.ensureIndex("context.extensions.uoc:lrs:activity:id", { background: true }, function(err, indexname) {
                return next(err, indexname);
            });
        },
        function (next) {
            statements.ensureIndex("context.extensions.uoc:lrs:tool:id", { background: true }, function(err, indexname) {
                return next(err, indexname);
            });
        },
        function (next) {
            statements.ensureIndex(["actor.account.name","context.extensions.uoc:lrs:subject:id"], { background: true }, function(err, indexname) {
                return next(err, indexname);
            });
        },
        function (next) {
            statements.ensureIndex(["actor.account.name","context.extensions.uoc:lrs:classroom:id"], { background: true }, function(err, indexname) {
                return next(err, indexname);
            });
        },
        function (next) {
            statements.ensureIndex(["actor.account.name","context.extensions.uoc:lrs:activity:id"], { background: true }, function(err, indexname) {
                return next(err, indexname);
            });
        },
        function (next) {
            statements.ensureIndex(["actor.account.name","context.extensions.uoc:lrs:tool:id"], { background: true }, function(err, indexname) {
                return next(err, indexname);
            });
        }
    ], function(err, results) {
        statements.indexInformation(function(err, information) {
            return next(err);
        });
    });
}

/**
 * [get description]
 * @param  {Function} next [description]
 * @return {[type]}            [description]
 */
var get = exports.get = function(next) {
    statements.find({}, { 'sort': [['stored','desc']], 'limit': '20' }).toArray(function(err, docs) {
        next(err, docs);
    });
}

/**
 * [post description]
 * @param  {[type]}   data     [description]
 * @param  {Function} next [description]
 * @return {[type]}            [description]
 */
var post = exports.post = function(data, next) {
    data.id = uuid.v1();
    data.stored = new Date().toJSON();
    statements.insert(data, function (err, docs) {
        next(err, docs);
    });
}

/**
 * [put description]
 * @param  {[type]}   statementId [description]
 * @param  {[type]}   data        [description]
 * @param  {Function} next    [description]
 * @return {[type]}               [description]
 */
var put = exports.put = function(statementId, data, next) {
    data.id = statementId ? statementId : uuid.v1();
    data.stored = new Date().toJSON();
    statements.insert(data, function (err, docs) {
        next(err, docs);
    });
}

/**
 * [all description]
 * @param  {[type]}   conditions [description]
 * @param  {[type]}   max        [description]
 * @param  {Function} next   [description]
 * @return {[type]}              [description]
 */
var all = exports.all = function(conditions, next) {
    statements.find(conditions, { 'sort': [['stored','desc']]}).toArray(function(err, docs) {
        next(err, docs);
    });
}

/**
 * [explain description]
 * @param  {[type]}   conditions [description]
 * @param  {Function} next       [description]
 * @return {[type]}              [description]
 */
var explain = exports.explain = function(conditions, max, next) {
    statements.find(conditions, { 'sort': [['stored','desc']], 'limit': max }).explain(function(err, docs) {
        next(err, docs);
    });
}

/**
 * [some description]
 * @param  {[type]}   conditions [description]
 * @param  {[type]}   max        [description]
 * @param  {Function} next   [description]
 * @return {[type]}              [description]
 */
var some = exports.some = function(conditions, max, next) {
    statements.find(conditions, { 'sort': [['stored','desc']], 'limit': max }).toArray(function(err, docs) {
        next(err, docs);
    });
}

/**
 * [count description]
 * @param  {[type]}   conditions [description]
 * @param  {Function} next   [description]
 * @return {[type]}              [description]
 */
var count = exports.count = function(conditions, next) {
    statements.count(conditions, function (err, docs) {
        next(err, docs);
    });
}
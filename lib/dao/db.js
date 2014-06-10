var mongo = require('mongodb');
var async = require('async');

var config = require('../../config');
var db;

/**
 * [connect description]
 * @param  {Function} next [description]
 * @return {[type]}            [description]
 */
exports.connect = function(next) {
    var MongoClient = mongo.MongoClient;
    MongoClient.connect(config.db(), function(err, mdb) {
        if (err) return next(err);
        db = mdb;
        async.parallel([
            function(next) {
                db.createCollection('statements', function(err, collection) {
                    if (err) return next(err);
                    return next(err);
                    index(collection, function(err) {
                        return next(err);
                    });
                });
            },
            function(next) {
                db.createCollection('cache', function(err, collection) {
                    if (err) return next(err);
                    return next(err);
                });                
            }
        ], function(err, results) {
            return next(err);
        });
    });
}

/**
 * [statements description]
 * @return {[type]} [description]
 */
exports.statements = function() {
    return db.collection('statements');
}

/**
 * [cache description]
 * @return {[type]} [description]
 */
exports.cache = function() {
    return db.collection('cache');
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
 * [all description]
 * @param  {[type]}   conditions [description]
 * @param  {[type]}   collection [description]
 * @param  {Function} next       [description]
 * @return {[type]}              [description]
 */
var all = exports.all = function(conditions, collection, next) {
    collection.find(conditions, { 'sort': [['stored','desc']]}).toArray(function(err, docs) {
        next(err, docs);
    });
}

/**
 * [some description]
 * @param  {[type]}   conditions [description]
 * @param  {[type]}   max        [description]
 * @param  {[type]}   collection [description]
 * @param  {Function} next       [description]
 * @return {[type]}              [description]
 */
var some = exports.some = function(conditions, max, collection, next) {
    collection.find(conditions, { 'sort': [['stored','desc']], 'limit': max }).toArray(function(err, docs) {
        next(err, docs);
    });
}

/**
 * [count description]
 * @param  {[type]}   conditions [description]
 * @param  {[type]}   collection [description]
 * @param  {Function} next       [description]
 * @return {[type]}              [description]
 */
var count = exports.count = function(conditions, collection, next) {
    collection.count(conditions, function (err, docs) {
        next(err, docs);
    });
}
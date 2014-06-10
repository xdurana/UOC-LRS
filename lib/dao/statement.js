var db = require('../dao/db');
var cache = require('../dao/cache');
var uuid = require('node-uuid');

/**
 * [post description]
 * @param  {[type]}   data       [description]
 * @param  {Function} next       [description]
 * @return {[type]}              [description]
 */
var post = exports.post = function(data, next) {
    data.id = uuid.v1();
    data.stored = new Date().toJSON();
    db.statements().insert(data, function (err, docs) {
        if (err) next(err);
        cache.update(data, function (err) {
            return next(err, docs);
        });
    });
}
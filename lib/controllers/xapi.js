var db = require('../dao/db');

/**
 * [get description]
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
var get = exports.get = function (req, res, next) {
    db.get(function (err, result) {
        if (err) return next(err);
        res.json(result);
    });
}

/**
 * [post description]
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
var post = exports.post = function (req, res, next) {
    db.post(req.body, function (err, result) {
        if (err) return next(err);
        console.log(result[0].id);
        res.json([result[0].id]);
    });
}

/**
 * [put description]
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
var put = exports.put = function (req, res, next) {
    db.put(req.query.statementId, req.body, function (err, result) {
        if (err) return next(err);
        console.log(result[0].id);
        res.json([result[0].id]);
    });
}
var statement = require('../dao/statement');

/**
 * [post description]
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
var post = exports.post = function (req, res, next) {
    statement.post(req.body, function (err, result) {
        if (err) return next(err);
        res.json(result);
    });
}
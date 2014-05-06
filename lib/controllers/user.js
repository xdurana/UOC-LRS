var campus = require('../services/campus');
var config = require('../../config');

/**
 * [authorize description]
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
var authorize = exports.authorize = function (req, res, next) {
    return next();
}
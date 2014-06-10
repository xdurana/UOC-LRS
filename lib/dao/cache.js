var db = require('../dao/db');
var util = require('util');

/**
 * [update description]
 * @param  {[type]}   statement [description]
 * @param  {Function} next      [description]
 * @return {[type]}             [description]
 */
var update = exports.update = function(statement, next) {

    var properties = {};

    if (statement && statement.actor && statement.actor.account && statement.actor.account.name) {
        properties['idp'] = statement.actor.account.name;
    }
    if (statement && statement.context && statement.context.extensions && statement.context.extensions['uoc:lrs:app']) {
        properties['app'] = statement.context.extensions['uoc:lrs:app'];
    }
    if (statement && statement.context && statement.context.extensions && statement.context.extensions['uoc:lrs:subject:id']) {
        properties['subject'] = statement.context.extensions['uoc:lrs:subject:id'];
    }
    if (statement && statement.context && statement.context.extensions && statement.context.extensions['uoc:lrs:classroom:id']) {
        properties['classroom'] = statement.context.extensions['uoc:lrs:classroom:id'];
    }
    if (statement && statement.context && statement.context.extensions && statement.context.extensions['uoc:lrs:activity:id']) {
        properties['activity'] = statement.context.extensions['uoc:lrs:activity:id'];
    }

    console.log(properties);

    if (properties['app'] && properties['subject']) {
        updatecount(util.format('app/%s/subject/%s', properties['app'], properties['subject']));
    }
    if (properties['app'] && properties['classroom']) {
        updatecount(util.format('app/%s/classroom/%s', properties['app'], properties['classroom']));
    }
    if (properties['app'] && properties['activity']) {
        updatecount(util.format('app/%s/activity/%s', properties['app'], properties['activity']));
    }
    if (properties['app'] && properties['idp'] && properties['subject']) {
        updatecount(util.format('app/%s/idp/%s/subject/%s', properties['app'], properties['idp'], properties['subject']));
    }
    if (properties['app'] && properties['idp'] && properties['classroom']) {
        updatecount(util.format('app/%s/idp/%s/classroom/%s', properties['app'], properties['idp'], properties['classroom']));
    }
    if (properties['app'] && properties['idp'] && properties['activity']) {
        updatecount(util.format('app/%s/idp/%s/activity/%s', properties['app'], properties['idp'], properties['activity']));
    }

    return next();    
}

/**
 * [updatecount description]
 * @param  {[type]}   code [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
var updatecount = function(code) {
    db.cache().findAndModify(
        { code: code },
        [['frequency', 1]],
        { $inc: { frequency: 1 } },
        {new: false},
        function(err, object) {
            if (err) {
                console.warn(err.message);
            }
        }
    );
}
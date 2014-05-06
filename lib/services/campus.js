var util = require('util');
var service = require('./service');

/**
 * [getIdpBySession description]
 * @param  {[type]}   s        [description]
 * @param  {Function} callback [description]
 * @return {[type]}            [description]
 */
exports.getIdpBySession = function(s, callback) {
    var url = util.format('http://cv.uoc.edu/webapps/campusGateway/sessions/%s.xml',
        s
    );
    service.xml(url, function(err, object) {
        if (err) return callback();
        return object.session.authenticated[0] === 'true' ?
        callback(null, object.session.userNumber[0]) :
        callback(config.util.format("(campusGateway) No s'ha pogut comprovar la sessió [%s]", url));
    });
}
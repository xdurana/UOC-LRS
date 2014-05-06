var request = require('request');
var xml2js = require('xml2js');

/**
 * [xml description]
 * @param  {[type]}   url  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
var xml = exports.xml = function(url, next) {
    var parser = new xml2js.Parser;
    request({
      url: url,
      method: "GET"
    }, function (err, response, xml) {
        if (err) return next(err);
        parser.parseString(xml, function (err, object) {
            if (err) return next(err);
            return next(null, object);
        });
    });
}
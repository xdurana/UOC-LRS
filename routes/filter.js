var statement = require('./statement');

exports.byidp = function(idp, callback) {
    statement.collection().count({ 'actor:account:name': idp }, function (err, docs) {
        if(err) { console.log(err); callback(err); return; }
        callback(null, docs);
    });
}

exports.bysubject = function(domainid, callback) {
    statement.collection().count({ 'context:extensions:uoc:lrs:subject:id': domainid }, function (err, docs) {
        if(err) { console.log(err); callback(err); return; }
        callback(null, docs);
    });
}

exports.byclassroom = function(domainid, callback) {
    statement.collection().count({ 'context:extensions:uoc:lrs:classroom:id': domainid }, function (err, docs) {
        if(err) { console.log(err); callback(err); return; }
        callback(null, docs);
    });
}

exports.byactivity = function(eventid, callback) {
    statement.collection().count({ 'context:extensions:uoc:lrs:activity:id': eventid }, function (err, docs) {
        if(err) { console.log(err); callback(err); return; }
        callback(null, docs);
    });
}
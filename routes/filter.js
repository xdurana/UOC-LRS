var statement = require('./statement');

exports.byidp = function(idp, callback) {
    statement.collection().count({ 'actor.account.name': idp }, function (err, docs) {
        if(err) { console.log(err); callback(err); return; }
        callback(null, docs);
    });
}

exports.bysubject = function(domainid, callback) {
    statement.collection().count({ 'context.extensions.uoc:lrs:subject:id': domainid }, function (err, docs) {
        if(err) { console.log(err); callback(err); return; }
        callback(null, docs);
    });
}

exports.byclassroom = function(domainid, callback) {
    statement.collection().count({ 'context.extensions.uoc:lrs:classroom:id': domainid }, function (err, docs) {
        if(err) { console.log(err); callback(err); return; }
        callback(null, docs);
    });
}

exports.byactivity = function(eventid, callback) {
    statement.collection().count({ 'context.extensions.uoc:lrs:activity:id': eventid }, function (err, docs) {
        if(err) { console.log(err); callback(err); return; }
        callback(null, docs);
    });
}

exports.bytool = function(resourceid, callback) {
    statement.collection().count({ 'object.definition.extensions.uoc:lrs:tool:id': resourceid }, function (err, docs) {
        if(err) { console.log(err); callback(err); return; }
        callback(null, docs);
    });
}

exports.byidpandsubject = function(idp, domainid, callback) {
    statement.collection().count({ $and:[{ 'actor.account.name': idp }, { 'context.extensions.uoc:lrs:subject:id': domainid }]}, function (err, docs) {
        if(err) { console.log(err); callback(err); return; }
        callback(null, docs);
    });
}

exports.byidpandclassroom = function(idp, domainid, callback) {
    statement.collection().count({ $and:[{ 'actor.account.name': idp }, { 'context.extensions.uoc:lrs:classroom:id': domainid }]}, function (err, docs) {
        if(err) { console.log(err); callback(err); return; }
        callback(null, docs);
    });
}

exports.byidpandactivity = function(idp, eventid, callback) {
    statement.collection().count({ $and:[{ 'actor.account.name': idp }, { 'context.extensions.uoc:lrs:activity:id': eventid }]}, function (err, docs) {
        if(err) { console.log(err); callback(err); return; }
        callback(null, docs);
    });
}

exports.byidpandtool = function(idp, resourceid, callback) {
    statement.collection().count({ $and:[{ 'actor.account.name': idp }, { 'object.definition.extensions.uoc:lrs:tool:id': resourceid }]}, function (err, docs) {
        if(err) { console.log(err); callback(err); return; }
        callback(null, docs);
    });
}

exports.generic = function(key, value, max, callback) {
    filter = {};
    filter[key] = value;
    statement.collection().find(filter, { limit: max }).toArray(function(err, docs) {
        if(err) { console.log(err); callback(err); return; }
        callback(null, docs);
    });
}
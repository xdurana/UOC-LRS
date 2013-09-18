var statement = require('./statement');

exports.byidp = function(idp, callback) {
    count({ 'actor.account.name': idp }, function (err, docs) {
        if(err) { console.log(err); callback(); return; }
        callback(null, docs);
    });    
}

exports.bysubject = function(domainid, callback) {
    count({ 'context.extensions.uoc:lrs:subject:id': domainid }, function (err, docs) {
        if(err) { console.log(err); callback(); return; }
        callback(null, docs);
    });
}

exports.byclassroom = function(domainid, callback) {
    count({ 'context.extensions.uoc:lrs:classroom:id': domainid }, function (err, docs) {
        if(err) { console.log(err); callback(); return; }
        callback(null, docs);
    });
}

exports.byactivity = function(eventid, callback) {
    count({ 'context.extensions.uoc:lrs:activity:id': eventid }, function (err, docs) {
        if(err) { console.log(err); callback(); return; }
        callback(null, docs);
    });
}

exports.bytool = function(resourceid, callback) {
    count({ 'object.definition.extensions.uoc:lrs:tool:id': resourceid }, function (err, docs) {
        if(err) { console.log(err); callback(); return; }
        callback(null, docs);
    });
}

exports.byidpandsubject = function(idp, domainid, callback) {
    count({ $and:[{ 'actor.account.name': idp }, { 'context.extensions.uoc:lrs:subject:id': domainid }]}, function (err, docs) {
        if(err) { console.log(err); callback(); return; }
        callback(null, docs);
    });
}

exports.byidpandclassroom = function(idp, domainid, callback) {
    count({ $and:[{ 'actor.account.name': idp }, { 'context.extensions.uoc:lrs:classroom:id': domainid }]}, function (err, docs) {
        if(err) { console.log(err); callback(); return; }
        callback(null, docs);
    });
}

exports.byidpandactivity = function(idp, eventid, callback) {
    count({ $and:[{ 'actor.account.name': idp }, { 'context.extensions.uoc:lrs:activity:id': eventid }]}, function (err, docs) {
        if(err) { console.log(err); callback(); return; }
        callback(null, docs);
    });
}

exports.byidpandtool = function(idp, resourceid, callback) {
    count({ $and:[{ 'actor.account.name': idp }, { 'object.definition.extensions.uoc:lrs:tool:id': resourceid }]}, function (err, docs) {
        if(err) { console.log(err); callback(); return; }
        callback(null, docs);
    });
}

exports.byidplast = function(idp, callback) {
    all({ 'actor.account.name': idp }, 1, function (err, docs) {
        if(err) { console.log(err); callback(); return; }
        callback(null, docs);
    });    
}

exports.byidpandsubjectlast = function(idp, domainid, callback) {
    all({ $and:[{ 'actor.account.name': idp }, { 'context.extensions.uoc:lrs:subject:id': domainid }]}, 1, function (err, docs) {
        if(err) { console.log(err); callback(); return; }
        callback(null, docs);
    });
}

exports.byidpandclassroomlast = function(idp, domainid, callback) {
    all({ $and:[{ 'actor.account.name': idp }, { 'context.extensions.uoc:lrs:classroom:id': domainid }]}, 1, function (err, docs) {
        if(err) { console.log(err); callback(); return; }
        callback(null, docs);
    });    
}

exports.byidpandactivitylast = function(idp, eventid, callback) {
    all({ $and:[{ 'actor.account.name': idp }, { 'context.extensions.uoc:lrs:activity:id': eventid }]}, 1, function (err, docs) {
        if(err) { console.log(err); callback(); return; }
        callback(null, docs);
    });
}

exports.byidpandtoollast = function(idp, resourceid, callback) {
    all({ $and:[{ 'actor.account.name': idp }, { 'object.definition.extensions.uoc:lrs:tool:id': resourceid }]}, 1, function (err, docs) {
        if(err) { console.log(err); callback(); return; }
        callback(null, docs);
    });
}

var all = function(conditions, max, callback) {
    try {
        statement.collection().find(conditions, { 'sort': [['timestamp','desc']], 'limit': max }).toArray(function(err, docs) {
            if(err) { console.log(err); callback(); return; }
            callback(null, docs);
        });
    } catch (e) {
        callback();
    }    
}

var count = function(conditions, callback) {
    try {
        statement.collection().count(conditions, function (err, docs) {
            if(err) { console.log(err); callback(); return; }
            callback(null, docs);
        });
    } catch (e) {
        callback();
    }
}

exports.all = all;
exports.count = count;
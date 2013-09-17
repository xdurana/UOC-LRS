var statement = require('./statement');

exports.byidp = function(idp, callback) {
    try {
        statement.collection().count({ 'actor.account.name': idp }, function (err, docs) {
            if(err) { console.log(err); callback(err); return; }
            callback(null, docs);
        });
    } catch (e) {
        callback();
    }
}

exports.byidplast = function(idp, callback) {
    try {
        statement.collection().find({ 'actor.account.name': idp }, { 'sort': [['_id','desc']], 'limit': 1 }).toArray(function(err, docs) {
            if(err) { console.log(err); callback(err); return; }
            callback(null, docs);
        });
    } catch (e) {
        callback();
    }
}

exports.bysubject = function(domainid, callback) {
    try {
        statement.collection().count({ 'context.extensions.uoc:lrs:subject:id': domainid }, function (err, docs) {
            if(err) { console.log(err); callback(err); return; }
            callback(null, docs);
        });
    } catch (e) {
        callback();
    }
}

exports.byclassroom = function(domainid, callback) {
    try {
        statement.collection().count({ 'context.extensions.uoc:lrs:classroom:id': domainid }, function (err, docs) {
            if(err) { console.log(err); callback(err); return; }
            callback(null, docs);
        });
    } catch (e) {
        callback();
    }
}

exports.byactivity = function(eventid, callback) {
    try {
        statement.collection().count({ 'context.extensions.uoc:lrs:activity:id': eventid }, function (err, docs) {
            if(err) { console.log(err); callback(err); return; }
            callback(null, docs);
        });
    } catch (e) {
        callback();
    }
}

exports.bytool = function(resourceid, callback) {
    try {
        statement.collection().count({ 'object.definition.extensions.uoc:lrs:tool:id': resourceid }, function (err, docs) {
            if(err) { console.log(err); callback(err); return; }
            callback(null, docs);
        });
    } catch (e) {
        callback();
    }
}

exports.byidpandsubject = function(idp, domainid, callback) {
    try {
        statement.collection().count({ $and:[{ 'actor.account.name': idp }, { 'context.extensions.uoc:lrs:subject:id': domainid }]}, function (err, docs) {
            if(err) { console.log(err); callback(err); return; }
            callback(null, docs);
        });
    } catch (e) {
        callback();
    }
}

exports.byidpandclassroom = function(idp, domainid, callback) {
    try {
        statement.collection().count({ $and:[{ 'actor.account.name': idp }, { 'context.extensions.uoc:lrs:classroom:id': domainid }]}, function (err, docs) {
            if(err) { console.log(err); callback(err); return; }
            callback(null, docs);
        });
    } catch (e) {
        callback();
    }
}

exports.byidpandactivity = function(idp, eventid, callback) {
    try {
        statement.collection().count({ $and:[{ 'actor.account.name': idp }, { 'context.extensions.uoc:lrs:activity:id': eventid }]}, function (err, docs) {
            if(err) { console.log(err); callback(err); return; }
            callback(null, docs);
        });
    } catch (e) {
        callback();
    }
}

exports.byidpandtool = function(idp, resourceid, callback) {
    try {
        statement.collection().count({ $and:[{ 'actor.account.name': idp }, { 'object.definition.extensions.uoc:lrs:tool:id': resourceid }]}, function (err, docs) {
            if(err) { console.log(err); callback(err); return; }
            callback(null, docs);
        });
    } catch (e) {
        callback();
    }
}

exports.byidpandsubjectlast = function(idp, domainid, callback) {
    try {
        statement.collection().find({ $and:[{ 'actor.account.name': idp }, { 'context.extensions.uoc:lrs:subject:id': domainid }]}, { 'sort': [['_id','desc']], 'limit': 1 }).toArray(function(err, docs) {
            if(err) { console.log(err); callback(err); return; }
            callback(null, docs);
        });
    } catch (e) {
        callback();
    }    
}

exports.byidpandclassroomlast = function(idp, domainid, callback) {
    try {
        statement.collection().find({ $and:[{ 'actor.account.name': idp }, { 'context.extensions.uoc:lrs:classroom:id': domainid }]}, { 'sort': [['_id','desc']], 'limit': 1 }).toArray(function(err, docs) {
            if(err) { console.log(err); callback(err); return; }
            callback(null, docs);
        });
    } catch (e) {
        callback();
    }
}

exports.byidpandactivitylast = function(idp, eventid, callback) {
    try {
        statement.collection().find({ $and:[{ 'actor.account.name': idp }, { 'context.extensions.uoc:lrs:activity:id': eventid }]}, { 'sort': [['_id','desc']], 'limit': 1 }).toArray(function(err, docs) {
            if(err) { console.log(err); callback(err); return; }
            callback(null, docs);
        });
    } catch (e) {
        callback();
    }
}

exports.byidpandtoollast = function(idp, resourceid, callback) {
    try {
        statement.collection().find({ $and:[{ 'actor.account.name': idp }, { 'object.definition.extensions.uoc:lrs:tool:id': resourceid }]}, { 'sort': [['_id','desc']], 'limit': 1 }).toArray(function(err, docs) {
            if(err) { console.log(err); callback(err); return; }
            callback(null, docs);
        });
    } catch (e) {
        callback();
    }    
}

exports.and = function(conditions, max, callback) {
    try {
        statement.collection().find(conditions, { 'sort': [['_id','desc']], 'limit': max }).toArray(function(err, docs) {
            if(err) { console.log(err); callback(err); return; }
            callback(null, docs);
        });
    } catch (e) {
        callback();
    }
}
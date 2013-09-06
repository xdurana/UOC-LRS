var mongo = require('mongodb');
var uuid = require('node-uuid');

var config = require('../config');

var statements;
var MongoClient = mongo.MongoClient;
MongoClient.connect(config.db(), function(err, db) {
    if (err) { console.log(err); }
    statements = db.collection('statements');
    guaita = db.collection('guaita');
});

exports.collection = function() {
    return statements;
}

exports.guaita = function() {
    return guaita;
}

exports.get = function(callback) {
    statements.find({}, {limit:20}).toArray(function(err, docs) {
        callback(null, docs);
    });
}

exports.delete = function(callback) {
    statements.remove({
        //"expire": {"$lte": Date.now()}
    }, function(err, removed) {
        callback(null, removed);
    });
}

exports.post = function(data, callback) {
    data.id = uuid.v1();
    data.stored = new Date().toJSON();
    statements.insert(data, function (err, docs) {
        if(err) { console.log(err); callback(err); return; }
        callback(null, docs);
    });
}

exports.put = function(statementId, data, callback) {
    data.id = statementId ? statementId : uuid.v1();
    data.stored = new Date().toJSON();
    statements.insert(data, function (err, docs) {
        if(err) { console.log(err); callback(err); return; }
        callback(null, docs);
    });
}
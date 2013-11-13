var mongo = require('mongodb');
var uuid = require('node-uuid');

var config = require('../config');

var statements;

exports.connect = function(callback) {
    var MongoClient = mongo.MongoClient;
    MongoClient.connect(config.db(), function(err, db) {
        if (err) { return callback(err); }
        db.createCollection('statements', function(err, collection) {
            if (err) { return callback(err); }
            statements = db.collection('statements');
            callback();
        });
    });    
}

exports.collection = function() {
    return statements;
}

exports.get = function(callback) {
    statements.find({}, { 'sort': [['stored','desc']], 'limit': '20' }).toArray(function(err, docs) {
        callback(null, docs);
    });
}

exports.post = function(data, callback) {
    data.id = uuid.v1();
    data.stored = new Date().toJSON();
    statements.insert(data, function (err, docs) {
        if(err) { console.log(err); callback(); return; }
        callback(null, docs);
    });
}

exports.put = function(statementId, data, callback) {
    data.id = statementId ? statementId : uuid.v1();
    data.stored = new Date().toJSON();
    statements.insert(data, function (err, docs) {
        if(err) { console.log(err); callback(); return; }
        callback(null, docs);
    });
}
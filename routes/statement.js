var mongo = require('mongodb');
var uuid = require('node-uuid');

var config = require('../config');

var statements;
var MongoClient = mongo.MongoClient;
MongoClient.connect(config.db(), function(err, db) {
    if (err) { console.log(err); }
    statements = db.collection('statements');
});

exports.get = function(req, res) {

	if (req.query.statementId) {
	  statements.find({"id": req.query.statementId}, {limit: 20}, function(err,docs) {
  		res.json(docs);
	 	});
	} else if (req.query.agent) {
		console.log(req.query.agent);
		//statements.find({"actor": {"account": {"name": "jsmithb"}}}, {limit:20}, function (err, docs) {
		statements.find({"actor": JSON.parse(req.query.agent)}, {limit:20}, function (err, docs) {
			res.json(docs);
		})
	} else {
		statements.find({}, {limit:20}, function (err, docs) {
			res.json(docs);
		})
	}
}

exports.test = function(callback) {
    statements.count({ 'context.extensions.uoc-lrs:classroom:domain:id': '382785' }, function (err, docs) {
        callback(null, { status: 'ok', statements: docs });
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
    console.log(statementId);
    data.stored = new Date().toJSON();
    statements.insert(data, function (err, docs) {
        if(err) { console.log(err); callback(err); return; }
        callback(null, docs);
    });
}
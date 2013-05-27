var mongo = require('mongodb');
var monk = require('monk');
var uuid = require('node-uuid');

var db = monk('localhost:27017/lrs');
var statements = db.get('statements');

exports.get = function(req, res) {
	if (req.query.statementId) {
	  statements.find({"id": req.query.statementId}, {limit: 20}, function(err,docs) {
  		res.json(docs);
	 	})
	} else {
		statements.find({}, {limit:20}, function (err, docs) {
			res.json(docs);
		})
	}
}

exports.post = function(req, res) {
	var item = req.body;
	item.id = uuid.v1();
	statements.insert(item, function (err, docs) {
	  if (err) {
	  	console.log(err.message);
	  	throw err;
	  }
	  res.json(docs);
	})
}
var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/test');
var experiences = db.get('experiences');

exports.all = function(req, res) {
	experiences.find({}, {limit:20}, function (e, docs) {
		res.json(docs)
	})
};

exports.one = function(req, res) {
  experiences.find({"actor.name": req.params.name}, {limit: 20}, function(e,docs) {
   	res.json(docs);
 	})
};

exports.insert = function(req, res) {
	experiences.insert(req.body, function (e, doc) {
	  res.send(req.body);
	});
};
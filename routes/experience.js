var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/lrs');
var experiences = db.get('experiences');

exports.all = function(req, res) {
	experiences.find({}, {limit:20}, function (err, docs) {
		res.json(docs)
	})
};

exports.user = function(req, res) {
  experiences.find({"actor.mbox": "mailto:" + req.params.username + "@uoc.edu"}, {limit: 20}, function(err,docs) {
   	res.json(docs);
 	})
};

exports.id = function(req, res) {
  experiences.find({"_id": req.params.id}, {limit: 20}, function(err,docs) {
   	res.json(docs);
 	})
};

exports.insert = function(req, res) {
	var item = req.body;
	experiences.insert(item, function (err, docs) {		
	  if (err) {
	  	console.log(err.message);
	  	throw err;
	  }
	  res.json(docs);
	});
};
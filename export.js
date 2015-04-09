var util = require("util");
var spawn = require('child_process').spawn;

var args = process.argv.slice(2);
var days = args[0];

var objectIdFromDate = function (date) {
	return Math.floor(date.getTime() / 1000).toString(16) + "0000000000000000";
};

var now = new Date();
now.setDate(now.getDate() - days);
var oid = objectIdFromDate(now);

console.log(oid);

var nconf = require('nconf');
nconf.argv().env().file({ file: process.env.NODE_CONFIG });

exports.get = function(param) {
	return nconf.get(param);
}

exports.port = function() {
	return process.env.PORT || 3000;
}

exports.db = function() {
    console.log(process.env.NODE_CONFIG);
	return process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || nconf.get('database:url') || 'http://localhost:28017/lrs';
}
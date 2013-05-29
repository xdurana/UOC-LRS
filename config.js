var nconf = require('nconf');
nconf.argv().env().file({ file: 'config_' + process.env.NODE_ENV + '.json' });

exports.get = function(param) {
	return nconf.get(param);
}

exports.port = function() {
	return process.env.PORT || nconf.get('http:port') || 3000;
}

exports.db = function() {
	return process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || nconf.get('database:url') || 'http://localhost:28017/lrs';
}
var nconf = require('nconf');
nconf.argv().env().file({ file: 'config_' + process.env.NODE_ENV + '.json' });

exports.get = function(param) {
	return nconf.get(param);
}
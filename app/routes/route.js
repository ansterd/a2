var index = require('./index');
var instance = require('./instance');
var resource = require('./resource');

var routing = function(app) {
	// index
		// !-- Debug -!
	// app.get('/', routes.index);
	app.get('/', index.debug);
	app.post('/login', index.login);
	app.get('/logout', index.logout);
	
	// instance
	app.get('/instances/region/:region', instance.readByRegion);
	app.get('/instances/service/:service', instance.readByService);
	app.get('/instance/:id', instance.readById);
	app.get('/resources/:metric/:instance/:time', resource.read);
};

module.exports = routing; 
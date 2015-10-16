'use strict';

var express     = require('express'),
    config      = require('./config/routes');

function RouteLoader(app) {
    var self = this;

    self.init = function(app) {

        self.api = express.Router();

        for (var i = 0; i < config.length; i++)
        {
            var controller = config[i];
            var controllerInstance = require('./controller/' + controller.name);

            self.resource(controller.name, controllerInstance);
            for (var actionName in controller.actions)
            {
                var action = controller.actions[actionName];
                self.route(action.verb, '/' + controller.name + action.route, controllerInstance[actionName]);
            }
        }
        app.use('/api', self.api);
    };

    self.route = function(verb, route, action) {
        console.log('[' + verb + '] :', route);
        self.api[verb](route, action);
    };

    self.resource = function(controllerName, controller) {
        var root = '/' + controllerName + '/';
        self.route('get', root, controller.get);
        self.route('post', root, controller.get);
    };

    self.init(app);
}

exports.load = RouteLoader;

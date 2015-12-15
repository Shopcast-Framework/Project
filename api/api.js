'use strict';

var express     = require('express'),
    routes      = require('./config/routes');

function RouteLoader(app) {
    var self = this;

    self.init = function(app) {

        self.api = express.Router();

        self.addRoutes('/', '/', routes);

        app.use('/api', self.api);
    };

    self.addRoutes = function(prefix, resourcePrefix, routes) {
        for (var i = 0; i < routes.length; i++) {
            var controller = routes[i];
            var controllerInst = require('./controller' + prefix + controller.name);

            self.resource(resourcePrefix, controller.name, controllerInst);
            self.addActions(controllerInst, prefix + controller.name, controller.actions);

            if (controller.sub) {
                var subResourcePrefix = prefix + controller.name + '/:' + controller.name + '_id/';
                self.addRoutes(prefix + controller.name + '/', subResourcePrefix, controller.sub);
            }

        }
    };

    self.addActions = function(controllerInst, prefix, actions) {
        for (var actionName in actions)
        {
            var action = actions[actionName];
            self.route(action.verb, prefix + action.route, controllerInst[actionName]);
        }

    };

    self.route = function(verb, route, action) {
        console.log('[' + verb + '] :', route);
        self.api[verb](route, action);
    };

    self.resource = function(prefix, controllerName, controller) {
        var root = prefix + controllerName;
        self.route('get', root, controller.get);
        self.route('post', root, controller.post);
    };

    self.init(app);
}

exports.load = RouteLoader;

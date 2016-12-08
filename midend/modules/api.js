'use strict';

var Express     = require('express'),
    Routes      = require(process.env.NODE_PATH + '/config/routes');

function RouteLoader(app) {

    var Middlewares = require(process.env.NODE_PATH + '/middlewares').load();
    Middlewares.useModules(app);
    var self = this;

    self.init = function(app) {
        self.api = Express.Router();

        self.createRoutes('/', '/', Routes);

        app.use('/cdn', Express.static('upload'))
        app.use('/api', self.api);
    };

    self.createRoutes = function(prefix, resourcePrefix, routes) {
        for (var i = 0; i < routes.length; i++) {
            var route = routes[i];
            var controllerInst = require(process.env.NODE_PATH + '/controller' + prefix + route.name);

            self.addActions(controllerInst, prefix + route.name, route.actions, route.middlewares);
            self.resource(resourcePrefix, route, controllerInst);

            if (route.sub) {
                var subResourcePrefix = prefix + route.name + '/:' + route.name + '_id/';
                self.createRoutes(prefix + route.name + '/', subResourcePrefix, route.sub);
            }
        }
    };

    self.addActions = function(controller, prefix, actions, middlewares) {
        for (var actionName in actions)
        {
            var action = actions[actionName];
            self.route(action.verb, prefix + action.route, controller, actionName, middlewares);
        }
    };

    self.route = function(verb, route, controller, action, middlewares) {
        if (controller[action] === undefined) {
            return ;
        }
        console.log('[' + verb + '] :', route);
        self.api[verb](route, Middlewares.load(action, middlewares), controller[action]);
    };

    self.resource = function(prefix, route, controller) {
        var root        = prefix + route.name,
            middlewares = route.middlewares,
            actions     = route.actions || {};

        if (!actions['get']) { self.route('get', root, controller, 'get', middlewares); }
        if (!actions['post']) { self.route('post', root, controller, 'post', middlewares); }
        if (!actions['get']) { self.route('get', root + '/:id', controller, 'getOne', middlewares); }
        if (!actions['put']) { self.route('put', root + '/:id', controller, 'put', middlewares); }
        if (!actions['delete']) { self.route('delete', root + '/:id', controller, 'delete', middlewares); }
    };

    self.init(app);
}

exports.load = RouteLoader;

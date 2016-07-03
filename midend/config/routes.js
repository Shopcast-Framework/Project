'use strict';

var Role = require(process.env.NODE_PATH + '/config/roles.json');

var Routes = [
    {
        name: 'monitor',
        actions: {
            'associate' : { verb: 'post', route: '/associate' },
            'option' : { verb: 'options', route: '/associate' }
        },
        middlewares: [
            {
                name:   'auth',
                param: {
                    roles: [Role.ADMIN, Role.USER]
                },
                only: ['get', 'getOne', 'post', 'put', 'delete']
            },
            {
                name:   'cross',
                only: ['option', 'associate']
            }
        ]
    },
    {
        name: 'group',
        middlewares: [
            {
                name:   'auth',
                param: {
                    roles: [Role.ADMIN, Role.USER]
                }
            }
        ]
    },
    {
        name: 'file',
        middlewares: [
            {
                name:   'auth',
                param: {
                    roles: [Role.ADMIN, Role.USER]
                }
            }
        ]
    },
    {
        name: 'planning',
        middlewares: [
            {
                name:   'auth',
                param: {
                    roles: [Role.ADMIN, Role.USER]
                }
            }
        ]
    },
    {
        name: 'music',
        actions: {
            'search' : { verb: 'get', route: '/search/:id' },
        },
        middlewares: [
            {
                name:   'auth',
                param: {
                    roles: [Role.ADMIN, Role.USER]
                }
            }
        ]
    },
    {
        name: 'playlist',
        actions: {
            'add' : { verb: 'post', route: '/:id/add' },
            'sort' : { verb: 'post', route: '/:id/sort' }
        },
        middlewares: [
            {
                name:'auth',
                param: {
                    roles: [Role.ADMIN, Role.USER]
                }
            }
        ]
    },
    {
        name: 'session',
        actions: {
            'option' : { verb: 'options', route: '/' }
        },
        middlewares: [
            {
                name:   'cross',
                only: ['option', 'post']
            }
        ]
    },
    {
        name: 'user',
        middlewares: [
            {
                name: 'auth',
                only: ['get', 'getOne'],
                param: {
                    roles: [Role.ADMIN, Role.USER]
                }
            }
        ],
        sub: [
            {
                name: 'friend',
                middlewares: [
                    {
                        name:   'auth',
                        param: {
                            roles: [Role.ADMIN, Role.USER]
                        }
                    }
                ]
            }
        ],
    }
];

module.exports = Routes;

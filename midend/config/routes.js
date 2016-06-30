'use strict';

var Role = require(process.env.NODE_PATH + '/config/roles.json');

var Routes = [
    {
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
        sub: [
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
            }
        ],
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
            'option' : { verb: 'options', route: '/' },
        },
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

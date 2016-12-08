'use strict';

var Role = require(process.env.NODE_PATH + '/config/roles.json');

var Routes = [
    {
        name: 'info'
    },
    {
        name: 'monitor',
        sub: [
            {
                name: 'playlist',
                only: ['get']
                    // middlewares: [
                    //     {
                    //         name:   'auth',
                    //         param: {
                    //             roles: [Role.ADMIN, Role.USER]
                    //         }
                    //     }
                    // ]
                },
        ],
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
                name: 'auth',
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
                name: 'auth',
                param: {
                    roles: [Role.ADMIN, Role.USER]
                }
            }
        ]
    },
    {
        name: 'music',
        actions: {
            'search': { verb: 'get', route: '/search/:id' },
        }
    },
    {
        name: 'playlist',
        actions: {
            'add' : { verb: 'post', route: '/:id/add' },
            'sub' : { verb: 'delete', route: '/:id/sub/:file_id' },
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
            'config' : { verb: 'get', route: '/config' },
            'option' : { verb: 'options', route: '/' },
            'delete' : { verb: 'delete', route: '/' }
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
        actions: {
            'reset' : { verb: 'put', route: '/reset_password' },
            'update' : { verb: 'post', route: '/reset_password' },
            'block' : { verb: 'put', route: '/block/:id' },
            'unblock' : { verb: 'put', route: '/unblock/:id' }
        },
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
            },
            {
                name: 'block',
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

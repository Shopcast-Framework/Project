'use strict';

var Routes = [
    {
        name: 'file',
        middlewares: ['auth']
    },
    {
        name: 'planning',
        middlewares: ['auth']
    },
    {
        name: 'music',
        actions: {
            'search' : { verb: 'get', route: '/search/:id' },
        }
    },
    {
        name: 'playlist',
        sub: [
            {
                name: 'file',
                middlewares: ['auth']
            }
        ],
        middlewares: ['auth']
    },
    {
        name: 'session',
        actions: {
            'option' : { verb: 'options', route: '/' },
        },
    },
    {
        name: 'user',
        middlewares: [{name: 'auth', only: ['get', 'getOne']}],
        sub: [
            {
                name: 'friend',
                middlewares: ['auth']
            }
        ]
    }
];

module.exports = Routes;

'use strict';

var Routes = [
    {
        name: 'file',
        middlewares: ['auth']
    },
    {
        name: 'music',
        actions: {
            'search' : { verb: 'get', route: '/search/:id' },
        },
        middlewares: ['auth']
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
        name: 'session'
    },
    {
        name: 'user',
        middlewares: [{name: 'auth', only: ['get', 'getOne']}]
    }
];

module.exports = Routes;

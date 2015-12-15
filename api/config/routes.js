'use strict';

var Routes = [
    {
        name: 'file'
    },
    {
        name: 'music',
        actions: {
            'search' : { verb: 'get', route: '/search/:id' }
        }
    },
    {
        name: 'playlist',
        sub: [
            {
                name: 'file'
            }
        ]
    },
    {
        name: 'session'
    },
    {
        name: 'user'
    }
];

module.exports = Routes;

'use strict';

var Routes = [
    {
        name: 'playlist'
    },
    {
        name: 'user'
    },
    {
        name: 'session'
    },
    {
        name: 'music',
        actions: {
            'search' : { verb: 'get', route: '/search/:id' }
        }
    }
];

module.exports = Routes;

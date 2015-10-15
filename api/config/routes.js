'use strict';

var Routes = [
    {
        name: 'playlist'
    },
    {
        name: 'music',
        actions: {
            'search' : { verb: 'get', route: '/search/:id' }
        }
    }
];

module.exports = Routes;

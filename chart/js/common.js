require.config({
    waitSeconds: 60,
    paths: {
        'App': 'index',

        //lib
        'd3': 'lib/d3-3.4.11',
        'nv': 'lib/nv-d3-1.1.15b',
        'Sugar': 'lib/sugar-1.4.1',

        //lib/require
        'json': 'lib/require/require-json-0.4.0',
        'text': 'lib/require/require-text-2.0.12'
    },
    shim: {
        'nv': {
            deps: ['d3'],
            exports: 'nv'
        }
    }
});

({
    appDir: '../',
    baseUrl: 'js',
    dir: '../build',
    keepBuildDir: false,
    mainConfigFile: 'common.js',
    preserveLicenseComments: true,
    optimize: 'uglify2',
    optimizeCss: 'standard',
    modules: [
        {
            name: 'common',
            include: []
        },
        {
            name: 'App',
            exclude: ['common']
        }
    ]
})

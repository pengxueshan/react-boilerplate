var argv = require('yargs').argv;

exports.getDefineVar = function(isProd) {
    var defaults = {
        ELECTRON: false,
        'process.env': {
            'NODE_ENV': isProd ? JSON.stringify('production') : JSON.stringify('development')
        }
    };
    for (let key in argv) {
        if (key.startsWith('D')) {
            defaults[key.substring(1)] = argv[key];
        }
    }
    return defaults;
};

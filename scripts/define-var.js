var argv = require('yargs').argv;

exports.getDefineVar = function() {
    var defaults = {
        ELECTRON: false,
    };
    for (let key in argv) {
        if (key.startsWith('D')) {
            defaults[key.substring(1)] = argv[key];
        }
    }
    return defaults;
};

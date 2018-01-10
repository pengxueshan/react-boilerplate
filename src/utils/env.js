let env = getUrlParams();
if (ELECTRON) {
    var remote = require('electron').remote;
    env = remote.getGlobal('process').env;
}

export {env};

var platform, os;
if (ELECTRON) {
    platform = 'electron';
    os = window.process.platform;
} else {
    platform = 'browser';
    os = 'browser';
}

export {platform};
export {os};

function getUrlParams() {
    var query = location.search,
        ret = {};
    if (query) {
        var parts = query.substring(1).split('&');
        parts.forEach(function (line) {
            var kv = line.split('=');
            ret[kv[0]] = kv[1] || null;
        });
    }
    return ret;
}

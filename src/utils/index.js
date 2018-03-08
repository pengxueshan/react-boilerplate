if (ELECTRON) {
    var remote = require('electron').remote;
}

export function getBinary(name = '') {
    if (ELECTRON) {
        const fs = require('fs');
        const path = require('path');
        // add exe extention on windows
        if (window.process.platform == 'win32') name += '.exe';
        var binDir = path.dirname(remote.app.getAppPath());
        var appPath = path.join(binDir, 'bin', name);
        if (!fs.existsSync(appPath)) {
            // run by `electron .`
            appPath = path.join(window.process.cwd(), 'bin', window.process.platform, name);
        }
        return appPath;
    } else {
        return '';
    }
}

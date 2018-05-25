const path = require('path');

module.exports = {
    //utils
    'codish/utils': path.resolve(process.cwd(), 'src/utils/index'),
    //components
    'codish/loader': path.resolve(process.cwd(), 'src/component/loader'),
    //css alias
    'codish/cssvar': path.resolve(process.cwd(), 'src/style/variable.css'),
}

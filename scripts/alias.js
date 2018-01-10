//为方便在plugins中使用src下的模块
//别名约定以'trader/'为前缀
const path = require('path');

module.exports = {
    //utils
    'trader/utils': 'utils/index',
    'trader/coreConst': 'utils/constants',
    'trader/pluginStore': 'utils/plugin-store',
    'trader/safeinput': 'utils/safeinput',
    //components
    'trader/loader': 'components/loader',
    //css alias
    'trader/coreCssVar': path.resolve(process.cwd(), 'src/style/variable.css'),
}

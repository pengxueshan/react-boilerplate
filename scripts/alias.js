//为方便在plugins中使用src下的模块
//别名约定以'trader/'为前缀
const path = require('path');

module.exports = {
    //utils
    'trader/utils': path.resolve(process.cwd(), 'src/utils/index'),
    'trader/coreConst': path.resolve(process.cwd(), 'src/utils/constants'),
    'trader/safeinput': path.resolve(process.cwd(), 'src/utils/safeinput'),
    'trader/codelist': path.resolve(process.cwd(), 'src/utils/codelist'),
    //components
    'trader/loader': path.resolve(process.cwd(), 'src/core/loader'),
    //css alias
    'trader/coreCssVar': path.resolve(process.cwd(), 'src/style/variable.css'),
}

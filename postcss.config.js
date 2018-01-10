const alias = require('./scripts/alias.js');

const keys = Object.keys(alias);
const importLoader = require('postcss-import')({
    resolve: (id) => {
        if (keys.includes(id)) return alias[id];
        return id;
    },
});

module.exports = {
    plugins: [
        importLoader,
        require('precss'),
        require('autoprefixer')
    ]
}

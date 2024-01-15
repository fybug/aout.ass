global.webpackmode = "prod"
const config = require('./webpack.conf.js');

module.exports = merge(config, {
    mode: "none",
    devtool: 'null'
});
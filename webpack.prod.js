global.webpackmode = "prod"
const config = require('./webpack.conf.js');

module.exports = merge(config, {
    mode: "none",
    // 代码压缩插件
    optimization: {minimize: true},
    devtool: 'null',
    plugins: [
        new webpack.DefinePlugin({'process.env.NODE_ENV': JSON.stringify('production')})
    ]
});
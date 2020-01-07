const config = require('./webpack.conf.js');

const Devtool = Conf.devtool;
module.exports = merge(config, {
    output: {filename: Devtool.outName || Conf.outName || "[name][hash].js"},
    devtool: 'source-map', mode: "development",
    devServer: {
        contentBase: Devtool.contentBase || './build',
        port: Devtool.port || 3000,
        host: Devtool.host || "localhost"
    }
});
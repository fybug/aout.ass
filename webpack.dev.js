const merge = require('webpack-merge');
const co = require('./webpack.conf.js');

module.exports = merge(co(), {
    devtool: '#eval-source-map', mode: "",
    devServer: {
        contentBase: './build/',
        port: 3000
    }
});
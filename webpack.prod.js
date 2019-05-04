const merge = require('webpack-merge');
const webpack = require('webpack');
const co = require('./webpack.conf.js');

module.exports = merge(co(), {
    mode: "none",
    optimization: {minimize: true},
    devtool: 'null',
    plugins: [
        new webpack.DefinePlugin({'process.env.NODE_ENV': JSON.stringify('production')})
    ]
});
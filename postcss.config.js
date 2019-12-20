const autoprefixer = require("autoprefixer");
const atimport = require("postcss-import");
const cssnanao = require("cssnano");
const apply = require('postcss-apply');
const nested = require('postcss-nested');

module.exports = {
    plugins: [
        atimport,
        apply, nested,
        autoprefixer({
            overrideBrowserslist: ['> 0.15% in CN']
        }),
        cssnanao
    ]
};
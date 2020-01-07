/** Html 配置模版 */
global.htmlConfTmp = {
    meta: {
        "viewport": "width=device-width, initial-scale=1, shrink-to-fit=n",
        "x-ua-compatible": "ie=edge"
    },
    /** 代码压缩配置 */
    minify: {
        caseSensitive: true,
        collapseBooleanAttributes: true,
        removeComments: true,
        minifyCSS: true,
        minifyJS: true,
        minifyURLs: true,
        removeAttributeQuotes: true,
        removeEmptyAttributes: true, removeRedundantAttributes: true,
        processConditionalComments: true, trimCustomFragments: true,
        collapseWhitespace: true
    }
};
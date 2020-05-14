/**
 * @author fybug
 * @version 0.0.1
 * @since PDWebpack 0.0.1
 *
 * @return {{meta:Object,cache:boolean,minify:Object}}
 */
module.exports = () => {
    return {
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
        }, cache: false
    }
};
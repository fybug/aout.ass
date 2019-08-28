/** 生成页面头数据
 *
 * @param {string} name 页面名称
 * @param {Object} option 页面配置
 */
global.getHtmlmeta = (name, option) => {
    return {
        "viewport": "width=device-width, initial-scale=1, shrink-to-fit=n",
        "x-ua-compatible": "ie=edge"
    }
};

/** 生成 html 配置
 *
 * @param {string} name 页面名称
 * @param {Object} option 页面配置
 */
global.getHtmltmp = (name, option) => {
    return {
        // 头部 meta 数据
        meta: getHtmlmeta(name, option),

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
        },
        inject: "head",

        // 图标
        favicon: iconPath,

        // 输出路径
        filename: option.outfile,
        // 输入路径
        template: option.filename,
        // 导入模块
        chunks: option.chunks,
        // 标题
        title: option.title
    };
};
// html 配置模版
global.htmltmp = () => {
    return {
        // 头部 meta 数据
        meta: {
            "viewport": "width=device-width, initial-scale=1, shrink-to-fit=n",
            "x-ua-compatible": "ie=edge"
        },
        // 压缩
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
        filename: undefined,
        template: undefined,
        favicon: iconPath,
        chunks: undefined,
        title: ""
    };
};
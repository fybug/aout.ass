global.outPath = path.resolve(__dirname, '../../build');
global.inPath = path.resolve(__dirname, '../../src/page');
global.icon = './src/static/img/favicon.png';
/** 配置文件 */
global.config = {
    // 入口
    entry: {},
    output: {
        // 整合后的 js 文件名跟随模块名
        filename: '[name].js',
        // 输出路径
        path: outPath
    },

    // 导入包
    module: {
        rules: [{
            test: /\.(css|pcss)$/,
            loader: 'style-loader?sourceMap!css-loader?sourceMap!postcss-loader?sourceMap',
        }, {
            test: /\.scss/,
            use: [{
                loader: 'style-loader'
            }, {
                loader: 'css-loader'
            }, {
                loader: 'sass-loader'
            }]
        },
            // 静态资源
            {
                test: /\.(gif|png|jpe?g|woff.?|svg|ttf|eot|otf)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 81920,
                        outputPath: 'static/img/',
                        name: '[name].[ext]'
                    }
                }, {loader: 'img-loader'}]
            },
            // json
            {
                test: /\.json,\.txt$/,
                loader: 'file-loader',
            },
            // 页面
            {
                test: /\.(html)$/,
                use: {
                    loader: 'html-withimg-loader',
                    options: {
                        attrs: ['img:src', 'img:data-src', 'audio:src', 'link:href'],
                        minimize: true
                    }
                }
            }]
    },
    // 插件
    plugins: [
        // 清理输出
        new cleanWebpackPlugin({dry: 'test'}),
        new webpack.ProvidePlugin({_: 'lodash'}),

        new HtmlWebpackPlugin({
            title: "302 Found",
            meta: {
                "viewport": "width=device-width, initial-scale=1, shrink-to-fit=n",
                "x-ua-compatible": "ie=edge"
            },
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
            filename: outPath + '/index.html',
            template: inPath + '/../index.html',
            favicon: icon,
            chunks: []
        })
    ], performance: {
        hints: false
    }
};
// 公共模块顺序列表
global.chunks = [];
// html 加载配置模版
global.htmltmp = {
    title: undefined,
    meta: {
        "viewport": "width=device-width, initial-scale=1, shrink-to-fit=n",
        "x-ua-compatible": "ie=edge"
    },
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
    favicon: icon,
    chunks: []
};
// html 配置队列
global.htmlQuery = [];

// js 加载模式表
global.ScriptExtHtmlWebpackPluginConif = {
    sync: [],
    defer: [],
    async: []
};

require("./funcation.js");
addEntry_defer("app", "./src/lib/js/main.js");
addEntry_async("main_css", "./src/lib/js/style.js");

/* 填充配置数据 */
for (let i = 0, len = htmlQuery.length, tmp; i < len; i++) {
    tmp = htmlQuery[i]; // 缓存

    tmp.chunks = Object.assign(chunks).push(tmp.chunks);
    config.plugins.push(new HtmlWebpackPlugin(tmp));
}

config.plugins.push(new ScriptExtHtmlWebpackPlugin(ScriptExtHtmlWebpackPluginConif));
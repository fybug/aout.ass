// 导入路径配置
require('../config/pathconf.js');

/** 配置存放对象 */
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
        rules: [
            // css 和 postcss 的加载处理
            {
                test: /\.(css|pcss)$/,
                loader: 'style-loader?sourceMap!css-loader?sourceMap!postcss-loader?sourceMap',
            },
            // 静态资源
            {
                test: /\.(gif|png|jpe?g|woff.?|svg|ttf|eot|otf)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        // 小于 8k 全部压缩
                        limit: 81920,
                        outputPath: 'static/',
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
        // jQ 导入
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        }),
        // 清理输出
        new CleanWebpackPlugin({dry: true, protectWebpackAssets: false}),
        new webpack.ProvidePlugin({_: 'lodash'}),

        // 入口
        new HtmlWebpackPlugin({
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
            filename: outPath + 'index.html',
            template: pagePath + '../index.html',
            favicon: iconPath,
            chunks: []
        })
    ], performance: {hints: false}
};

// 公共模块列表
global.chunks = [];

// html 配置队列
global.htmlQuery = [];

// js 加载模式表
global.ScriptExtHtmlWebpackPluginConif = {
    // 同步加载
    sync: [],
    // 延迟加载
    defer: [],
    // 异步加载
    async: []
};

// 载入函数库
require("./funcation.js");

/* 导入默认公共模块 */
addEntry_defer("app", "./src/lib/js/main.js");
addEntry_async("app_css", "./src/lib/js/style.js");

// 用户的配置
require("../run.js");

/* 填充配置数据 */
for (let tmp of htmlQuery) {
    tmp.chunks = [...chunks, ...tmp.chunks];
    config.plugins.push(new HtmlWebpackPlugin(tmp));
}

// 载入 js 加载模式
config.plugins.push(new ScriptExtHtmlWebpackPlugin(ScriptExtHtmlWebpackPluginConif));
/** 编译输出路径 */
global.outPath = path.resolve(__dirname, '../../build/');
/** 页面模块路径 */
global.pagePath = path.resolve(__dirname, '../../src/page/');
/** 外置模块路径 */
global.jsINCLPath = path.resolve(__dirname, '../../src/lib/js/INCL/');
/** 静态资源路径 */
global.staticPath = path.resolve(__dirname, '../../src/static/');
/** 全局图标路径 */
global.iconPath = staticPath + 'img/favicon.png';

/** 配置对象 */
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
            template: pagePath + '/../index.html',
            favicon: iconPath,
            chunks: []
        })
    ], performance: {hints: false}
};

// 公共模块列表
global.chunks = [];
require('./htmltmp.js');
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
addEntry_async("app_css", "./src/lib/js/style.js");

/* 填充配置数据 */
for (let i = 0, len = htmlQuery.length, tmp; i < len; i++) {
    tmp = htmlQuery[i]; // 缓存

    let arrtmp = [];
    for (let i in chunks) arrtmp.push(chunks[i]);

    for (let i in tmp.chunks) arrtmp.push(tmp.chunks[i]);
    tmp.chunks = arrtmp;

    config.plugins.push(new HtmlWebpackPlugin(tmp));
}

config.plugins.push(new ScriptExtHtmlWebpackPlugin(ScriptExtHtmlWebpackPluginConif));
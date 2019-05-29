/*
npm install webpack webpack-cli webpack-dev-server -g

npm install webpack webpack-merge webpack-cli node-sass clean-webpack-plugin html-webpack-plugin style-loader css-loader sass-loader url-loader img-loader file-loader html-withimg-loader image-webpack-loader postcss-loader --save-dev
*/
module.exports = () => {
    const cleanWebpackPlugin = require('clean-webpack-plugin');
    const path = require('path');
    const webpack = require('webpack');
    const HtmlWebpackPlugin = require('html-webpack-plugin');
// ----------------------------------------------------------------
    /** 输出 */
    let out = {
        filename: '[name].js',
        path: path.resolve(__dirname, 'build')
    };
    /** 配置文件 */
    var config = {
        // 入口
        entry: {
            app: './src/lib/js/main.js',
            // todo 公共模块
        },
        output: out,

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
                            limit: 819200,
                            outputPath: 'static/img/',
                            name: '[name].[ext]'
                        }
                    }, {loader: 'img-loader'}]
                },
                // json
                {
                    test: /\.json$/,
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
        plugins: [
            // 清理输出
            new cleanWebpackPlugin({dry: 'test'}),
            new webpack.ProvidePlugin({_: 'lodash'}),
            new HtmlWebpackPlugin({
                minify: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                filename: out.path + '/index.html',
                template: './src/index.html',
                chunks: []
            })
        ], performance: {
            hints: false
        }
    };

    /** 添加入口 */
    function addEntry(mode, file) {
        config.entry[mode] = './src/' + file;
    }

// ------------------------------------------------------------------
// 全局 html 导入模块
    let chunks = ['app'];
// html 配置模版
    const htmlout = {
        filename: out.path + '/',
        template: './src/', inject: 'head', minify: {
            removeComments: true,
            collapseWhitespace: true
        }
    };

    /** 添加 html 导入配置*/
    function addHtml(htmlname, tmpname) {
        let html = {
            filename: Object.assign(htmlout.filename),
            template: Object.assign(htmlout.template),
            inject: htmlout.inject,
            minify: htmlout.minify
        };
        html.filename = html.filename + htmlname;
        html.template = html.template + tmpname;
        return html;
    }

    /** 添加页面导入配置 */
    function addPage(htmlname, chunk = []) {
        let html = addHtml(htmlname + '.html', 'page/' + htmlname + '/index.html');
        let chuncks = [];

        for (let i = 0; i < chunks.length; i++)
            chuncks.push(chunks[i]);
        for (let i = 0; i < chunk.length; i++)
            chuncks.push(chunk[i]);

        html.chunks = chuncks;
        return html;
    }

    /** 添加 html 配置 */
    function addHtmlWebpackPlugin(htmlname, chunk = []) {
        chunk.push(htmlname);
        config.plugins.push(new HtmlWebpackPlugin(addPage(htmlname, chunk)));
        addEntry(htmlname, 'page/' + htmlname + '/js/main.js');
    }

// -------------------------------------------------------------------
    /* todo 这里进行配置页面模块 */
    // 导入 dome 页面
    addHtmlWebpackPlugin('dome');

    return config;
};
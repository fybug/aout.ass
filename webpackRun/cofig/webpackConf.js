global.WebpackConf = {
    /** 输出配置 */
    output: {
        /** 输出的文件名 */
        filename: GetOutName('js', "[id][name][hash].js"),
        /** 输出路径 */
        path: OutPath,
        /** url 替换 */
        publicPath: CheckUrlOf('js')
    },
    /**
     * 忽略打包
     */
    externals: {},
    /** 路径补全 */
    resolve: {
        extensions: ['.js', '.jsx']
    },
    module: {
        /** 文件加载规则 */
        rules: [
            // css 和 postcss 的加载处理
            {
                test: /\.(c|pc)ss$/,
                use: [{
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                        publicPath: CheckUrlOf('css')
                    }
                }, 'css-loader?sourceMap', 'postcss-loader?sourceMap']
            },
            // js 的加载处理
            {
                test: /\.js?x$/,
                loader: 'babel-loader?cacheDirectory',
                exclude: /node_modules//*,
                    query: {
                        presets: [
                            require.resolve('babel-preset-es2015'),
                            require.resolve('babel-preset-react'),
                        ]
                    }*/
            },
            // 图片
            {
                test: /\.(gif|png|jpe?g|svg|webp)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        // 小于 8k 全部压缩
                        limit: 8192,
                        name: GetOutName('img', 'static/[name][hash].[ext]'),
                        publicPath: CheckUrlOf('img')
                    }
                }, {
                    loader: 'image-webpack-loader',
                    options: {
                        progressive: true,
                        optimizationLevel: 7,
                        interlaced: false,
                        // jpeg / jpg
                        mozjpoeg: {quality: 70},
                        // png
                        pngquant: {quality: "65-90", speed: 4},
                        // gif
                        gifsicle: {interlaced: false},
                        // webp
                        webp: {quality: 75}
                    }
                }]
            },
            // 字体
            {
                test: /\.(ttf|eot|woff.?|otf)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 8192,
                        name: GetOutName('font', 'static/[name].[ext]'),
                        publicPath: CheckUrlOf('font')
                    }
                }
            },
            // 序列化的对象
            {
                test: /\.(json|txt|xml)$/,
                loader: 'file-loader',
            },
            // html
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
    /** 插件 */
    plugins: [
        // 清理输出
        new CleanWebpackPlugin({dry: false, protectWebpackAssets: true}),
        new webpack.ProvidePlugin({_: 'lodash'}),

        // css 文件抽离插件
        new MiniCssExtractPlugin({
            filename: GetOutName('css', '[name][hash].css'),
        }),
    ], performance: {hints: false}
};
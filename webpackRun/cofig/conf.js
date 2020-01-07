global.Conf = {
    /**  */
    configload: ['ModeLoad', 'PageLoad'],
    Out: {urlOf: './'},
    /** 模块输出配置 */
    jsOut: {
        /** 编译资源后的替换的 url 地址
         *
         * to output.publicPath
         */
        urlOf: './',
        /** 模块输出的名称 */
        outName: '[id][name][hash].js'
    },
    /** css 输出配置 */
    cssOut: {
        urlOf: './',
        outName: '[name][hash].css'
    },
    /** 字体文件输出配置 */
    fontOut: {
        urlOf: './',
        outName: 'static/[name].[ext]'
    },
    /** 图片输出配置 */
    imgOut: {
        urlOf: './',
        outName: 'static/[name][hash].[ext]'
    },
    /** 开发者模式下的专属配置 */
    devtool: {
        /** 测试服务器端口 */
        port: 3000,
        /** 测试服务器访问地址 */
        host: "localhost",
        /** 测试状态模块输出名称 */
        outName: '[name][hash].js',
        /** 测试过程存放路径 */
        contentBase: './build'
    }
};
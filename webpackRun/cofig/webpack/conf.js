/** webpack 配置模版
 *
 * 该配置作为后续处理时的基础对象进行<br>
 * 后续处理时在此对象上追加或修改配置内容
 *
 * @author fybug
 * @version 0.0.1
 * @since PDWebpack 0.0.1
 */
global.WebpackConf = () => {
    // 实例化框架配置读取工具
    let confget = new ConfToWebpack(Conf);

    return {
        /** 输出配置 */
        output: {
            /** 输出的文件名 */
            filename: confget.GetOutName('js', "script/[id][name][chunkhash:8].js"),
            /** 输出路径 */
            path: OutPath,
            /** url 替换 */
            publicPath: confget.GlobalUrlOf()
        },
        /** 脱离的第三方库 */
        externals: require('./externals')(confget, Conf),
        resolve: require('./resolve')(confget, Conf),
        module: {
            /** 文件加载规则 */
            rules: require('./rules')(confget, Conf)
        },
        /** 插件 */
        plugins: require('./plugins')(confget, Conf),
        performance: {hints: false}
    }
};
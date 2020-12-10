/** webpack 插件配置对象
 *
 * 作为对应 webpack 模块 的配置模版存储对象。配置模版也叫 基础配置<br/>
 * 在使用的时候会 克隆 基础配置对象，并追加或修改配置项
 *
 * @author fybug
 * @version 0.0.1
 * @since PDWebpack 0.0.1
 * @class WebPackPlugins
 */
global.WebPackPlugins = {
    /** HtmlWebpackPlugin 基础基础
     *
     * @class HtmlWebpackPlugin
     * @constructs
     */
    HtmlWebpackPlugin: require('./HtmlWebpackPlugin'),
    /** ScriptExtHtmlWebpackPlugin 基础配置对象
     *
     * @class ScriptExtHtmlWebpackPlugin
     * @constructs
     */
    ScriptExtHtmlWebpackPlugin: require('./ScriptExtHtmlWebpackPlugin')
};
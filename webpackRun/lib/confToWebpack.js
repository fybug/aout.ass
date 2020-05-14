/** 框架配置转 webpack 配置工具
 *
 * 读取对应的框架配置的配置项
 *
 * @author fybug
 * @version 0.0.1
 * @since PDWebpack 0.0.1
 *
 * @class ConfToWebpack
 */
class ConfToWebpack {
    /** 框架配置对象
     *
     * @type {Conf}
     */
    CONF;

    /** 初始化时需加入当前使用的框架配置对象
     *
     * @param {Conf} conf 当前框架配置
     */
    constructor(conf) {
        this.CONF = conf;
    }

    /** 获取对应的输出命名
     *
     * 获取 [name]Out.outName 配置项
     *
     * @param {string} name 获取的类型
     * @param {string} defa 默认值
     *
     * @return {string} 当前使用的配置项
     */
    GetOutName(name, defa) {
        return this.__g(name + 'Out', 'outName') || defa;
    }

    /** 获取全局替换 url
     *
     * @param {string} defa 默认配置项
     *
     * @return {string} 配置数据
     */
    GlobalUrlOf(defa = '') {
        return this.__g('Out', 'urlOf') || defa;
    }

    /** 获取对应配置的替换 url
     *
     * @param {string} name 获取的类型
     * @param {string} defa 默认值
     *
     * @return {string} 当前使用的配置项
     */
    GetUrlOf(name, defa = './') {
        return this.__g(name + 'Out', 'urlOf')
            || this.__g('Out', 'urlOf') || defa;
    };

    __g(name, key) {
        let out = this.CONF[name];

        if (out && out[key])
            return out[key];

        return false;
    }
}

/** @type ConfToWebpack */
global.ConfToWebpack = ConfToWebpack;
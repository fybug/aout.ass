/** 匿名 js 处理模块
 *
 * 与 {@link ModeLoad} 一致，区别在于 {@link publicMode} 和 {@link addMode} 方法第一个参数被移除
 * 名称使用随机数代替
 *
 * 不可与 {@link ModeLoad} 同时使用
 *
 * @author fybug
 * @class AnonymousLoad
 * @extends ModeLoad
 * @version 0.0.1
 * @since PDWebpack 0.0.1
 */
class AnonymousLoad extends ModeLoad {
    /** 当前名称
     *
     * @type number
     */
    nowName = 0;

    /** 分配随机名称
     *
     * @return {string} 名称
     */
    __AssignedName() {
        let array = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
        let n = Math.round(Math.random() * (array.length - 1));

        return array[n] + this.nowName++ + (Math.round(Math.random() * 9));
    }

    /** 添加模块
     *
     * @param {string} paths 模块路径
     * @param {'sync'|'defer'|'async'} mode 加载模式 {@see #setModeLoads}
     *
     * @return this
     */
    addMode(paths = '', mode = 'sync') {
        super.addMode(this.__AssignedName(), paths, mode)
        return this;
    };

    /** 加入公共模块
     *
     * @param {string} paths 模块路径
     * @param {'sync'|'defer'|'async'} mode 加载模式 {@see #setModeLoads}
     *
     * @return this
     */
    publicMode(paths = '', mode = 'sync') {
        super.publicMode(this.__AssignedName(), paths, mode);
        return this;
    };

    /** 加载到配置处理对象中
     *
     * @param {ConfigLoad.configConllcation} config 配置处理对象
     *
     * @return {ConfigLoad.configConllcation} 配置处理对象
     */
    __loadToConfig(config) {
        config["ModeLoad"] = this;
        config["AnonymousLoad"] = this;
        return config;
    };
}

/** @type AnonymousLoad */
global.AnonymousLoad = AnonymousLoad;
/** 配置加载模块
 *
 * 使用该模块可以快速加入需要的 webpack 配置
 *
 * ```javascript 1.6
 * 示例
 * {
 *      // 传入基础 webpack 配置
 *      let confload = new ConfigLoad({});
 *
 *      // 启动加载，使用 js 加载模块
 *      confload.runOf('ModeLoad',
 *      (modeload) => modeload.publicMode('main', '/src/main.js'))
 *      // 继续处理
 *      .then((modeload) => {
 *             modeload.addMode('index_main', '/src/index/main.js');
 *             // 下一个处理页面加载模块
 *             return 'PageLoad';
 *         })
 *      // 处理页面加载模块
 *      .then((pageload) => {
 *             pageload.addPage("/src/index/index.html", 'index', ['index_main']);
 *         })
 *
 *      // 填充到 webpack 的配置中
 *      .__toConf();
 *  }
 *  ```
 *
 * @author fybug
 * @version 0.0.1
 * @since PDWebpack 0.0.1
 */
class ConfigLoad {
    /** 全局加载模块映射
     *
     * @type {{
     *     main:WebpackConf
     * }}
     */
    configConllcation = {};
    /** 模块处理队列
     *
     * @type ['ModeLoad'|'PageLoad'|'AnonymousLoad']
     */
    configModeQuery = [];
    /** 上一次运行的对象
     *
     * @type ModeLoad|PageLoad|AnonymousLoad
     */
    lastRun = undefined;

    /** 构造对象
     *
     * @param {WebpackConf} conf 基础配置对象
     */
    constructor(conf) {
        // 放入基础配置的对象
        this.configConllcation.main = conf;
        // 填充加载队列
        this.configModeQuery = [...Conf.configload];
        // 生成模块映射
        this.configModeQuery.forEach((v) => {
            this.configConllcation = new global[v]()
                .__loadToConfig(this.configConllcation);
        });
    }

    /** 启动处理
     *
     * @param {string} name 第一次处理的模块
     * @param {function(
     *     (ModeLoad|PageLoad|AnonymousLoad),WebpackConf,{
     *         main:WebpackConf
     *     },['ModeLoad'|'PageLoad'|'AnonymousLoad']
     *  ):('ModeLoad'|'PageLoad'|'AnonymousLoad')} fun 处理回调，参数传入: 处理的模块，构造时的基础配置对象，模块加载映射，模块加载队列
     *
     * @return this
     */
    runOf(name = '', fun) {
        if (name === '') return this;
        this.lastRun = this.configConllcation[name];
        return this.then(fun);
    }

    /** 继续处理
     *
     * @param {function(
     *     (ModeLoad|PageLoad|AnonymousLoad),WebpackConf,{
     *         main:WebpackConf
     *     },['ModeLoad'|'PageLoad'|'AnonymousLoad']
     *  ):('ModeLoad'|'PageLoad'|'AnonymousLoad')} fun 处理回调，参数传入: 处理的模块，构造时的基础配置对象，模块加载映射，模块加载队列
     *
     * @return this
     */
    then(fun) {
        // 运行模块接口
        let next = fun(this.lastRun, this.configConllcation.main, this.configConllcation, this.configModeQuery);
        // 取出下一个接口
        (typeof next === "string") &&
        (this.lastRun = this.configConllcation[next]);

        return this;
    };

    /** 填充生成的配置到基础配置对象中
     *
     * @return {WebpackConf} 生成的 webpack 配置对象
     */
    __toConf() {
        this.configModeQuery.forEach((v) => {
            // 获取模块
            v = this.configConllcation[v];
            // 加载模块中的配置
            this.configConllcation = v.__toConfig(this.configConllcation);
        });

        return this.configConllcation.main;
    }
}

/** @type ConfigLoad */
global.ConfigLoad = ConfigLoad;
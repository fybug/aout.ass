global.ModeLoad = class ModeLoad {
    /** 模块加载模式 */
    loadMode = {};
    /** 模块路径映射 */
    entry = {};
    /** 公共模块 */
    publicentry = [];
    /** 固定导入的模块 */
    providePlugin = {};

    /** 添加模块
     *
     * @param {string} name 模块名称 | 模块路径
     * @param {string} paths 模块路径
     * @param {'sync'|'defer'|'async'} mode 加载模式 {@see #setModeLoads}
     *
     * @return this
     */
    addMode(name, paths = '', mode = 'sync') {
        if (paths === '') {
            paths = name;
            name = path.parse(paths).name;
        }

        this.entry[name] = paths;
        this.setModeLoads(name, mode);

        return this;
    };

    /** 加入公共模块
     * @param {string} name 模块名称
     * @param {string} paths 模块路径
     * @param {'sync'|'defer'|'async'} mode 加载模式 {@see #setModeLoads}
     *
     * @return this
     */
    publicMode(name, paths = '', mode = 'sync') {
        if (paths === '') {
            paths = name;
            name = path.parse(paths).name;
        }
        this.publicentry.push(name);

        return this.addMode(name, paths, mode);
    };

    /** 设置模块的加载模式
     *
     * @param {string} name 模块名称
     * @param {'sync'|'defer'|'async'} mode 加载模式: 同步，延迟，异步
     *
     * @return this
     */
    setModeLoads(name, mode = 'sync') {
        this.loadMode[name] = mode;
        return this;
    };

    /** 导入固定模块
     * @param {string} modename 导入后的全局变量名称
     * @param {string} paths 模块路径
     *
     * @return this
     */
    fixedMode(modename, paths) {
        this.providePlugin[modename] = paths;
        return this;
    };

    /** 加载到配置处理对象中
     * @param config 配置处理对象
     * @return 配置处理对象
     */
    __loadToConfig(config) {
        config.ModeLoad = this;
        return config;
    };

    /** 转化到配置中
     * @param config 配置处理对象
     * @return 配置处理对象
     */
    __toConfig(config) {
        let conf = config.main;
        // 加载模块入口
        conf.entry = this.entry;

        /* 加载模块加载模式配置 */
        let modeload = {sync: [], defer: [], async: []};
        for (let n in this.loadMode)
            modeload[this.loadMode[n]].push(n);

        // 模块加载方式
        conf.plugins.push(new ScriptExtHtmlWebpackPlugin(modeload, HtmlWebpackPlugin));

        // 固定导入的模块
        conf.plugins.push(new webpack.ProvidePlugin(this.providePlugin));

        config.main = conf;
        return config;
    }
};
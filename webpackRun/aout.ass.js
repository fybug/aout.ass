/** 框架控制主类
 *
 * 通过该类修改自动加载的模块
 *
 * 或通过该类手动加载文件
 *
 * @author fybug
 * @class Aout_Ass
 * @version 0.0.1
 * @since Aout.ass 0.0.1
 */
class Aout_Ass {
    /** 运行列表
     *
     * @var {{
     *     call:'ModeLoad'|'PageLoad'|'AnonymousLoad',
     *     fun:function
     * }[]}
     */
    runlist = [{
        "call": "ModeLoad",
        "fun": /** 加载注册的模块
         * @param {ModeLoad} modeload 模块加载
         */(modeload) => {
            for (let i = 0, len = this.__modeload.length, value = undefined; i < len; i++) {
                value = this.__modeload[i];
                let callname = "add";
                if (value.public)
                    callname = 'public';
                modeload[callname + "Mode"](value.name, value.path, value.mode);

                value = this.__modeload[i] = undefined;
            }
            this.__modeload = undefined;
        }
    }, {
        "call": "PageLoad",
        "fun": /** 加载注册的页面
         * @param {PageLoad} pageload 页面加载
         */(pageload) => {
            for (let i = 0, len = this.__pageload.length, value = undefined; i < len; i++) {
                value = this.__pageload[i];
                pageload.addPage(value.name, value.path, value.chunk, value.extent, value.options);
                value = this.__pageload[i] = undefined;
            }
            this.__pageload = undefined;
        }
    }];
    /** 上一次运行
     *
     * @var string
     */
    lastrun = "ModeLoad";
    /** 配置加载对象
     *
     * @var {ConfigLoad}
     */
    confload;

    /** 初始化配置加载对象
     *
     * @param {ConfigLoad} confload 配置加载对象
     */
    constructor(confload) {
        this.confload = confload.runOf("ModeLoad", () => "ModeLoad");
    }

    /** 申请加载模块使用
     *
     * @param {string} modename 申请的模块名
     * @param {function} fun 处理方法
     *
     * @return this
     */
    apply(modename, fun) {
        this.runlist.push({"call": modename, "fun": fun});
        return this;
    }

    /** 追加加载回调
     *
     * 加载回调在原框架 PDWebpack 的 {ConfigLoad} 上使用
     *
     * @param {runlist} fun 资源运行对象列表
     *
     * @return this
     */
    add(fun) {
        this.runlist.push(...fun);
        return this;
    }

    /** 启动加载 */
    run() {
        for (let i = 0, da = undefined; i < this.runlist.length; i++) {
            da = this.runlist[i];

            // 检查是否运行同一个模块
            if (da.call === this.lastrun) {
                this.confload.then(da.fun);
            } else {
                this.confload.then(() => {
                    return da.call;
                }).then(da.fun);
                this.lastrun = da.call;
            }

            da = this.runlist[i] = undefined;
        }
        this.runlist = undefined;
    }

    /*--------------------------------------------------------------------------------------------*/

    /** 模块注册列表
     *
     * @type {{
     *     public:boolean,
     *     name:string,
     *     path:string,
     *     mode:'sync'|'async'|'defer'
     * }[]}
     */
    __modeload = [];
    /** 页面注册列表
     *
     * @type {{
     *     name:string,
     *     path:string,
     *     chunk:string[],
     *     extent:Object,
     *     options:PageLoad.defaultOptions
     * }[]}
     */
    __pageload = [];

    /** 注册要加载的模块
     *
     * @param {boolean} ispublic 是否全局模块
     * @param {string} name 模块名称
     * @param {string} path 模块路径
     * @param {'sync'|'async'|'defer'} loadmode 加载模式
     */
    addmode(ispublic, name, path, loadmode = 'sync') {
        this.__modeload.push({"public": ispublic, "name": name, "path": path, "mode": loadmode});
    }

    /** 注册要加载的页面
     *
     * @param {string} name 页面名称
     * @param {string} path 页面路径
     * @param {string[]} chunk 导入的模块
     * @param {Object} extent 拓展属性
     * @param {PageLoad.defaultOptions} options 加载配置
     */
    addpage(name, path, chunk = [], extent = {}, options = {}) {
        this.__pageload.push({
            "name": name,
            "path": path,
            "chunk": chunk,
            "extent": extent,
            "options": options
        });
    }

    /*----------------------------------------------*/

    /**
     *
     * @param {string} page 页面名称
     * @param {function({
     *     chunk:string[],
     *     extent:Object,
     *     options:PageLoad.defaultOptions
     * }):{
     *     chunk:string[],
     *     extent:Object,
     *     options:PageLoad.defaultOptions
     * }} fun 调整回调，传入部分配置，返回调整后的数据
     *
     * @return this
     */
    modifyPage(page, fun) {
        /** 当前页面
         * @type {{
         *     name:string,
         *     path:string,
         *     chunk:string[],
         *     extent:Object,
         *     options:PageLoad.defaultOptions
         * }}
         */
        let pa;

        /* 搜索 */
        for (let v of this.__pageload) {
            if (v.name === page) {
                pa = v;
                break;
            }
        }
        if (!pa) return;

        let now = fun({"chunk": pa.chunk, "extent": pa.extent, "options": pa.options});
        pa.chunk = now.chunk;
        pa.extent = now.extent;
        pa.options = now.options;

        return this;
    }

    /** 调整注册的模块配置
     *
     * 目前可以调整：是否公开模块、以及加载模式
     *
     * @param {string} name 需要修改的模块名
     * @param {function({
     *     public:boolean,
     *     mode:'sync'|'async'|'defer'
     * }):{
     *     public:boolean,
     *     mode:'sync'|'async'|'defer'
     * }} fun 调整回调，传入当前模块的部分数据，返回调整后的数据
     *
     * @return this
     */
    modifyMode(name, fun) {
        /** 当前记录
         * @type {{
         *     public:boolean,
         *     name:string,
         *     path:string,
         *     mode:'sync'|'async'|'defer'
         * }}
         */
        let modes;

        /* 搜索 */
        for (let v of this.__modeload) {
            if (v.name === name) {
                modes = v;
                break;
            }
        }
        if (!modes) return;

        let now = fun({"public": modes.public, "mode": modes.mode});
        modes.public = now.public;
        modes.mode = now.mode;

        return this;
    }

    /** 调整注册页面的模块配置
     *
     * 目前可以调整：是否公开模块、以及加载模式
     *
     * @param {string} page 页面的名称
     * @param {string} name 需要修改的模块名
     * @param {function({
     *     public:boolean,
     *     mode:'sync'|'async'|'defer'
     * }):{
     *     public:boolean,
     *     mode:'sync'|'async'|'defer'
     * }} fun 调整回调，传入当前模块的部分数据，返回调整后的数据
     *
     * @return this
     */
    modifyPageMode(page, name, fun) {
        return this.modifyMode("p_" + page + "_" + name, fun);
    }
}

module.exports = Aout_Ass;
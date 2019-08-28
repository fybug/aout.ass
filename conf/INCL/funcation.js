require('../config/pageconf.js');
require('../config/htmltmp.js');

/** 添加模块
 *
 * @param {string} name 模块名称
 * @param {string} path 模块路径
 * @param {string} type 模块载入方式，默认为延迟加载
 * @param {boolean} mode 是否为公共模块
 */
global.addEntry = (name, path, type, mode = true) => {
    config.entry[name] = path;

    if (mode) {
        ScriptExtHtmlWebpackPluginConif[type].push(name);
        chunks.push(name);
    }
};
/** 添加公共模块
 *
 * 此处添加的模块采用阻塞加载
 *
 * @param {string} name 模块名称
 * @param {string} path 路径
 */
global.addEntry_sync = (name, path) => addEntry(name, path, "sync");
/** 添加公共模块
 *
 * 此处添加的模块采用异步加载
 *
 * @param {string} name 模块名称
 * @param {string} path 路径
 */
global.addEntry_async = (name, path) => addEntry(name, path, "async");
/** 添加公共模块
 *
 * 此处添加的模块采用延迟加载
 *
 * @param {string} name 模块名称
 * @param {string} path 路径
 */
global.addEntry_defer = (name, path) => addEntry(name, path, "defer");

/** 添加页面模块
 *
 * 此处添加的模块采用阻塞加载
 *
 * @param {string} name 模块名称
 * @param {string} path 路径
 */
global.addPageEntry_sync = (name, path) => addEntry(name, path, "sync", false);
/** 添加页面模块
 *
 * 此处添加的模块采用异步加载
 *
 * @param {string} name 模块名称
 * @param {string} path 路径
 */
global.addPageEntry_async = (name, path) => addEntry(name, path, "async", false);
/** 添加页面模块
 *
 * 此处添加的模块采用延迟加载
 *
 * @param {string} name 模块名称
 * @param {string} path 路径
 */
global.addPageEntry_defer = (name, path) => addEntry(name, path, "defer", false);

/** 添加页面
 *
 * 规范为:
 *      页面:/src/page/[页面名称]/index.html
 *      js 入口:/src/page/[页面名称]/js/main.js
 *      导入 css 的 js 入口:/src/page/[页面名称]/js/main_css.js
 *
 * @param {string} name 页面名称
 * @param {string|Object} userop 配置或标题
 */
global.addPage = (name, userop) => {
    let opitons = getPageconf(name);
    let options_chunk = []; // 默认模块导入
    opitons.chunks = options_chunk;

    /* 判断传入的参数类型 */
    if (typeof (userop) === "string") {
        opitons.title = userop;
    } else {
        /* 传入属性 */
        for (let v in userop) opitons[v] = userop[v];
    }

    // 检查是否传入导入的模块
    (options_chunk === opitons.chunks) && (opitons.chunks = getPageconfchuncks(name, opitons));
    /* 载入模块 */
    (opitons.js_css !== undefined) && addEntry(opitons.js_css, opitons.js_css_path, "async", false);
    (opitons.js !== undefined) && addEntry(opitons.js, opitons.js_path, "defer", false);

    // 加入导入的模块
    for (let v of opitons.pagechunks) opitons.chunks.push(v);

    // html 加载配置模版
    let node = getHtmltmp(name, opitons);

    // 加入队列
    htmlQuery.push(node);
};

require("../run.js");
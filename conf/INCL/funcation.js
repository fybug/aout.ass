// 页面配置模版
require('../config/pageconf.js');
// 导入 html 配置模版
require('../config/htmltmp.js');

/** 添加模块
 *
 * @param {string} name 模块名称
 * @param {string} path 模块路径
 * @param {string} type 模块载入方式，默认为延迟加载
 * @param {boolean} mode 是否为公共模块
 */
global.addEntry = (name, path, type = "defer", mode = true) => {
    config.entry[name] = path;
    ScriptExtHtmlWebpackPluginConif[type].push(name);

    mode && chunks.push(name);
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
 * @param {Object} userop 配置
 */
global.addPage = (name, userop = {}) => {
    let opitons = getPageconf(name); // 配置模版
    opitons.chunks = [];

    // 传入属性
    Object.assign(opitons, userop);

    // 检查是否传入导入的模块,没有则使用默认模块
    (opitons.chunks.length === 0) && (opitons.chunks = getPageconfchuncks(name, opitons));

    /* 载入模块 */
    // css 导入，采用异步
    opitons.js_css && addEntry(opitons.js_css, opitons.js_css_path, "async", false);
    // js 导入，采用延迟
    opitons.js && addEntry(opitons.js, opitons.js_path, "defer", false);

    // 加入导入的模块
    if (opitons.pagechunks.length > 0)
        opitons.chunks.push(...opitons.pagechunks);

    // html 加载配置模版
    let node = getHtmltmp(name, opitons);

    // 加入队列
    htmlQuery.push(node);
};
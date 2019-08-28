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
 * @param {string|Object} options 配置或标题
 */
global.addPage = (name, options) => {
    let defoptions = {
        /** 标题 */
        title: "",
        /** 页面 html 文件路径 */
        filename: pagePath + '/' + name + "/index.html",
        /** 输出 html 文件路径 */
        outfile: outPath + '/' + name + ".html",

        /** 样式模块名称 */
        js_css: name + "_css",
        /** 样式模块路径 */
        js_css_path: pagePath + "/" + name + "/js/main_css.js",

        /** 页面入口模块名称 */
        js: name,
        /** 页面入口模块路径 */
        js_path: pagePath + "/" + name + '/js/main.js',

        /** 额外的模块 */
        pagechunks: [],
        /** 要导入模块 */
        chunks: undefined
    };
    let defoptions_chunk = []; // 默认模块导入
    defoptions.chunks = defoptions_chunk;

    /* 判断传入的参数类型 */
    if (typeof (options) === "string") {
        defoptions.title = options;
    } else {
        /* 传入属性 */
        for (let v in options) defoptions[v] = options[v];
    }

    // 检查是否传入导入的模块
    (defoptions_chunk === defoptions.chunks) && (defoptions.chunks = [defoptions.js_css, defoptions.js]);
    /* 载入模块 */
    (defoptions.js_css !== undefined) && addEntry(defoptions.js_css, defoptions.js_css_path, "async", false);
    (defoptions.js !== undefined) && addEntry(defoptions.js, defoptions.js_path, "defer", false);

    // 加入导入的模块
    for (let v of defoptions.pagechunks) defoptions.chunks.push(v);

    // html 加载配置模版
    let node = new htmltmp();

    /* 填充配置 */
    node.title = defoptions.title;
    node.template = defoptions.filename;
    node.filename = defoptions.outfile;
    node.chunks = defoptions.chunks;

    // 加入队列
    htmlQuery.push(node);
};

require("../run.js");
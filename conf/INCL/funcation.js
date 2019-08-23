/** 添加模块
 *
 * @param {string} name 模块名称
 * @param {string} path 模块路径
 * @param {string} type 模块载入方式，默认为延迟加载
 * @param {boolean} mode 是否为公共模块
 */
global.addEntry = (name, path, type = "defer", mode = true) => {
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
global.addEntry_defer = (name, path) => addEntry(name, path);

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
        /** 输入文件路径 */
        filename: inPath + '/' + name + "/index.html",
        /** 输出文件路径 */
        outfile: outPath + '/' + name + ".html",

        /** 样式模块名称 */
        js_css: name + "_css",
        /** 样式模块路径 */
        js_css_path: inPath + "/" + name + "/js/main_css.js",

        /** js 入口模块名称 */
        js: name,
        /** js 入口模块路径 */
        js_path: inPath + "/" + name + '/js/main.js',

        /** 要导入模块 */
        chunks: undefined
    };
    defoptions.chunks = [defoptions.js_css, defoptions.js];

    /* 判断传入的参数类型 */
    if (typeof (options) === "string") {
        defoptions.title = options;
    } else {
        /* 遍历输入的属性 */
        for (let v in options) {
            /* 判断是否有该属性 */
            if (defoptions[v] !== undefined && (typeof defoptions[v] === typeof options[v])) {
                if (options[v] instanceof Array)
                    defoptions[v].push(options[v]);
                else
                    defoptions[v] = options[v];
            }
        }
    }

    /* 载入模块 */
    addEntry(defoptions.js_css, defoptions.js_css_path, "async", false);
    addEntry(defoptions.js, defoptions.js_path, "defer", false);

    // html 加载配置模版
    let node = {
        meta: {
            "viewport": "width=device-width, initial-scale=1, shrink-to-fit=n",
            "x-ua-compatible": "ie=edge"
        },
        // 压缩
        minify: {
            caseSensitive: true,
            collapseBooleanAttributes: true,
            removeComments: true,
            minifyCSS: true,
            minifyJS: true,
            minifyURLs: true,
            removeAttributeQuotes: true,
            removeEmptyAttributes: true, removeRedundantAttributes: true,
            processConditionalComments: true, trimCustomFragments: true,
            collapseWhitespace: true
        },

        inject: "head",
        filename: undefined,
        template: undefined,
        favicon: icon,
        chunks: undefined,
        title: ""
    };

    /* 填充配置 */
    node.title = defoptions.title;
    node.template = defoptions.filename;
    node.filename = defoptions.outfile;
    node.chunks = defoptions.chunks;

    // 加入队列
    htmlQuery.push(node);
};

require("../run.js");
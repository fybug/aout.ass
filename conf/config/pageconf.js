/** 获取页面配置模版
 *
 * @param {string} name 页面名称
 */
global.getPageconf = (name) => {
    return {
        /** 页面 html 文件路径 */
        filename: pagePath + name + "/index.html",
        /** 输出 html 文件路径 */
        outfile: outPath + name + ".html",

        /** 样式模块名称 */
        js_css: name + "_css",
        /** 样式模块路径 */
        js_css_path: pagePath + name + "/js/main_css.js",
        /** 页面入口模块名称 */
        js: name,
        /** 页面入口模块路径 */
        js_path: pagePath + name + '/js/main.js',

        /** 额外的模块 */
        pagechunks: [],
        /** 要导入模块 */
        chunks: undefined
    };
};

/** 获取页面默认导入模块
 *
 * @param {string} name 页面名称
 * @param {Object} options 当前页面配置
 */
global.getPageconfchuncks = (name, options) => [options.js_css, options.js];
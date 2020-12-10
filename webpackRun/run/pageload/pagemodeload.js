/** 加载内容页面
 *
 * @param {loadTool} tool 解析工具
 * @version 0.0.1
 * @since Aout.ass 0.0.1
 */
module.exports = (tool) => {
    // 扫描的目录
    const root = "src/page/";
    let incl = [];

    // 导入页面及模块
    tool.scannPaths(root + "*/index\\.html", v => {
        // 名称
        let name;
        // 页面的模块
        let chunk = [];

        name = tool.checkname(v, root.length).dir;
        name = name.substring(0, name.length - 1);

        /* 获取页面模块 */
        {
            // 搜索的目录
            let jspa = root + name + "/js/";
            // 匹配表达式
            let modepass = tool.jspass("main");

            // 扫描主入口
            tool.scannPaths(jspa + modepass, (p, paths) => {
                // 检查
                if (paths.length > 1)
                    throw new Error("页面：" + name + " 入口不规范，请查看是否没有匹配 " + modepass + " 的文件或有多个符合的文件");

                // 解析后的对象
                let da = tool.checkmode(p, jspa);
                da.name = "p_" + name;
                da["path"] = tool.topath(p);

                chunk.push(da.name);
                incl.push(da);
            }, () => {
                throw new Error("页面：" + name + " 入口不规范，请查看是否没有匹配 " + modepass + " 的文件或有多个符合的文件");
            });

            // 匹配对象
            let exp = new RegExp("[\\\\/]" + modepass);

            // 扫描其他代码文件
            tool.scannPaths(jspa + "*\\." + tool.suffix, p => {
                if (exp.test(p)) return;

                let da = tool.checkmode(p, jspa);
                da.name = "p_" + name + "_" + da.name;
                da["path"] = tool.topath(p);

                chunk.push(da.name);
                incl.push(da);
            });
        }

        // 页面载入
        aout_ass.addpage(name, tool.topath(v), chunk, {}, {});
    });

    tool.pushmode(incl);
};
/** 搜索公共 js 文件夹，导入代码文件
 *
 * @param {loadTool} tool 解析工具
 * @version 0.0.1
 * @since Aout.ass 0.0.1
 */
module.exports = (tool) => {
    // 主模块匹配方法
    const mainpass = tool.jspass("main");
    // 搜索的目录
    const rootpath = "src/lib/js/";
    // 导入列表
    let incl = [];

    // 扫描公共库主入口
    tool.scannPaths(rootpath + mainpass, (p, paths) => {
        // 检查
        if (paths.length > 1)
            throw new Error("公共库入口不规范，请查看是否没有匹配 " + mainpass + " 的文件或有多个符合的文件");

        // 解析后的对象
        let da = tool.checkmode(p, rootpath);
        da.name = "app";
        // 生成路径
        da["path"] = tool.topath(p);

        // 载入
        incl.push(da);
    }, () => {
        throw new Error("公共库入口不规范，请查看是否没有匹配 " + mainpass + " 的文件或有多个符合的文件");
    });

    // 匹配对象
    let exp = new RegExp("[\\\\/]" + mainpass);

    // 扫描其他代码文件
    tool.scannPaths(rootpath + "*\\." + tool.suffix, p => {
        // 跳过处理过的
        if (exp.test(p)) return;

        // 解析后的对象
        let da = tool.checkmode(p, rootpath);
        // 生成路径
        da["path"] = tool.topath(p);

        // 载入
        incl.push(da);
    });

    tool.pushmode(incl, true);
};
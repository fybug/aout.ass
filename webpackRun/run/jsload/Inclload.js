/** 搜索 INCL 文件夹，导入外置依赖库
 *
 * @param {loadTool} tool 解析工具
 * @version 0.0.1
 * @since Aout.ass 0.0.1
 */
module.exports = (tool) => {
    // 导入列表
    let incl = [];

    // 开始扫描要导入的模块
    tool.scannPaths("src/lib/js/INCL/**/*\\." + tool.suffix, v => {
        let da = tool.checkmode(v, "src/lib/js/INCL/");
        // 生成路径
        da["path"] = tool.topath(v);
        // 载入
        incl.push(da);
    });

    tool.pushmode(incl, true);
};
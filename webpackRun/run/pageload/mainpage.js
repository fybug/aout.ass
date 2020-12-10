/** 加载索引页面
 *
 * @param {loadTool} tool 解析工具
 * @version 0.0.1
 * @since Aout.ass 0.0.1
 */
module.exports = (tool) => {
    // 扫描的目录
    const root = "src/";
    // 路径组
    let paths = glob.sync(root + "*\\.html");

    /* 导入页面数据 */
    {
        // 名称
        let name;

        for (let i = 0, v = undefined, len = paths.length; i < len; i++) {
            v = paths[i];

            name = tool.checkname(v, root.length).name;
            // 页面载入
            aout_ass.addpage(name, path.resolve(__dirname, "../../../" + v), [], {}, {pubchuncks: false});

            v = paths[i] = undefined;
        }
    }
};
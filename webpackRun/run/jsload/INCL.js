/** js 加载部分
 *
 * @param {loadTool} tool 解析工具
 * @version 0.0.1
 * @since Aout.ass 0.0.1
 */
module.exports = (tool) => {
    require("./Inclload")(tool);
    require("./mainload")(tool);
};
/** 解析工具
 *
 * @type {loadTool} tool 解析工具
 */
let tool = new (require('./lib/tool'))();

// js 加载部分
require("./jsload/INCL")(tool);
// 页面加载部分
require("./pageload/INCL")(tool);
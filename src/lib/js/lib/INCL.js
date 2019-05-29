/** ASS 工具对象，可使用缩写 A 来使用
 *
 * 提供全局浏览器事件附加 DOM 加载，全局加载，浏览器类型事件，浏览器版本事件，刷新事件，关闭事件
 * 如果有 jQuery 则加载事件会使用 jQuery 中的接口
 */
window.ASS = {};
window.A = window.ASS;
// todo 注释

// 工具
require('./Unit/INCL');
// 音频
require('./Audio');
// 浏览器全局事件
require('./Brower/INCL');
// 画布 2D 渲染
require('./2D/INCL');


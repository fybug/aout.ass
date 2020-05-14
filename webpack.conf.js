// 启动加载用模块
require('./webpackRun/load/load');

/** 配置处理模块
 *
 * @type {ConfigLoad}
 */
global.confload = new ConfigLoad(WebpackConf());
/** 框架对象
 *
 * @type {Aout_Ass}
 */
global.aout_ass = new (require("./webpackRun/aout.ass.js"))(confload);

// 加载对象
require('./webpackRun/run/runload');
// 用户运行模块
require('./webpackRun/run');

aout_ass.run();
module.exports = confload.__toConf();
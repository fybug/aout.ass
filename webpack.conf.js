// 启动加载用模块
require('./webpackRun/load/load');
// 配置处理模块
global.confload = new ConfigLoad(WebpackConf);
// 用户运行模块
require('./webpackRun/run');

module.exports = confload.__toConf();
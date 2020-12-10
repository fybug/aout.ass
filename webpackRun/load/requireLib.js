/* 导入外置依赖库 */

global.merge = require('webpack-merge'); // 合并对象
global.webpack = require('webpack'); // 核心
global.CleanWebpackPlugin = require('clean-webpack-plugin'); // 清除缓存
global.path = require('path'); // 路径库
global.HtmlWebpackPlugin = require('html-webpack-plugin'); // Html 导入
global.ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin'); // js 的加载方式
global.MiniCssExtractPlugin = require('mini-css-extract-plugin'); // 单独提取 css
global.glob = require('globby'); // 文件匹配
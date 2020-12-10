/* 路径常量 */

/** 项目根目录
 *
 * @author fybug
 * @since PDWebpack 0.0.1
 */
global.RootPath = path.resolve(__dirname, '../../') + '/';
/** 全局输出路径
 *
 * @author fybug
 * @since PDWebpack 0.0.1
 */
global.OutPath = RootPath + 'build/';

/** 页面输出路径 */
global.PageOutPath = OutPath;

/** 源码根目录 */
global.SourcePath = RootPath + 'src/';
/** 全局静态资源路径 */
global.StaticPath = SourcePath + 'static/';
/** 网页图标路径 */
global.IconPath = StaticPath + 'img/favicon.png';
/** js 加载处理工具
 *
 * @author fybug
 * @class loadTool
 * @version 0.0.1
 * @since Aout.ass 0.0.1
 */
class loadTool {
    /** 匹配的文件后缀
     *
     * @type string
     */
    suffix = '';

    constructor() {
        (() => {
            this.suffix = "(";
            let set = new Set(["js"]);

            // 获取配置内容
            confload.configConllcation.main.resolve.extensions.forEach(/**@param {string} v*/(v) => {
                // 修整
                if (v.startsWith(".", 0))
                    v = v.substring(1).trim();
                set.add(v);
            });

            // 生成表达式
            set.forEach(v => this.suffix += v + "|");
            set.clear();
            this.suffix = this.suffix.substring(0, this.suffix.length - 1) + ")";
        })();
    }

    /** js 模块匹配表达式生成
     *
     * 会根据配置，生成对应的后缀匹配
     *
     * @param {string} name 匹配的模块的名称
     *
     * @return {string} 匹配表达式
     */
    jspass(name) {
        return "([0-9]+_)?" + name + "(_(sync|async|defer))?\\." + this.suffix;
    }

    /** 以节约方式运行当前路径匹配
     *
     * @param {string} pattern 匹配格式
     * @param {function(string,string[]):boolean} fun 处理回调，传入当前的路径,返回 true 终止
     * @param {function()} unfun 空匹配处理回调
     */
    scannPaths(pattern, fun = () => null, unfun = () => null) {
        // 路径组
        let paths = glob.sync(pattern);

        // 检查
        if (paths.length === 0)
            unfun();
        else
            for (let len = paths.length, i = 0, p; i < len; i++) {
                p = paths[i];
                if (fun(p, paths)) return;
                p = paths[i] = undefined;
            }
    }

    /** 转化为使用的路径
     *
     * @param {string} pa 相对路径
     *
     * @return {string} 绝对路径
     */
    topath(pa) {

        if (Conf.Out !== undefined && Conf.Out.absolutePath !== undefined && !Conf.Out.absolutePath)
            return pa;
        return path.resolve(__dirname, '../../../' + pa);
    }

    /*--------------------------------------------------------------------------------------------*/

    /** 检查加载模式
     *
     * @param {string} name 当前名称
     *
     * @return {{
     *     mode:'sync'|'async'|'defer',
     *     name:string
     * }}
     */
    checkLoadMode(name) {
        let mode = 'sync';

        let modeindex = name.lastIndexOf("_") + 1;
        if (modeindex === 0) return {"mode": mode, "name": name};

        // 获取模式后缀
        mode = name.substring(modeindex);

        // 检查模式后缀
        switch (mode) {
            case 'async':
            case 'defer':
            case 'sync':
                // 去除模式后缀
                return {"mode": mode, "name": name.substring(0, modeindex - 1)};
            default:
                return {"mode": 'sync', "name": name};
        }
    }

    /** 检查加载顺序
     *
     * @param {string} name 当前名称
     *
     * @return {{
     *     orde:number,
     *     name:string
     * }}
     */
    checkOrder(name) {
        let orde = 10;

        let ordeindex = name.indexOf("_");
        if (ordeindex === -1) return {"orde": orde, "name": name};

        // 获取排序前缀
        orde = name.substring(0, ordeindex);

        // 检查
        if (isNaN(orde))
            return {"orde": 10, name: name}

        // 去除排序前缀
        return {"orde": orde, name: name.substring(ordeindex + 1)}
    }

    /** 检查名称
     *
     * @param {string} path 路径
     * @param {number} pathleng 父路径长度
     *
     * @return {{
     *     name:string,
     *     dir:string
     * }}
     */
    checkname(path, pathleng) {
        let dir = "";
        // 文件名的位置
        let namelast = path.lastIndexOf("/", path.length - 1);
        // 文件名
        let name = path.substr(namelast + 1);
        name = name.substring(0, name.lastIndexOf("."));

        if (namelast > pathleng - 1)
            // 追加附属目录名
            dir = path.substring(pathleng, namelast).replace(/\//g, '_') + "_";
        return {"name": name, "dir": dir};
    }

    /** 检查模块
     *
     * @param {string} path 路径
     * @param {string} rootpath 父路径
     *
     * @return {{
     *     name:string,
     *     mode:'sync'|'async'|'defer',
     *     orde:number
     * }}
     */
    checkmode(path, rootpath) {
        let dir = "";
        // 名称
        let name = (() => {
            let da = this.checkname(path, rootpath.length);
            dir = da.dir;
            return da.name;
        })();
        // 加载模式
        let mode = (() => {
            let da = this.checkLoadMode(name);
            name = da.name;
            return da.mode;
        })();
        // 加载排序
        let orde = (() => {
            let da = this.checkOrder(name);
            name = da.name;
            return da.orde;
        })();

        return {"name": (dir + name), "mode": mode, "orde": orde};
    }

    /** 排序数据
     *
     * @param {{orde:number}[]} dalist 要排序的模块列表
     *
     * @return {array}
     */
    sort(dalist) {
        dalist = dalist.sort((a, b) => {
            return a.orde - b.orde;
        });

        return dalist;
    }

    /** 注册模块到框架中
     *
     * @param {{
     *     orde:number,
     *     name:string,
     *     path:string
     *     mode:"sync"|"async"|"defer"
     * }[]} incl
     * @param {boolean} ispublic 是否公共模块
     */
    pushmode(incl, ispublic = false) {
        // 重排序
        incl = this.sort(incl);

        for (let v = undefined, i = 0, len = incl.length; i < len; i++) {
            v = incl[i];
            aout_ass.addmode(ispublic, v.name, v.path, v.mode);
            v = incl[i] = undefined;
        }
    }
}

module.exports = loadTool;
module.exports = (() => {
    /** 结构加载事件对象 */
    let ob = window.Brower.Unit();
    let loads = ob.load;
    ob.load = () => {
        loads();
        document.onload = undefined;
        window.Brower.onLoad = undefined;
    };
    // 监听文档加载事件
    document.onload = () => ob.load();

    /** 结构加载事件对象
     * @type {ob}
     */
    window.Brower.onLoad = ob;
})();
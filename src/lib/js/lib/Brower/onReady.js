module.exports = (() => {
    /** 窗口加载事件对象 */
    let ob = window.Brower.Unit();
    let loads = ob.load;
    ob.load = () => {
        loads();
        window.onload = undefined;
        window.Brower.onReady = undefined;
        // todo 浏览器版本事件
    };
    // 监听窗口加载事件
    window.onload = () => ob.load();

    /** 窗口加载事件对象
     * @type {ob}
     */
    window.Brower.onReady = ob;
})();
module.exports = (() => {
    /** 事件对象 */
    let ob = window.Brower.Unit();
    // 监听鼠标点击事件
    window.onmousedown = (evens) => ob.load(evens);

    /** 鼠标点击事件对象
     * @type {ob}
     */
    window.Brower.onMouseDown = ob;
})();
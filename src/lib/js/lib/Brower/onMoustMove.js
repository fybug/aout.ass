module.exports = (() => {
    /** 事件对象 */
    let ob = window.Brower.Unit();
    // 监听鼠标移动事件
    window.onmousemove = (evens) => ob.load(evens);

    /** 鼠标点击事件对象
     * @type {ob}
     */
    window.Brower.onMouseMove = ob;
})();
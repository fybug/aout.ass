module.exports = (() => {
    /** 基础事件容器 */
    window.Brower.Unit = () => {
        let ob = {
            /** 事件组
             * @type {Array<function>}
             */
            evens: [],
            /** 添加事件
             *
             * @param {function} even 要添加的监听事件
             */
            add: (even) => ob.evens.push(even),
            /** 触发事件 */
            load: (even = null) => {
                // 执行事件
                for (let i = 0, len = ob.evens.length; i < len; i++) ob.evens[i](even);
            }
        };
        return ob;
    };
})();
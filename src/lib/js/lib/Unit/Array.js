module.exports = (() => {
    /** 数组工具类
     */
    window.ASS.ArrayTools = {
        /** 移除数组中的一个元素
         *
         * @param {Array<Object>} fooder 要移除元素的数组
         * @param {Number} i 要移除的元素的位置
         *
         * @return {Array<Object>} 处理后的数组
         */
        ArrayRemote: (fooder, i) => {
            let len = fooder.length; // 长度
            let ar = []; // 返回的数组

            /* 检查是否是空数组 */
            if (len === 0) return [];

            /** 头部起始位置
             *  @var {Number}
             */
            let start;
            /** 头部结束位置
             * @var {Number}
             */
            let end;
            /** 尾部起始位置
             * @var {Number}
             */
            let last;
            /** 尾部结束位置
             * @var {Number}
             */
            let laend;

            /* 分配处理区域 */
            if (i === 0) { // 要移除的是第一个元素
                start = 1;
                end = len;

                last = laend = 0;
            } else if (i === len - 1) { // 要移除的是最后一个元素
                start = 0;
                end = len - 1;

                last = laend = 0;
            } else { // 移除的是中间的元素
                start = 0;
                end = i;

                last = i + 1;
                laend = len;
            }

            /* 取出头部的元素 */
            for (; start < end;) ar.push(fooder[start++]);
            /* 取出尾部的数据 */
            for (; last < laend;) ar.push(fooder[last++]);

            return ar;
        }
    };
})();
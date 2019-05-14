/** 获取 2D 绘制对象
 *
 * 该对象提供绘制用的内容容器，提供存放画布，存放渲染对象
 * 需要手动开启 WebWork 并赋予渲染方法
 *
 * @return {{canvasCollection:canvasCollection,binCanvas:binCanvas,addCanvas:addCanvas,DrawObject:DrawObject,appendDrawObject:appendDrawObject,removeDrawObject:removeDrawObject,work:work}}
 */
function draw_2D() {
    /** @type {{canvasCollection:canvasCollection,binCanvas:binCanvas,addCanvas:addCanvas,DrawObject:DrawObject,appendDrawObject:appendDrawObject,removeDrawObject:removeDrawObject}} */
    let self;

    let draw_2D_ob = self = {
        /** 要绘制的画布集合
         *
         * 名称为 null 的画布将被定义为 无名画布
         *
         * @type {{NONE_NAME:NONE_NAME}}
         */
        canvasCollection: {
            /** 未定义名称的画布
             *
             * @type {Array<HTMLCanvasElement>}
             */
            NONE_NAME: []
        },
        /** 要渲染的对象
         *
         * 存放的是方法，使用方法获取绘制的对象，以保证数据新鲜度
         *
         * @type {{}}
         */
        DrawObject: {},

        /** 重绑定画布对象
         *
         * 会清空当前绑定的画布对象，并重新绑定当前为画布
         *
         * @param {HTMLCanvasElement} canvas 要绑定的画布对象
         * @param {string|null} name 画布的名称，可以为 null ，默认也为 null
         *
         * @return {self}
         */
        binCanvas: (canvas, name = null) => {
            if (!(canvas instanceof HTMLCanvasElement)) return self;

            // 清空绑定的画布
            self.canvasCollection = {NONE_NAME: []};

            /* 检查名称 */
            if (name === undefined || name === null)
                self.canvasCollection.NONE_NAME = [canvas];
            else
                self.canvasCollection[name] = canvas;

            return self;
        },
        /** 添加绑定的画布
         *
         * @param {HTMLCanvasElement} canvas 要追加的画布对象
         * @param {string|null} name 画布的名称，可以为 null ，默认也为 null
         *
         * @return {self}
         */
        addCanvas: (canvas, name = null) => {
            if (!(canvas instanceof HTMLCanvasElement)) return self;

            if (name === undefined || name === null)
                self.canvasCollection.NONE_NAME.push(canvas);
            else
                self.canvasCollection[name] = canvas;

            return self;
        },

        /** 添加绘制对象组获取方法
         *
         * 获取绘制对象会使用方法获取以保证数据的新鲜度
         *
         * @param {{}} id 该方法的 ID
         * @param {function(self)} arr 绘制对象组的获取方法
         */
        appendDrawObject: (id, arr) => self.DrawObject[id] = arr,
        /** 移除绘制对象获取方法
         *
         * @param {{}} id 要移除的方法的 ID
         */
        removeDrawObject: (id) => self.DrawObject[id] = undefined,

        /** 绘制线程
         * @type {Worker}
         */
        work: undefined
    };

    return draw_2D_ob.self;
}

module.exports = draw_2D;
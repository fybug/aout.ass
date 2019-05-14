module.exports = {
    /** 获取得基础渲染对象
     *
     * 内置对象方位，绘画方位，以及图形对象，应通过图形对象获取高度和宽度
     *
     * @return {{type:string,draw:draw,x:x,y:y,draw_x:draw_x,draw_y:draw_y,drawImg:drawImg,canvasName:canvasName}}
     */
    getDraw_2D_Object: () => {
        let ob = {
            type: 'function',

            /** 对象的 x 轴方位
             * @type {Number}
             */
            x: 0,
            /** 对象的 y 轴方位
             * @type {Number}
             */
            y: 0,

            /** 要绘制于的画布的名称
             * @type {Array|null}
             */
            canvasName: null,

            /** 绘制起始点相对于对象 x 轴的偏移量
             * @type {Number}
             */
            draw_x: 0,
            /** 绘制起始点相对于对象 y 轴的偏移量
             * @type {Number}
             */
            draw_y: 0,

            /** 绘制的图形
             *
             * @type {function(CanvasRenderingContext2D):HTMLImageElement}
             */
            drawImg: () => new Image(),

            /** 绘制对象
             *
             * @type {function(CanvasRenderingContext2D)}
             */
            draw: (pan) => pan.drawImage(ob.drawImg(pan), ob.x + ob.draw_x, ob.y + ob.draw_y)
        };
        return ob;
    },

    /** 获得带样式指定的渲染对象
     *
     * 使用指定方法调整画笔样式
     *
     * @param {function(CanvasRenderingContext2D)} style 样式调整方法
     *
     * @return {{type:string,draw:draw,x:x,y:y,draw_x:draw_x,draw_y:draw_y,drawImg:drawImg,canvasName:canvasName,drawStyle:drawStyle}}
     */
    getDraw_2D_style: (style = () => null) => {
        /**
         * @var {getDraw_2D_Object()}
         */
        let ob = getDraw_2D_Object();

        /** 当前样式调整
         * @type {function(CanvasRenderingContext2D)}
         */
        ob.drawStyle = style;
        ob.draw = (pan) => {
            ob.drawStyle(pan);
            pan.drawImage(pan.drawImage(ob.drawImg(pan), ob.x + ob.draw_x, ob.y + ob.draw_y));
        };

        return ob;
    },

    /** 获取带贴图的渲染对象
     *
     * @param {HTMLImageElement} Image 绘制对象的贴图
     * @param {function(CanvasRenderingContext2D)} style 设置绘制样式
     *
     * @return {{type:string,draw:draw,x:x,y:y,draw_x:draw_x,draw_y:draw_y,drawImg:drawImg,canvasName:canvasName,drawStyle:drawStyle,imagecache:HTMLImageElement}}
     */
    getDraw_2D_Image: (Image, style) => {
        /**
         * @var {getDraw_2D_style()}
         */
        let ob = getDraw_2D_style(style);
        ob.type = 'image';

        /** 图像缓存
         * @var {HTMLImageElement}
         */
        ob.imagecache = Image;
        ob.drawImg = () => ob.imagecache;
        ob.draw = (pan) => {
            ob.drawStyle(pan);
            pan.drawImage(ob.drawImg(pan), ob.x + ob.draw_x, ob.y + ob.draw_y);
        };

        return ob;
    },

    /**
     * @param {String} text 要绘制的文本
     * @param {function(CanvasRenderingContext2D)} style 设置绘制样式
     *
     * @return {{type:string,draw:draw,x:x,y:y,draw_x:draw_x,draw_y:draw_y,drawImg:drawImg,canvasName:canvasName,drawStyle:drawStyle,text:string}}
     */
    getDraw_2D_Text: (text, style) => {
        /** @var {getDraw_2D_style()}*/
        let ob = getDraw_2D_style(style);
        ob.type = 'text';

        /** 当前文字
         * @var {String}
         */
        ob.text = text;
        ob.drawImg = () => new Image();
        ob.draw = (pan) => {
            ob.drawStyle(pan);
            ob.fillText(ob.text, ob.x + ob.draw_x, ob.y + ob.draw_y);
        };
    }
};
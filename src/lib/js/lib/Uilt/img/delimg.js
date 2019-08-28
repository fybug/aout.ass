/** 使用示例 在 INCL.js 中导入
 * import dealImage from './img/delimg';
 *
 * 或者在 conf/run.js 中作为模块导入
 * addEntry_async("dealImage",pagePath + "/../lib/js/lib/Uilt/img/dealImage.js");
 *
 * 或在上一层文件夹中的 INCL.js 中取消注释
 */

/** 图片裁剪
 *
 * 采用异步执行
 * 宽高的比例使用，例如 16:9 传入的是比例而不是实际大小
 *
 * @param {string} image 图片地址，可以是 base64
 * @param {number} width 宽度比例
 * @param {number} height 高度比例
 * @param {Image} node 存放处理后图像的 图像节点
 */
export default function dealImage(image, width, height, node) {
    let x = 0, y = 0, img = new Image(), h, w;

    img.onload = () => {
        let canvas = document.createElement("canvas");

        /* 优先拉满宽度或高度 */
        if (width > height) {
            h = height / width * img.width; // 计算按比例获得的高度

            /* 高度不够 */
            if (h > img.height) {
                w = width / height * img.height; // 计算按比例获得的宽度

                canvas.width = w;
                canvas.height = img.height;
                x = 0 - (img.width - w) / 2;
            } else {
                canvas.height = h;
                canvas.width = img.width;
                y = 0 - (img.height - h) / 2;
            }

        } else {
            w = width / height * img.height;

            /* 宽度不够 */
            if (w > img.width) {
                h = height / width * img.width;

                canvas.height = h;
                canvas.width = img.width;
                y = 0 - (img.height - h) / 2;
            } else {
                canvas.width = w;
                canvas.height = img.height;
                x = 0 - (img.width - w) / 2;
            }

        }

        let cxt = canvas.getContext("2d");

        cxt.drawImage(img, x, y, img.width, img.height);
        img = null;

        node.attr("src", canvas.toDataURL("image/jpeg", 0.9));
    };

    img.src = image;
};
import {Message} from "./message";
import {ViewGroup} from "../../../../../../../vhannels/src/lang/viewGroup";

/** 悬浮消息工具
 *
 * 用于包装消息对象
 *
 * @see Message
 * @author fybug
 * @version 0.0.1
 */
export class FloatMessage extends ViewGroup {
    constructor(dom = document.body) {
        super(document.createElement("messagegroup"));
        dom.append(this.getDom());

        // 赋予消息组样式
        Object.assign(this.getDom().style, this.styles());
    }

    /** 获取消息容器的样式
     * @return {CSSStyleDeclaration} 样式对象
     */
    styles() {
        return {
            // 固定定位的纵向弹性盒
            'display': 'flex',
            'flexFlow': 'column',
            'position': 'fixed',
            // 贴紧屏幕左下角，并左移 1rem 上移 2rem
            'left': '0',
            'bottom': '0',
            'marginLeft': '1rem',
            'paddingBottom': '1.5rem'
        };
    }

    /** 创建并展示消息对象
     * @return {Message}
     */
    showMessage() {
        return this.pushMessage(this.createMessage());
    }

    /** 创建消息对象
     * @return {Message} 消息
     */
    createMessage() {
        return new Message(this.messageStyle());
    }

    /** 获取消息默认样式
     * @return {CSSStyleDeclaration} 消息样式
     */
    messageStyle() {
        return {
            // 带边框的圆角框
            'borderRadius': '5000em',
            'border': '1px solid rgba(10, 10, 10, 0.25)',
            'padding': '.5rem 1rem',
            'margin': '0 .5rem .5rem',
            // 默认背景颜色
            'backgroundColor': 'white',
            'color': '#0a0a0a',
            // 透明
            'opacity': '0',
        }
    }
}
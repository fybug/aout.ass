import {FloatMessage} from "./floatMessage";
import {View} from "../../../../../../../vhannels/src/lang/view";

export class Message extends View {
    /** 当前消息节点 */
    dom;
    /** 文字节点 */
    text;
    /** 符号 */
    icon;
    /** 持续时间 */
    showtime: -1;

    /** 消息配置 */
    __attar;

    constructor(style = {}, spstyle = {}, iconsty = {}) {
        super();
        this.dom = document.createElement("message");
        this.icon = this.dom.appendChild(document.createElement("i"));
        this.text = this.dom.appendChild(document.createElement("span"));
        /* 赋予类 */
        style.class && this.dom.classList.add(style.class) && (style.class = undefined);
        spstyle.class && this.text.classList.add(spstyle.class) && (spstyle.class = undefined);
        iconsty.class && this.icon.classList.add(iconsty.class) && (iconsty.class = undefined);
        /* 赋予样式 */
        Object.assign(this.dom.style, style);
        Object.assign(this.text.style, spstyle);
        Object.assign(this.icon.style, iconsty);
        // 默认状态
        this.__attar = this.defaultType();
    }

    /** 默认状态配置表 */
    defaultType() {
        return {
            [Message.LOAD]: {
                class: "load",
                icon: {class: ["fa", "fa-refresh", "fa-spin"]}
            },
            [Message.SUCCESS]: {
                class: 'success',
                icon: {class: ['fa', 'fa-check']}
            },
            [Message.ERROR]: {
                class: 'error',
                icon: {class: ['fa', 'fa-times']}
            }
        };
    }

    /** 展示 */
    show(type = Message.LOAD) {
        let l = this.__setBody(this.__attar[type]);
        l = this.__setIcon(l.icon);
    }

    /** 销毁当前消息
     * 不会销毁节点，仅渐变消失然后移除
     */
    destroy() {
        this.dom.style.opacity = 0;
        this.dom.style.transition = 'all 800ms';

        setTimeout(() => {
            this.dom.parentNode.removeChild(this.dom);
            this.dom.style.transition = '';
        }, 1000);
    }
}

/** 加载状态 */
Message.LOAD = "load";
/** 成功状态 */
Message.SUCCESS = "success";
/** 错误状态 */
Message.ERROR = "error";

Message.option = {
    /** 当前状态应用的类
     * @type string
     */
    class: [],
    /** 当前状态的图标配置 */
    icon: {class: []},
    /** 展示时间
     * @type number
     */
    showtime: 0,
    /** 开始的文字
     * @type string
     */
    text: ""
};
/** 使用方法在 conf/run.js 中加入
 *
 * addEntry_async("float_message",pagePath + "/../lib/js/lib/ui/float_message/main.js");
 *
 * 有问题就调整加载的顺序
 */
require('./css/main.pcss');

/** 发送消息
 *
 * 返回的对象为消息对象
 *
 * message_load() 方法显示为加载消息
 * message_success() 方法显示为成功消息
 * message_error() 方法显示为错误消息
 * message_destroy() 方法销毁消息对象
 */
window.addmessage = () => {
    let node = document.createElement("message");
    node.appendChild(document.createElement("i"));
    node.appendChild(document.createElement("span")).style.margin = "5px";

    document.querySelector("messagegroup").insertBefore(node);

    /** 加载消息 */
    node["message_load"] = (text) => {
        //node.removeClass().addClass("primary");
        //node.children("i").removeClass().addClass("fa fa-refresh fa-spin");
        node.children("span").text(text);
        return node;
    };
    /** 成功消息 */
    node["message_success"] = (text) => {
        node.removeClass().addClass("success");
        node.children("i").removeClass().addClass("fa fa-check");
        node.children("span").text(text);
        return node;
    };
    /** 错误消息消息 */
    node["message_error"] = (text) => {
        node.removeClass().addClass("alert");
        node.children("i").removeClass().addClass("fa fa-times");
        node.children("span").text(text);
        return node;
    };
    /** 销毁 */
    node["message_destroy"] = () => {
        setTimeout(() => node.remove(), 3000);
        setTimeout(() => node.fadeOut(1500), 1500);
    };
    return node;
};
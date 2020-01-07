// 页面 js 入口
import {FloatMessage} from "../../../lib/js/lib/ui/float_message/floatMessage"
import {Message} from "../../../lib/js/lib/ui/float_message/message";

var l = new FloatMessage();
l.showMessage().show(Message.ERROR);
l.showMessage().show();
l.showMessage().show();
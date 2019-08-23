module.exports = (() => {
    /** 判断基准 */
    let ua = navigator.userAgent,
        device_reg = [
            /(MI(\s+)|2013022|2013023|HM|2014011|2014501|2014813|2014811|2014812|2014817|2014818|2014819|2014502|2015|xiaomi).*/i,
            /(MI(.*|\s*)PAD).*/i,
            /(iPhone | iPod).*/i, // iphone
            /(iPad).*/i, // ipad
            /(Android).*/i, // Android
            /(iPhone|iPad|iPod|iOS).*/i, // ios
            /(windows(.*|\s*)phone).*/i
        ],
        platform_reg = [
            /MicroMessenger/i,
            /MiuiBrowser/ig,
            /weibo/gi,
            /MQQBrowser/i,
            /QQ/i
        ];

    // 事件基础容器
    let typeob = window.ASS.Brower.EvenUnit();

    /** 当前设备类型 */
    typeob.now = undefined;

    /** 存储对应平台的事件 */
    typeob.evens = {
        android: [],
        ios: [],
        pc: [],
        /** win...winPhone?! */ winphone: [],

        iphone: [],
        ipad: [],

        /** 小米手机 */ miphone: [],
        /** 小米平板 */ mipad: [],
        /** 其他安卓手机 */outherAndroid: [],

        /** 微信 */ wechat: [],
        /** 小米浏览器 */ mibrowser: [],
        /** 微博 */ weibo: [],
        /** qq 浏览器 */qqbrowser: [],
        /** QQ */qq: []
    };
    // 重写
    typeob.add = (even, type) => {
        if (typeob.now === undefined)
            typeob['evens'][type].push(even);
        else {
            // 更方便的使用
            // 检查当前是否有该事件
            for (let i = 0, len = typeob.now.length; i < len;)
                (type === typeob.now[i++] || event());
        }
    };

    // 加载完成后触发
    typeob.load = () => {
        let o = [];

        /* 系统 */
        // IOS
        if (device_reg[5].test(ua)) o.push('ios');
        // 安卓
        else if (device_reg[4].test(ua)) o.push('android');
        // winphone
        else if (device_reg[6].test(ua)) o.push('winphone');
        // pc
        else o.push('pc');

        /* 设备 */
        // iphone
        if (device_reg[2].test(ua)) o.push('iphone');
        // ipad
        else if (device_reg[3].test(ua)) o.push('ipad');
        // miphone
        else if (device_reg[0].test(ua) && !device_reg[1].test(ua)) o.push('miphone');
        // MiPad
        else if (device_reg[1].test(ua)) o.push('mipad');
        // 其它安卓设备
        else if (device_reg[4].test(ua)) o.push('outherAndroid');

        /* 平台 */
        // 微信
        if (platform_reg[0].test(ua)) o.push('wechat');
        // 小米浏览器
        else if (platform_reg[1].test(ua)) o.push('mibrowser');
        // 微博
        else if (platform_reg[2].test(ua)) o.push('weibo');
        // qq 浏览器
        else if (platform_reg[3].test(ua)) o.push('qqbrowser');
        // QQ
        else if (platform_reg[4].test(ua)) o.push('qq');

        typeob.now = o;

        // 触发已注册的对应事件
        for (let i = 0, len = o.length, tmp; i < len;) {
            // 获取事件组
            tmp = typeob.evens[o[i++]];

            // 触发所有事件
            for (let j = 0, leng = tmp.length; j < leng;)
                tmp[j++]();
        }

        // free
        ua = device_reg = platform_reg = typeob.evens = undefined;
    };

    /** 浏览器平台事件
     *
     * 使用该事件检查当前浏览器的运行环境
     * 可检查 安卓，ios，winphone，pc
     * 可检查设备类型为 iphone，ipad，小米手机和平板，其他安卓手机
     * 可检查平台为 微信，小米浏览器，微博，qq浏览器，QQ
     *
     * 类型标记为
     *   安卓:android
     *   ios: ios
     *   pc端: pc
     *   WinPhone: winphone
     *
     *   IPhone: iphone
     *   IPad: ipad
     *   小米手机: miphone
     *   小米平板: mipad
     *   其他安卓手机: outherAndroid
     *
     *   微信: wechat
     *   小米浏览器: mibrowser
     *   微博: weibo
     *   QQ浏览器: qqbrowser
     *   QQ: qq
     *
     *   用法 A.B.onType.add(()=>{},'qqbrowser');
     */
    ASS.Brower.onType = typeob;
    $(() => typeob.load());
})();
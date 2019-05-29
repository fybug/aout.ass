module.exports = (() => {
    /** 音频工具类 */
    window.ASS.audio = {
        /** 创建一个音频对象
         * @return {{setSrc: (function(String)), aoutLoad: (function()), play: play, src: undefined, replay: replay, isEnd: (function(): (Event | MediaStreamErrorEvent | boolean)), pause: (function()), volume: (function(Number)), stop: (function()), loop: (function()), now: string, unloop: (function()), audio: undefined, statucs: (function(): String)}}
         */
        createAudio: () => {
            let s = {
                /** 音频对象
                 * @type {HTMLAudioElement}
                 */
                audio: undefined,

                /** 资源指向缓存
                 * @var {String}
                 */
                src: undefined,
                /** 音频当前状态
                 * @var {String}
                 */
                now: "null",

                /*----------------------------------------------------------*/

                /** 设置资源指向
                 * @param {String} src
                 * @return {self}
                 */
                setSrc: (src) => {
                    self.src = src;

                    audio.pause();
                    audio.src = src;

                    self.now = 'ready';
                    return self;
                },

                /*----------------------------------------------------------*/

                /** 设置为循环播放
                 * @return {self}
                 */
                loop: () => {
                    audio.loop = true;
                    return self;
                },
                /** 取消循环播放
                 * @return {self}
                 */
                unloop: () => {
                    audio.loop = false;
                    return self;
                },

                /*----------------------------------------------------------*/

                /** 设置为自动加载
                 * @return {self}
                 */
                aoutLoad: () => {
                    audio.preload = true;
                    return self;
                },

                /*----------------------------------------------------------*/

                /** 设置音量
                 * @param{Number} size
                 * @return {self}
                 */
                volume: (size) => {
                    audio.defaultMuted = false;
                    audio.volume = size;
                    return self;
                },

                /*----------------------------------------------------------*/

                /** 播放
                 * @type {function}
                 */
                play: () => {
                    if (!audio.paused) audio.load();
                    audio.play();

                    self.now = "play";
                },
                /** 重播
                 * @type {function}
                 */
                replay: () => {
                    self.setSrc(self.src);
                    self.play();
                },
                /** 暂停
                 *
                 * @return {self}
                 */
                pause: () => {
                    if (!audio.pause) audio.pause();
                    self.now = "pause";
                    return self;
                },
                /** 停止
                 * @type {function}
                 */
                stop: () => {
                    self.pause().setSrc(self.src);
                    return self;
                },

                /*----------------------------------------------------------*/

                /** 音频是否播放到结尾
                 *
                 * @return {boolean}
                 */
                isEnd: () => audio.ended,
                /** 返回当前音频的状态
                 * @return {string}
                 */
                statucs: () => self.now
            };

            s.audio = new Audio();

            return s;
        },
    };
})();
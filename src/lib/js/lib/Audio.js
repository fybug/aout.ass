module.exports = (() => {
    /** 音频工具类 */
    window.audio = {
        /** 创建一个音频对象 */
        createAudio: () => {
            let self = {
                /** 音频对象
                 * @type {HTMLAudioElement}
                 */
                audio: undefined,

                /** 资源指向缓存
                 * @var {String}
                 */
                src: undefined,
                /** 设置资源指向
                 * @param {String} src
                 * @return {self}
                 */
                setSrc: (src) => {
                    audio.pause();
                    audio.src = src;
                    self.src = src;
                    return self;
                },

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

                /** 设置为自动加载
                 * @return {self}
                 */
                aoutLoad: () => {
                    audio.preload();
                    return self;
                },

                /** 设置音量
                 * @param{Number} size
                 * @return {self}
                 */
                volume: (size) => {
                    audio.volume = size;
                    return self;
                },

                /** 播放
                 * @type {function}
                 */
                play: () => {
                    audio.load();
                    audio.play();
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
                    audio.pause();
                    return self;
                },
                /** 停止
                 * @type {function}
                 */
                stop: () => {
                    self.setSrc(self.src);
                }
            };

            self.audio = new Audio();

            return self;
        },
    };
})();
/** 自动补充文件拓展
 *
 * @return {{extensions:string[]}}
 */
module.exports = (confget, conf) => {
    return {extensions: ['.js', '.jsx']};
};
/*
npm install webpack webpack-cli webpack-dev-server -g

npm install webpack webpack-merge webpack-cli node-sass script-ext-html-webpack-plugin clean-webpack-plugin html-webpack-plugin style-loader css-loader sass-loader url-loader img-loader file-loader html-withimg-loader image-webpack-loader postcss-loader resource-hints-webpack-plugin --save-dev
*/
module.exports = () => {
    // 导入的模块
    require("./conf/INCL/INCL");
    // ----------------------------------------------------------------
    require("./conf/INCL/main.js");
    return config;
};
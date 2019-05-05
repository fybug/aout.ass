<center>
<h1>aout.ass</h1>

<b>v 0.0.1</b>
<p>用于 webpack 的手脚架,以每一个页面作为一个模块搭建</p>
</center>

### 架构
<pre>
┃
┣ build
┣ src // 源码
┃ ┃
┃ ┣ lib         // 该网站中公共部分的样式和模块,内置了 jQuery
┃ ┃ ┃
┃ ┃ ┣ css
┃ ┃ ┃  ┗ main.css // 公共样式，样式在 js 中导入
┃ ┃ ┗ js
┃ ┃    ┃
┃ ┃    ┣ + jquery   // jQuery 
┃ ┃    ┃
┃ ┃    ╚ main.js   // 公共模块入口文件
┃ ┃
┃ ┣ page        // 页面
┃ ┃  ┃
┃ ┃  ┗ dome    // 页面模块示例
┃ ┃      ┃
┃ ┃      ┣ css        // 该页面的 css
┃ ┃      ┃ ┗ main.css    // 示例样式，样式均在 js 中导入
┃ ┃      ┣ js
┃ ┃      ┃ ┗ main.js     // 入口 js 文件，编译时会已该文件为入口
┃ ┃      ┃
┃ ┃      ┗ index.html // 该页面的内容，编译后会变成该模块的名称
┃ ┃
┃ ┣ static      // 静态资源
┃ ┃
┃ ┗ index.html // 根目录入口文件,请指定它跳转到你的首页中,首页不该是这个
┃
┣ package.json
┣ postcss.config.js     // postcss 配置文件
┣ webpack.conf.js       // webpack 公共配置
┣ webpack.dev.js        // webpack 开发用配置
┗ webpack.prod.js       // webpack 生成配置
</pre>

### 安装
需要先安装 **Node.js** ，自行百度

在项目文件夹中运行 `npm -y init` 初始化

安装 `webpack` 和开发用 `dev-server`
```
npm install webpack webpack-cli webpack-dev-server -g
```
安装依赖
```
npm install webpack webpack-merge node-sass html-withimg-loader img-loader file-loader url-loader image-webpack-loader webpack-cli clean-webpack-plugin path html-webpack-plugin style-loader css-loader postcss-loader sass-loader --save-dev
```
如果和我一样使用 `postcss` 的，可以自行配置一下

### 使用
每次新建 `css` 样式后要在对应的模块的 `js` 入口中导入

要导入依赖库 如 `jQuery` 等，可以复制到 `/src/lib/js` 中，并在 `main.js` 中导入

导入页面虚在 `/webpack.conf.js` 中接近结尾的位置，导入使用已编写好的 `addHtmlWebpackPlugin` 函数

`addHtmlWebpackPlugin` 函数会将整个页面模块的入口放入 `webpack` 配置文件中

### 参与
一个人的力量是有限的，一个项目终究需要大家一起完善

· fork 本仓库

· 新建 add_*** 分支 

· 提交等待合并
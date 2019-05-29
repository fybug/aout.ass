# aout.ass

**v 0.0.2**

用于 webpack 的手脚架,以每一个页面及相关文件作为一个模块搭建

内置一个轻量级 js 开发框架及 postcss 和 scss 支持

可自行往内部添加需要的框架和模块

### 架构
<pre>
┃
┣ build // 编译文件夹
┣ src   // 源码
┃ ┃
┃ ┣ lib       // 该网站中公共部分的样式和模块
┃ ┃ ┃
┃ ┃ ┣ css
┃ ┃ ┃ ┗ main.css     // 公共样式，样式在 js 中导入
┃ ┃ ┗ js
┃ ┃    ┃
┃ ┃    ┗ main.js      // 公共模块入口文件
┃ ┃
┃ ┣ page      // 单独的页面
┃ ┃  ┃
┃ ┃  ┗ dome    // 页面模块示例
┃ ┃      ┃
┃ ┃      ┣ css        // 该页面的 css
┃ ┃      ┃ ┗ main.css    // 示例样式，样式均在 js 中导入
┃ ┃      ┣ js         // 该页面的 js
┃ ┃      ┃ ┗ main.js     // 该页面的入口 js 文件，编译时会以该文件为入口
┃ ┃      ┃
┃ ┃      ┗ index.html // 该页面的内容，编译后会变成该模块的名称
┃ ┃
┃ ┣ static      // 静态资源,页面内的静态内容应放在页面的 static 中
┃ ┃
┃ ┗ index.html  // 根目录入口文件,请指定它跳转到你的首页中,首页不该是这个
┃
┣ package.json
┣ postcss.config.js     // postcss 配置文件
┣ webpack.conf.js       // webpack 公共配置
┣ webpack.dev.js        // webpack 开发用配置
┗ webpack.prod.js       // webpack 生产配置
</pre>

### 安装
需要先安装 ` Node.js ` ，自行百度

在项目文件夹中运行 `npm -y init` 初始化

安装 `webpack` 和开发用 `dev-server`
```
npm install webpack webpack-cli webpack-dev-server -g
```
安装依赖
```
npm install webpack webpack-merge webpack-cli node-sass clean-webpack-plugin html-webpack-plugin style-loader css-loader sass-loader url-loader img-loader file-loader html-withimg-loader image-webpack-loader postcss-loader --save-dev
```
如果和我一样使用 `postcss` 的，可以自行配置一下

### 使用
每次新建 `css` 样式后要在对应的模块的 `js` 入口中导入

要导入依赖库 如 `jQuery` 等，可以使用 `npm` 安装或复制到 `lib/js` 中，并在 `main.js` 中导入

导入页面需在 `/webpack.conf.js` 中对应的位置使用已编写好的 `addHtmlWebpackPlugin` 函数

`addHtmlWebpackPlugin` 函数会将整个页面模块的入口放入 `webpack` 配置文件中

**如果需要添加公共模块可以在** `webpack.conf.js` **中搜索 todo,每个页面中必须要有** `js/main.js`

### 额外
内置了一些开发中的框架，请自行查看其中的注释,后期会在文档中补上

### 参与
一个人的力量是有限的，一个项目终究需要大家一起完善

· fork 本仓库

· 新建 add_*** 分支 

· 提交等待合并
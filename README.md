# aout.ass
![](https://img.shields.io/badge/version-0.0.1-00b58a.svg "当前版本")
![](https://img.shields.io/badge/webpack-4.41.5+-2e93ff.svg "开发所使用等等 webpack 版本")
![](https://img.shields.io/badge/license-Apache%202.0-f27122.svg "使用的开源协议")

基于 [PDWebpack](https://gitee.com/PatternDirClean/PDWebpack) 制作的手脚架。自动扫描按规范目录开发的内容，并添加到 **webpack** 中进行打包。

扫描的内容采用注册在框架中的方式临时保存，可在用户代码文件中进行调整或追加新的模块。

# 架构
<pre>
┃
┣ build // 编译文件夹
┃
┣ webpackRun // 框架运行目录
┃ ┃
┃ ┣ config    // 框架配置相关
┃ ┃ ┃
┃ ┃ ┗ webpack    // webpack 配置相关
┃ ┃
┃ ┣ lib       // 框架运行相关的依赖
┃ ┣ load      // 框架加载相关
┃ ┣ run       // 手脚架内容扫描相关
┃ ┃
┃ ┣ aout.ass.js // 框架对象代码
┃ ┗ run.js    // 用户代码，在此处使用和调整框架 
┃
┣ src   // 源码存放位置
┃ ┃
┃ ┣ lib       // 该网站中公共代码部分
┃ ┃ ┃
┃ ┃ ┣ css      // 公共样式文件夹，手动在 ../js/main.js 中导入
┃ ┃ ┃ ┃     ## 可以随意修改
┃ ┃ ┃ ┗ main.pcss     // 项目样式
┃ ┃ ┃
┃ ┃ ┣ static   // 全局公共代码依赖资源，比如字体
┃ ┃ ┃
┃ ┃ ┗ js       // 公共 js 文件夹
┃ ┃   ┃
┃ ┃   ┣ INCL           // 导入库，建议外部框架如 jQuery 放这里，会自动扫描
┃ ┃   ┃
┃ ┃   ┗ main.js        // 公共模块入口文件，固定的入口，首先检查该入口
┃ ┃
┃ ┣ page      // 页面存放模块
┃ ┃  ┃
┃ ┃  ┗ dome    // 页面模块示例，实际名称自己定，该文件夹的名称将是页面的名称
┃ ┃    ┃
┃ ┃    ┣ css        // 该页面的 css
┃ ┃    ┃ ┃  ## 可随意修改
┃ ┃    ┃ ┗ main.pcss    // 样式，需手动在 js 中导入
┃ ┃    ┃
┃ ┃    ┣ js         // 该页面的 js
┃ ┃    ┃ ┃
┃ ┃    ┃ ┗ main.js     // 该页面的入口 js 文件，固定的入口，首先检查该入口
┃ ┃    ┃
┃ ┃    ┗ index.html // 该页面的内容，固定的文件
┃ ┃
┃ ┣ static      // 静态资源,页面内的静态内容应放在页面的 static 中
┃ ┃ ┃
┃ ┃ ┗ img
┃ ┃   ┃
┃ ┃   ┗ favicon.png // 图标
┃ ┃
┃ ┗ index.html  // 根目录入口文件,请指定它跳转到你的首页中,首页不该是这个
┃
┣ package.json
┣ postcss.config.js     // postcss 配置文件
┣ webpack.conf.js       // webpack 公共配置
┣ webpack.dev.js        // webpack 开发用配置
┗ webpack.prod.js       // webpack 生产配置
</pre>

可通过 **WIKI** 学习原理和使用

## 使用方法
下载或 clone 本项目，直接解压作为项目文件夹然后按照下列提示即可

**建议克隆 release 分支，或者去发行版下载<br/>
配置完成后可以使用 package.json 中声明的 debug / bulic 命令运行 webpack**

需要先安装 **Node.js** ，自行百度

在项目文件夹中运行 `npm -y init` 初始化

## 安装 **webpack**
```
npm install webpack webpack-cli webpack-dev-server -g
```

## 安装项目依赖
```
npm install --save-dev
```

## 额外
### 安装 **postcss**
```
npm install postcss-cli -g
```
### 使用的 **postcss** 模块
```
autoprefixer
postcss-import
postcss-apply
postcss-nested
```
> 不使用可以无视 

## 分支说明
**dev**：当前的开发分支，不建议 clone 本分支

**master**：当前主分支，稳定版的源码

**release**：当前发布分支，发行版的源码

## 提供bug反馈或建议
- [码云Gitee](https://gitee.com/fybug/aout.ass)
- [Github](https://github.com/fybug/aout.ass)
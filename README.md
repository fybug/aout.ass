# aout.ass
**v 0.0.4**

用于 **webpack** 的手脚架,以每一个页面及相关文件作为一个模块搭建

内置一个轻量级 js 开发框架及 **postcss**、**jquery** 支持

不建议使用 **sass** 和 **less**

可自行往内部添加需要的框架和模块

# 架构
<pre>
┃
┣ build // 编译文件夹
┣ conf
┃ ┃
┃ ┣ config    // webpack 配置生成配置（对，配置生成器的配置），可自定义修改内部
┃ ┣ INCL      // webpack 配置生成函数相关文件夹，建议别看
┃ ┃
┃ ┗ run.js    // 添加页面和模块的 js 
┃
┣ src   // 源码
┃ ┃
┃ ┣ lib       // 该网站中公共部分
┃ ┃ ┃
┃ ┃ ┣ css      // 公共样式文件夹，样式在 style.js 中导入
┃ ┃ ┃ ┃
┃ ┃ ┃ ┣ main.pcss     // 框架样式
┃ ┃ ┃ ┗ project.pcss  // 项目样式
┃ ┃ ┃
┃ ┃ ┣ static   // 全局静态资源，比如字体
┃ ┃ ┃
┃ ┃ ┗ js       // 公共 js 文件夹，自带的模块已经默认导入
┃ ┃    ┃
┃ ┃    ┣ main.js        // 公共模块入口文件
┃ ┃    ┣ style.js       // 公共样式导入文件，较大的样式和外部框架的样式建议单独开模块导入
┃ ┃    ┃
┃ ┃    ┣ lib            // 框架自带函数库( 测试 )，如需使用可手动导入
┃ ┃    ┗ INCL           // 导入库，建议外部框架放这里
┃ ┃
┃ ┣ page      // 页面存放模块
┃ ┃  ┃
┃ ┃  ┗ dome    // 页面模块示例，实际名称自己定，需在 conf/run.js 中导入该模块
┃ ┃      ┃
┃ ┃      ┣ css        // 该页面的 css
┃ ┃      ┃ ┃
┃ ┃      ┃ ┗ main.pcss    // 示例样式，样式需在 js 中导入
┃ ┃      ┃
┃ ┃      ┣ js         // 该页面的 js
┃ ┃      ┃ ┃
┃ ┃      ┃ ┗ main.js     // 该页面的入口 js 文件，编译时会以该文件为入口
┃ ┃      ┃ ┗ main_css.js // 该页面的样式导入文件，编译时会自动加入该界面的模块中
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

# 安装
需要先安装 **Node.js** ，自行百度

在项目文件夹中运行 `npm -y init` 初始化

## 安装 **webpack** 和开发用 **dev-server**
**webpack** 很好用的
```
npm install webpack webpack-cli webpack-dev-server -g
```

### 安装项目依赖
```
npm install --save-dev
```
## 安装 **postcss**
本项目建议使用 **postcss** 
```
npm install postcss-cli -g
```
> 别用 **sass** 和 **less** 了好好用 **css3** 的新特性吧

### 使用的 **postcss** 模块
```
autoprefixer
postcss-import
cssnano
postcss-apply
postcss-nested
```

# 使用
直接解压作为项目文件夹即可

在 `/src/page/` 中按照示例的 `main` 文件夹的格式新建文件夹即可
## 额外
内置正在测试的轻量级框架，在 `src/lib/js/lib` 中均可在 **INCL.js** 中导入，但部分建议作为模块单独导入。以充分利用 **http2** 的多路复用特性

# 参与
一个人的力量是有限的，一个项目终究需要大家一起完善

· fork 本仓库

· 新建 add_*** 分支 

· 提交等待合并
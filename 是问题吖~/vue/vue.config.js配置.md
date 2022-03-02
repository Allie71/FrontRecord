```
const name = "办案中心管理系统";

const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const chalk = require('chalk');

module.exports = {
    // 配置多页面
	pages: {
		index:{
			entry:'src/views/caseCenter/main.js',
			title: name
		},
	},
	configureWebpack: {
		plugins:[
			new ProgressBarPlugin({
				format:' build [:bar] ' + chalk.green.bold(':percent') + ' (:elapsed seconds)',

                // clear 选项，以清除完成时的栏，默认为true
				clear: false
			})
		],
	},

    // 该选项在系统的 CPU 有多于一个内核时自动启用，仅作用于生产构建. 通过核心包 os 的 cpus 函数
	parallel: require('os').cpus().length > 1,

    // 把productionSourceMap 置为false，既可以减少包大小，也可以加密源码。这样打包后文件小而且别人看不到你的源码了
	productionSourceMap: false,
};
```
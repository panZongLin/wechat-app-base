/**
 * 状态管理 omix
 * https://github.com/Tencent/omi/tree/master/packages/omix
 */
import base from 'store-base.js'
import logs from 'store-logs.js'

const store = {
	data: {
		base: base,
		logs: logs
	},
	debug: true, //调试开关，打开可以在 console 面板查看到 store 变化的 log
  	updateAll: false //当为 true 时，无脑全部更新，组件或页面不需要声明 use
}

export default store;
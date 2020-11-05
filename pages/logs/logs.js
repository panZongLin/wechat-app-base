import create from '../../utils/create'
import store from '../../store/index'

const util = require('../../utils/util.js')

create.Page(store, {
	use: ['logs.logsArr'],
	onLoad: function () {
		this.store.data.logs.logsArr = (wx.getStorageSync('logs') || []).map(log => {
			return util.formatTime(new Date(log))
		})
	}
})

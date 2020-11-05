import create from '../../utils/create'

create.Component({
	use: ['logs.logsArr'],
	computed: {
		logsLength() {
			return wx.getStorageSync('logs').length
		}
	}
})

import create from '../../utils/create';
import store from '../../store/index';

//获取应用实例
const app = getApp();

create.Page(store, {
	data: {
		testValue: 12345,
		welcomeVisible: true
	},
	use: [
		'base.Hello',
		'base.userInfo',
		'base.hasUserInfo',
		'base.canIUse',
		'base.newProp'
	],
	computed: {
		reverseHello() {
			return this.base.Hello.split('').reverse().join('')
		}
	},	
	onLoad: function () {
		if (app.globalData.userInfo) {
			this.store.data.base.userInfo = app.globalData.userInfo
			this.store.data.base.hasUserInfo = true

		} else if (this.data.canIUse) {
			app.userInfoReadyCallback = res => {
				this.store.data.base.userInfo = res.userInfo
				this.store.data.base.hasUserInfo = true
			}
		} else {
			// 不能使用 wx.canIUse('button.open-type.getUserInfo')时的兼容处理
			wx.getUserInfo({
				success: res => {
					app.globalData.userInfo = res.userInfo
					this.store.data.base.userInfo = res.userInfo
					this.store.data.base.hasUserInfo = true
				}
			})
		}

		setTimeout(() => {
			this.store.data.base.Hello = 'Hello World'
		}, 1000)

		setTimeout(() => {
			this.store.set(this.store.data.base, 'newProp', 'newPropValue')
		}, 1000)

		console.log('this.store', this.store);
		console.log('this.data', this.data);
	},
	getUserInfo: function(e) {
		this.store.data.base.userInfo = e.detail.userInfo
		this.store.data.base.hasUserInfo = true
	},

	goTo: function() {
		wx.navigateTo({
			url: '../logs/logs',
			fail: function(res) {
				wx.showToast({
					title: res.errMsg,
					icon: 'none',
					duration: 2000
				})
			}
		})
	},
	cancelDialogButton: function(action) { 
		console.log('action', action) 
		this.setData({'welcomeVisible': false})
	}
})

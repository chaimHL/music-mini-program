// components/navigation/navigation.ts
const app = getApp()
Component({
  data: {
    statusBarHeight: 20
  },
  lifetimes: {
    attached() {
      const { statusBarHeight } = app.globalData.windowInfo
      this.setData({
        statusBarHeight
      })
    }
  },
  methods: {
    back() {
      wx.navigateBack()
    }
  }
})
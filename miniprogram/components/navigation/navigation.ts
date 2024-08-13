// components/navigation/navigation.ts
const app = getApp()
Component({
  properties: {

  },
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
  }
})
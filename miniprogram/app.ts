// app.ts
App<IAppOption>({
  globalData: {
    windowInfo: {}
  },
  onLaunch() {
    const windowInfo = wx.getWindowInfo()
    this.globalData.windowInfo = windowInfo
  }
})
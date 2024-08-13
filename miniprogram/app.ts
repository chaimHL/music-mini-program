// app.ts
App<IAppOption>({
  globalData: {
    windowInfo: {}
  },
  onLaunch() {
    const windowInfo = wx.getWindowInfo()
    console.log(windowInfo);

    this.globalData.windowInfo = windowInfo
  }
})
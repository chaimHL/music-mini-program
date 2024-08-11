import { topMv } from "../../services/requsets/mv"

// pages/tabbar-video/tabbar-video.ts
Page({
  data: {
    mvList: [] as any[],
    offset: 0,
    hasMore: true
  },
  onLoad() {
    this.getMvList()
  },
  onReachBottom() {
    if (this.data.hasMore) {
      this.getMvList()
    }
  },
  async onPullDownRefresh() {
    this.setData({
      mvList: [],
      offset: 0,
      hasMore: true
    })
    await this.getMvList()
    wx.stopPullDownRefresh()
  },
  // 获取 mv 列表数据
  async getMvList() {
    try {
      const res = await topMv(this.data.offset)
      this.setData({
        mvList: [...this.data.mvList, ...res.data] || [],
        hasMore: res.hasMore
      })
      this.data.offset = this.data.mvList.length
    } catch (error) {
      console.log(error)
    }
  }
})
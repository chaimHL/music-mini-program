import { topMv } from "../../services/requsets/mv"

// pages/tabbar-video/tabbar-video.ts
Page({
  data: {
    mvList: []
  },
  onLoad() {
    this.getMvList()
  },
  // 获取 mv 列表数据
  getMvList() {
    topMv()
      .then(res => {
        this.setData({
          mvList: res.data || []
        })
      })
      .catch(err => console.log(err))
  }
})
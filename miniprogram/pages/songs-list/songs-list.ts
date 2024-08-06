// pages/songs-list/songs-list.ts
import playlist from '../../services/requsets/playlist'

Page({
  data: {
    list: [] as any[]
  },
  onLoad() {
    this.getTags()
  },
  // 获取分类标题
  async getTags() {
    const res = await playlist.hot()
    const tags = res.tags
    const promiseList = []
    for (const tag of tags) {
      const p = playlist.topList(tag.name)
      promiseList.push(p)
    }
    Promise.all(promiseList)
      .then(res => {
        this.setData({
          list: res || []
        })
      })
      .catch(err => console.log(err))
  }
})
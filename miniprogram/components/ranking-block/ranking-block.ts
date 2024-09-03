// components/ranking-block/ranking-block.ts
Component({
  properties: {
    rankingList: null
  },
  methods: {
    // 点击了巅峰榜
    onTapRanking() {
      const { ToplistType } = this.properties.rankingList
      wx.navigateTo({
        url: `/packageMusic/pages/more-songs/more-songs?type=ranking&toplistType=${ToplistType}`
      })
    }
  }
})
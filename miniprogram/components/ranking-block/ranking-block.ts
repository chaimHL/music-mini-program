// components/ranking-block/ranking-block.ts
Component({
  properties: {
    rankingList: {
      type: Object,
      value: {}
    }
  },
  methods: {
    // 点击了巅峰榜
    onTapRanking() {
      const { ToplistType } = this.properties.rankingList
      wx.navigateTo({
        url: `/pages/more-songs/more-songs?type=ranking&toplistType=${ToplistType}`
      })
    }
  }
})
// components/more-songs-item/more-songs-item.ts
const db = wx.cloud.database()
const starCollection = db.collection('c_star')
const likeCollection = db.collection('c_like')
Component({
  properties: {
    itemData: {
      type: Object,
      value: {}
    },
    index: {
      type: Number,
      value: 0
    }
  },
  methods: {
    onTapSong() {
      const id = this.properties.itemData.id
      wx.navigateTo({
        url: `/packageMusic/pages/music-play/music-play?id=${id}`
      })
    },
    onTapMore() {
      wx.showActionSheet({
        itemList: ['收藏', '喜欢'],
        success: (res) => {
          const { tapIndex } = res
          this.processMoreAction(tapIndex)
        }
      })
    },

    // 处理点击了收藏或喜欢
    async processMoreAction(index: number) {
      let res = null
      switch (index) {
        case 0: // 收藏
          res = await starCollection.add({
            data: this.properties.itemData
          })
          break

        case 1: // 喜欢
          res = await likeCollection.add({
            data: this.properties.itemData
          })
          break
      }
      if (res) {
        const title = index === 0 ? '收藏' : '喜欢'
        wx.showToast({
          title: title + '成功',
          icon: 'success',
          duration: 2000
        })
      }
    }
  }
})
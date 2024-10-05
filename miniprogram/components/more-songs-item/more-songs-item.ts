// components/more-songs-item/more-songs-item.ts
import { starCollection, likeCollection, songSheetCollection, db } from '../../utils/index'

Component({
  properties: {
    itemData: {
      type: Object,
      value: {}
    },
    index: {
      type: Number,
      value: 0
    },
    songSheet: {
      type: Array,
      value: []
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
        itemList: ['收藏', '喜欢', '加入歌单'],
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
          res = await starCollection.add(this.properties.itemData)
          break

        case 1: // 喜欢
          res = await likeCollection.add(this.properties.itemData)
          break

        case 2: // 加入歌单
          const itemList = this.properties.songSheet.map(item => item.name)
          wx.showActionSheet({
            itemList,
            success: (res) => {
              const { tapIndex } = res
              this.processAddSongSheet(tapIndex)
            }
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
    },

    // 处理加入歌单
    async processAddSongSheet(tapIndex: number) {
      // 获取选择的歌单
      const sheet = this.properties.songSheet[tapIndex]
      const _ = db.command
      const res = await songSheetCollection.update(sheet._id, {
        songs: _.push(this.properties.itemData)
      })
      if (res) {
        wx.showToast({
          title: '添加成功',
          icon: 'success',
          duration: 2000
        })
      }
    }
  }
})
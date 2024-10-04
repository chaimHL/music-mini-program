// 歌单
import { observable, action } from 'mobx-miniprogram'
import { songSheetCollection } from '../utils/index'

export const songSheetStore = observable({
  songSheet: [] as any[],
  setSongSheet: action(function (this: any) {
    songSheetCollection.query({}).then(res => {
      this.songSheet = res.data || []
    })
  })
})

// 歌单
import { observable, action } from 'mobx-miniprogram'

export const songSheetStore = observable({
  songSheet: [] as any[],
  setSongSheet: action(function (this: any, arr: any[]) {
    this.songSheet = arr || []
  })
})

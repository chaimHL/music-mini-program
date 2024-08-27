import { observable, action } from 'mobx-miniprogram'

export const playListStore = observable({
  playMusicList: [] as any[],
  setPlayMusicList: action(function (this: any, arr: any[]) {
    this.playMusicList = arr
  })
})
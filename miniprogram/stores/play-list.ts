import { observable, action } from 'mobx-miniprogram'

export const playListStore = observable({
  playMusicList: [] as any[],
  playMusicIndex: -1,
  setPlayMusicList: action(function (this: any, arr: any[]) {
    this.playMusicList = arr
  }),
  setplayMusicIndex: action(function (this: any, index: number) {
    this.playMusicIndex = index
  })
})
import { observable, action } from 'mobx-miniprogram'

export const recommendedSongsStore = observable({
  playlist: [] as any[],
  get theFirst6Songs() {
    return this.playlist.slice(0, 6)
  },
  setPlayList: action(function (this: any, list: any[]) {
    this.playlist = list
  })
})
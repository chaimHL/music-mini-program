import { observable, action } from 'mobx-miniprogram'

export const musicChartsStore = observable({
  newSongList: {},
  originalSongList: {},
  soaringSongList: {},
  newSong: action(function (this: any, obj: any) {
    this.newSongList = obj || {}
  }),
  originalSong: action(function (this: any, obj: any) {
    this.originalSongList = obj || {}
  }),
  soaringSong: action(function (this: any, obj: any) {
    this.soaringSongList = obj || {}
  }),
})
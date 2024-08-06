import { observable, action } from 'mobx-miniprogram'

export const musicChartsStore = observable({
  newSongList: [] as any[],
  originalSongList: [] as any[],
  soaringSongList: [] as any[],
  newSong: action(function (this: any, list: any[]) {
    this.newSongList = list
  }),
  originalSong: action(function (this: any, list: any[]) {
    this.originalSongList = list
  }),
  soaringSong: action(function (this: any, list: any[]) {
    this.soaringSongList = list
  }),
})
// pages/music-play/components/lyric.ts
Component({
  properties: {
    lrc: {
      type: Array,
      value: []
    },
    currentLrcIndex: {
      type: Number,
      value: -1
    },
    scrollTop: {
      type: Number,
      value: 0
    }
  }
})
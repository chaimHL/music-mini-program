// pages/music-play/components/music/music.ts

Component({
  properties: {
    songData: {
      type: Object,
      value: {}
    },
    controlData: {
      type: Object,
      value: {}
    }
  },
  methods: {
    onSliderChange(event: WechatMiniprogram.SliderChange) {
      // 获取滑块相对位置
      const value = event.detail.value
      this.triggerEvent('sliderChange', { value })
    }
  }
})
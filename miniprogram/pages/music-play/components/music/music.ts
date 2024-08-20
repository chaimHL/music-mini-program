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
    // 完成一次拖动后，或者点击改变滑块位置时触发的事件，
    onSliderChange(event: WechatMiniprogram.SliderChange) {
      // 获取滑块相对位置
      const value = event.detail.value
      this.triggerEvent('sliderChange', { value })
    },
    // 拖动过程中触发的事件
    onSliderChanging(event: WechatMiniprogram.SliderChange) {
      const value = event.detail.value
      this.triggerEvent('sliderChanging', { value })
    }
  }
})
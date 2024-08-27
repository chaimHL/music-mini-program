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
    },
    isPaused: {
      type: Boolean,
      value: false
    },
    currentLrc: {
      type: String,
      value: ''
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
    },
    // 点击播放或暂停按钮
    onTapPlayOrPause() {
      this.triggerEvent('playOrPause')
    },
    // 点击了播放上一首
    tapPrev() {
      this.triggerEvent('changeMusic', { isNext: false })
    },
    // 点击了播放下一首
    tapNext() {
      this.triggerEvent('changeMusic', { isNext: true })
    }
  }
})
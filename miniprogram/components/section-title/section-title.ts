// components/section-title/section-title.ts
Component({
  properties: {
    title: {
      type: String,
      value: ''
    },
    showMore: {
      type: Boolean,
      value: true
    }
  },
  methods: {
    onTapMore() {
      this.triggerEvent('tapMore')
    }
  }
})
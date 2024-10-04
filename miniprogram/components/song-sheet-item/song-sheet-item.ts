// components/song-sheet-item/song-sheet-item.ts
Component({
  properties: {
    item: {
      type: Object,
      value: {}
    }
  },

  methods: {
    onDelete(event: WechatMiniprogram.CustomEvent) {
      this.triggerEvent('deleteSongSheet', { id: event.currentTarget.dataset.id })
    }
  }
})
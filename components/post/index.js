// components/post/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    item: Object
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    onDetail(event) {
      wx.navigateTo({
        url: `/pages/post-detail/index?id=${event.currentTarget.dataset.id}`,
      })
    }
  }
})
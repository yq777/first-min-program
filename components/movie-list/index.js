// components/movie-item/index.js

Component({
  /**
   * 组件的属性列表
   */
  externalClasses: ['f-class'],
  properties: {
    movies: Object,
    title: String,
    url: String,
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
    onMore(event) {
      wx.navigateTo({
        url: `/pages/more-movie/index?type=${this.properties.url}&title=${this.properties.title}`,
      })
    }
  }
})
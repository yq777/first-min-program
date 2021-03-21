// components/movie/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    movie: Object
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
      const {
        currentTarget
      } = event;
      const {
        dataset
      } = currentTarget;
      wx.navigateTo({
        url: `/pages/movie-detail/index?id=${dataset.id}&title=${this.properties.movie.title}`,
      })
    }
  }
})
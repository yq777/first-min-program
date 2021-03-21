// pages/movie-detail/index.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    _title: void 0,
    detail: {},
    convertNames: '',
    genres: '',
    conturies: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data._title = options.title;
    wx.request({
      url: `${app.baseUrl}subject/${options.id}`,
      success: (res) => {
        console.log(res.data)
        this.setData({
          detail: res.data,
          convertNames: res.data.casts.map(item => item.name).join("/"),
          genres: res.data.genres.join("、"),
          conturies: res.data.countries.join(" ")
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.setNavigationBarTitle({
      title: this.data._title,
    })
  },

  previewImg(event) {
    wx.previewImage({
      urls: [event.currentTarget.dataset.src],
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
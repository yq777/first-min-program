// pages/more-movie/index.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    movies: [],
    _type: void 0,
    _haveMore: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const {
      type,
      title
    } = options;
    wx.showNavigationBarLoading();
    wx.request({
      url: `${app.baseUrl}${type}?start=0&count=9`,
      success: (res) => {
        this.data._haveMore = res.data.subjects.length < res.data.total;
        this.setData({
          movies: res.data.subjects || [],
        });
        wx.hideNavigationBarLoading();
      }
    });
    this.data._type = type;
    this.data._title = title;
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.setNavigationBarTitle({
      title: this.data._title,
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
    console.log("refresh");
    wx.request({
      url: `${app.baseUrl}${this.data._type}?start=0&count=9`,
      success: (res) => {
        const subjects = res.data.subjects;
        this.data._haveMore = subjects.length < res.data.total;
        this.setData({
          movies: subjects,
        })
        wx.stopPullDownRefresh()
      }
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (this.data._haveMore) {
      wx.showNavigationBarLoading();
      wx.request({
        url: `${app.baseUrl}${this.data._type}?start=${this.data.movies.length}&count=9`,
        success: (res) => {
          const subjects = res.data.subjects;
          this.data._haveMore = [...this.data.movies, ...subjects].length < res.data.total;
          this.setData({
            movies: [...this.data.movies, ...subjects],
          })
          wx.hideNavigationBarLoading();
        }
      })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
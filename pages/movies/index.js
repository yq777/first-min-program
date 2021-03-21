// pages/movies/index.js
const SUBJECTS = ['正在热映', '即将上映', '悬疑', '国外', '内地'];
const URL = ['in_theaters', 'coming_soon', 'top250', 'in_theaters', 'top250'];
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    subjects: [],
    searchFlag: false,
    searchList: [],
    _searchValue: "",
    _hasMore: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showNavigationBarLoading();
    wx.request({
      url: `${app.baseUrl}in_theaters`,
      success: (res) => {
        const movies = res.data.subjects || [];
        this.setData({
          list: movies
        })
        const subjects = [];
        for (let i = 0; i < movies.length; i++) {
          if (i % 3 === 0) {
            subjects.push({
              title: SUBJECTS[~~(i / 3)],
              movies: [movies[i]],
              url: URL[~~(i / 3)]
            })
          } else {
            subjects[~~(i / 3)].movies.push(movies[i])
          }
        }
        this.setData({
          subjects
        })
        wx.hideNavigationBarLoading();
      }
    })
  },
  onSearch(event) {
    const {
      detail
    } = event;
    wx.showNavigationBarLoading();
    wx.request({
      url: `${app.baseUrl}search`,
      data: {
        q: detail.value,
        start: 0
      },
      success: (res) => {
        this.setData({
          searchList: res.data.subjects || [],
          searchFlag: true
        });
        this.data._hasMore = res.data.subjects.length < res.data.total;
        this.data._searchValue = detail.value;
        wx.hideNavigationBarLoading();
      }
    })
  },
  onCancel() {
    this.setData({
      searchFlag: false
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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
    if (this.data._hasMore) {
      wx.showNavigationBarLoading();
      wx.request({
        url: `${app.baseUrl}search`,
        data: {
          q: this.data._searchValue,
          start: this.data.searchList.length,
        },
        success: (res) => {
          const subjects = res.data.subjects;
          this.data._hasMore = [...this.data.searchList, ...subjects].length < res.data.total;
          this.setData({
            searchList: [...this.data.searchList, ...subjects],
          });
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
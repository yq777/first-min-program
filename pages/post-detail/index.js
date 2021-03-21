// pages/post-detail/index.js
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    detail: {},
    player: false,
    _mgr: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const id = options.id;
    const collected = JSON.parse(wx.getStorageSync('collected') || '{}');
    this.setData({
      detail: app.globalData.postList.find(item => item.postId === (+id || 0)) || {},
      collectedFlag: !!collected[id],
      player: app.globalData.player[id]
    })
    const mgr = wx.getBackgroundAudioManager();
    this.data._mgr = mgr;
    mgr.onPause(() => {
      app.globalData.player = {
        [`${id}`]: false
      };
      this.setData({
        player: false
      });
      mgr.stop()
    });
    mgr.onPlay(() => {
      app.globalData.player = {
        [`${id}`]: true
      };
      this.setData({
        player: true
      })
    })
  },

  onCollection(event) {
    const collected = JSON.parse(wx.getStorageSync('collected') || '{}')
    const flag = !collected[this.data.detail.postId];
    const postId = this.data.detail.postId;
    wx.setStorageSync('collected', JSON.stringify({
      ...collected,
      [`${postId}`]: flag
    }));
    this.setData({
      collectedFlag: flag
    });
    wx.showToast({
      title: flag ? '收藏成功' : '取消收藏',
    })
  },

  onShare(event) {
    wx.showActionSheet({
      itemList: ['分享到朋友圈', '分享到QQ', '分享到微博'],
      success(res) {
        console.log(res, 'success')
      },
      fail(res) {
        console.log(res, "fail")
      }
    })
  },

  onMusic(event) {
    this.data._mgr.src = this.data.detail.music.url;
    this.data._mgr.title = this.data.detail.music.title;
    this.data._mgr.coverImgUrl = this.data.detail.music.coverImg;
    if (this.data.player) {
      this.data._mgr.stop()
    } else {
      this.data._mgr.play()
    }
    app.globalData.player = {
      [`${this.data.detail.postId}`]: !this.data.player
    };
    this.setData({
      player: !this.data.player
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
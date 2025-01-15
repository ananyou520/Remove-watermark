Component({
  properties: {},
  methods: {
    clearCache: function() {
      wx.showActionSheet({
        itemList: ["清理缓存"],
        success(res) {
          wx.showLoading({
            title: '清理中',
          });
          wx.clearStorage();
          wx.hideLoading();
          wx.showToast({
            title: "清理成功",
            icon: 'success',
            duration: 2000
          });
        }
      })
    },
    addDesktop: function() {
      this.setData({
        isShowMask: !0
      })
    },
    hideMask: function() {
      this.setData({
        isShowMask: !1
      })
    },
    openSettingClicked: function() {
      wx.openSetting({
        success: function(e) {},
        fail: function(e) {
          wx.showToast({
            icon: "none",
            title: "打开权限管理失败~"
          });
        }
      });
    },
  }
})
var e = require("../../../C26774871B34E4DFA4011C806D76A052.js");

Component({
    data: {
        xiugaistate: 1,
        adid: "",
        urldata: "",
        oldmd5: "",
        newmd5: "",
        durationtime: "",
        videosize: "",
        tishitext: "点击上方+号添加视频修改MD5",
        
    },
    methods: {
        
        onShow: function() {},
        onShareAppMessage: function(e) {
            return {
                title: getApp().globalData.shareTitle,
                path: "/pages/index/index",
                imageUrl: getApp().globalData.sharePic
            };
        },
        onShareTimeline: function () {
            var that = this;
            var id= wx.getStorageSync('id')
            return {
              title: that.data.noticedetail[0].title, 
              query: 'id= ' + id,   
              imageUrl: that.data.noticedetail[0].thumb
            }
          },
        addvideobutton: function() {
            var t = this;
            wx.chooseVideo({
                sourceType: [ "album" ],
                success: function(i) {
                    var s = e.duration(i.duration), a = e.kb(i.size), n = wx.getFileSystemManager();
                    wx.getFileInfo({
                        filePath: i.tempFilePath,
                        success: function(e) {
                            t.setData({
                                oldmd5: e.digest,
                                durationtime: s,
                                videosize: a
                            });
                        }
                    }), n.saveFile({
                        tempFilePath: i.tempFilePath,
                        filePath: wx.env.USER_DATA_PATH + "/test.mp4",
                        success: function(e) {
                            n.appendFile({
                                filePath: wx.env.USER_DATA_PATH + "/test.mp4",
                                data: "01",
                                success: function(e) {
                                    wx.getFileInfo({
                                        filePath: wx.env.USER_DATA_PATH + "/test.mp4",
                                        success: function(e) {
                                            "getFileInfo:ok" == e.errMsg && t.setData({
                                                newmd5: e.digest,
                                                urldata: wx.env.USER_DATA_PATH + "/test.mp4",
                                                xiugaistate: 2
                                            });
                                        }
                                    });
                                }
                            });
                        }
                    });
                }
            });
        },
        resetvideo: function() {
            var e = this;
            wx.getFileSystemManager().unlink({
                filePath: wx.env.USER_DATA_PATH + "/test.mp4",
                success: function(t) {
                    "unlink:ok" == t.errMsg && e.setData({
                        xiugaistate: 1
                    });
                }
            });
        },
        savevideo: function() {
            var e = this, t = wx.getFileSystemManager();
            wx.saveVideoToPhotosAlbum({
                filePath: wx.env.USER_DATA_PATH + "/test.mp4",
                success: function(i) {
                    "saveVideoToPhotosAlbum:ok" == i.errMsg && t.unlink({
                        filePath: wx.env.USER_DATA_PATH + "/test.mp4",
                        success: function(t) {
                            wx.showModal({
                                title: "温馨提示",
                                content: "视频保存成功\r\n请到手机相册中查看",
                                confirmColor: "#52bcff",
                                showCancel: !1,
                                success: function(t) {
                                    that.up();
                                }
                            });
                            "unlink:ok" == t.errMsg && e.setData({
                                xiugaistate: 1,
                                tishitext: "点击上方+号添加视频修改MD5"
                            });
                        }
                    });
                },
                fail: function(t) {
                    "saveVideoToPhotosAlbum:fail auth deny" == t.errMsg ? wx.showModal({
                        title: "保存失败",
                        content: "你需要设置授权保存到相册",
                        cancelText: "不设置",
                        confirmText: "去设置",
                        success: function(e) {
                            e.confirm ? wx.openSetting({
                                success: function(e) {}
                            }) : e.cancel;
                        }
                    }) : "saveVideoToPhotosAlbum:fail invalid video" == t.errMsg && e.setData({
                        tishitext: "视频保存失败,联系客服修复"
                    });
                }
            });
        }
    }
});
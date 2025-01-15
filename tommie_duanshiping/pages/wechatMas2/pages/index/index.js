var e, i = require("../../../../../A51C0D911B34E4DFC37A65969A07A052.js")(require("../../../../../4599F4B31B34E4DF23FF9CB45007A052.js")), s = getApp();

Page((e = {
    data: {
        motto: "微信遮罩层显示",
        userInfo: {},
        hasUserInfo: !1,
        canIUse: wx.canIUse("button.open-type.getUserInfo"),
        flag: !0,
        isPic: !1,
        videolist: [],
        list: [],
        isAudit: 1,
        tuijian: [],
        url: "",
        invite_award: "",
        shareTitle: "",
        imageUrl: "",
        show: !1,
        news_id: 12
    },
    onLoad: function(t) {}
}, (0, i.default)(e, "onLoad", function(a) {
    if (wx.getStorageSync("invita_openid").length < 5) {
        var e = a.openid || "";
        wx.setStorageSync("invita_openid", e);
    }
    this.pageRequest(t);
}), (0, i.default)(e, "onShow", function(t) {}), (0, i.default)(e, "onPullDownRefresh", function() {
    this.setData({
        videolist: [],
        list: []
    }), t = 1, this.pageRequest(t);
}), (0, i.default)(e, "pageRequest", function(e) {
    var i = this;
    a.util.request({
        url: "entry/wxapp/video",
        data: {
            pages: e
        },
        success: function(a) {
            console.log(a.data), wx.setNavigationBarTitle({
                title: "0" == a.data.data.isaudit.isaudit ? "热门推荐" : "热门推荐"
            }), i.setData({
                isAudit: a.data.data.isaudit.isaudit,
                tuijian: a.data.data.tuijian,
                url: a.data.data.url,
                invite_award: a.data.data.isaudit.invite_award,
                shareTitle: a.data.data.isaudit.share_title,
                imageUrl: a.data.data.isaudit.share_img
            }), 0 == a.data.data.length ? i.setData({
                list: a.data.data.videolist,
                show: !0
            }) : (i.setData({
                list: a.data.data.videolist,
                videolist: i.data.videolist.concat(a.data.data.videolist)
            }), t++);
        }
    });
}), (0, i.default)(e, "loadMore", function() {
    0 == this.data.list.length || this.pageRequest(t);
}), (0, i.default)(e, "onShareAppMessage", function(t) {
    return t.from, {
        title: this.data.shareTitle,
        path: "/tommie_duanshiping/pages/index/index?openid=" + wx.getStorageSync("share_openid"),
        imageUrl: this.data.url + this.data.imageUrl
    };
}), (0, i.default)(e, "bindViewTap", function() {
    wx.navigateTo({
        url: "../logs/logs"
    });
}), (0, i.default)(e, "onLoad", function() {
    var t = this;
    s.globalData.userInfo ? this.setData({
        userInfo: s.globalData.userInfo,
        hasUserInfo: !0
    }) : this.data.canIUse ? s.userInfoReadyCallback = function(a) {
        t.setData({
            userInfo: a.userInfo,
            hasUserInfo: !0
        });
    } : wx.getUserInfo({
        success: function(a) {
            s.globalData.userInfo = a.userInfo, t.setData({
                userInfo: a.userInfo,
                hasUserInfo: !0
            });
        }
    });
}), (0, i.default)(e, "getUserInfo", function(t) {
    console.log(t), s.globalData.userInfo = t.detail.userInfo, this.setData({
        userInfo: t.detail.userInfo,
        hasUserInfo: !0
    });
}), (0, i.default)(e, "showMask", function() {
    this.setData({
        flag: !1
    });
}), (0, i.default)(e, "closeMask", function() {
    this.setData({
        flag: !0
    });
}), (0, i.default)(e, "onLoad", function(t) {
    decodeURIComponent(t.scene);
}), (0, i.default)(e, "getConfirm", function() {}), (0, i.default)(e, "saveImg", function() {
    var t = this;
    console.log(1), wx.getSetting({
        success: function(a) {
            a.authSetting["scope.writePhotosAlbum"] ? t.savePhoto() : wx.authorize({
                scope: "scope.writePhotosAlbum",
                success: function() {
                    t.savePhoto(), t.setData({
                        isPic: !1
                    });
                },
                fail: function(a) {
                    t.setData({
                        isPic: !0
                    });
                }
            });
        }
    });
}), (0, i.default)(e, "handleSetting", function(t) {
    t.detail.authSetting["scope.writePhotosAlbum"] ? (wx.showToast({
        title: "保存成功"
    }), this.setData({
        isPic: !1
    })) : (wx.showModal({
        title: "警告",
        content: "不授权无法保存",
        showCancel: !1
    }), this.setData({
        isPic: !0
    }));
}), (0, i.default)(e, "bindGetUserInfo", function(t) {
    t.detail.userInfo ? console.log(t.detail.userInfo) : console.log("用户点击了取消");
}), (0, i.default)(e, "onShareAppMessage", function() {
    var t = wx.getStorageSync("share_openid");
    return console.log(t), {
        title: "免费去水印工具，支持修改视频MD5，轻轻松松上热门！",
        desc: "免费短视频去水印",
        path: "tommie_duanshiping/pages/index/index?openids=" + t,
        success: function(t) {
            console.log(t);
        },
        fail: function(t) {
            console.log(t);
        }
    };
}), (0, i.default)(e, "tuijian", function() {
 wx.navigateTo({
        url: "../tuijian/index"
    });
}), e));
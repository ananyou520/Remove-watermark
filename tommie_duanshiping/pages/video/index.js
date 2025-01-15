var t = getApp(), a = 1, e = null;

Page({
    data: {
        check_num: "",
        mix_num: "",
        is_guankan: "",
        tjjili: "",
        tuijiangg:"",
        videolist: [],
        list: [],
        isAudit: 1,
        tuijian: [],
        url: "",
        loginState: "1",
        invite_award: "",
        shareTitle: "",
        nowtime: Date.parse(new Date()),
        lastti: "",
        imageUrl: "",
        show: !1,
        is_check: 0,
        view_num: "",
        view_times: ""
    },
    onLoad: function(t) {
        if (wx.getStorageSync("invita_openid").length < 5) {
            var e = t.openid || "";
            wx.setStorageSync("invita_openid", e);
        }
        this.pageRequest(a);
        var n = wx.getStorageSync("lastday"), i = wx.getStorageSync("lastti");
        this.setData({
            lastday: n,
            lastti: i
        });
    },

    onShow: function() {
        var i = this;
        t.util.request({
            url: "entry/wxapp/video",
            data: {
                pages: e
            },
            success: function(t) {
            i.setData({
                yanzheng: wx.getStorageSync("userInfo"),
                 tjjili: t.data.data.isaudit.tjjili
                });
            },
        });
    },

    onPullDownRefresh: function() {
        this.setData({
            videolist: [],
            list: []
        }), a = 1, this.pageRequest(a);
    },
    pageRequest: function(e) {
        var i = this;
        t.util.request({
            url: "entry/wxapp/video",
            data: {
                pages: e
            },
            success: function(t) {
                wx.setNavigationBarTitle({
                    title: "0" == t.data.data.isaudit.isaudit ? "热门推荐" : "热门推荐"
                }), i.setData({
                    isAudit: t.data.data.isaudit.isaudit,
                    check_num: t.data.data.isaudit.check_num,
                    mix_num: t.data.data.isaudit.mix_num,
                    is_guankan : t.data.data.isaudit.is_guankan ,
                    tjjili: t.data.data.isaudit.tjjili,
                    tuijiangg: t.data.data.isaudit.tuijiangg ,
                    tuijian: t.data.data.tuijian,
                    url: t.data.data.url,
                    invite_award: t.data.data.isaudit.invite_award,
                    shareTitle: t.data.data.isaudit.share_title,
                    imageUrl: t.data.data.isaudit.share_img
                }), 0 == t.data.data.length ? i.setData({
                    list: t.data.data.videolist,
                    show: !0
                }) : (i.setData({
                    list: t.data.data.videolist,
                    videolist: i.data.videolist.concat(t.data.data.videolist)
                }), a++);
            },
        });
    },

    qd: function() {
        var t = this;
        if (wx.getStorageSync("userInfo")) {
        if (t.data.tjjili.length>6) {
        var t = this, a = wx.createRewardedVideoAd({
            adUnitId: t.data.tjjili
        });
        a.load().then(function() {
            return a.show();
        }).catch(function(t) {
            return console.log(t.errMsg);
        }), a.onError(function(a) {
            console.log(a), t.copydownurls();
        }), a.onClose(function(e) {
            a.offClose(), e && e.isEnded || void 0 === e ? t.isqd() : wx.showModal({
                title: "温馨提示",
                content: "看完广告后获得\r\n" + t.data.check_num + "次解析次数!",
                showCancel: !0,
                cancelText: "不看了",
                cancelColor: "#52bcff",
                confirmText: "继续看",
                confirmColor: "#ed3f14",
                success: function(a) {
                    a.cancel || t.qd();
                }
            });
        });
    } else {
        t.isqd();
    }
    } else wx.showModal({
        title: "温馨提示",
        content: "请登录后观看",
        showCancel: !0,
        cancelText: "取消",
        cancelColor: "#52bcff",
        confirmText: "确定",
        confirmColor: "#ed3f14",
        success: function(t) {
            t.cancel;
        }
    });
},
VIP: function() {
    wx.navigateTo({
        url: "../keypay/keypay"
    });
},
isqd: function() {
    t.util.request({
        url: "entry/wxapp/check",
        success: function(t) {
            console.log("温馨提示"), wx.showModal({            
                title: "温馨提示",
                content: t.data.message,
                confirmColor: "#00baff",
                showCancel: !1,
                success: function(t) {
                    t.cancel;
                }
            });
        },
        fail: function(t) {
            console.log(t), wx.showModal({
                title: "温馨提示",
                content: t.data.message,
                confirmColor: "#00baff",
                showCancel: !1,
                success: function(t) {
                    t.cancel;
                }
            });
        }
    });
    var a = Number(Date.parse(new Date())) + Number(864e5);
    wx.setStorageSync("lastti", a);
    a = wx.getStorageSync("lastti");
    console.log("次数缓存过期时间", a), this.setData({
        lastti: a
    });
},
    last: function() {
        wx.showModal({
            title: "温馨提示",
            content: "今天已经签到啦\r\n明天再来把",
            showCancel: !0,
            cancelText: "取消",
            cancelColor: "#00baff",
            confirmText: "确定",
            confirmColor: "#ed3f14",
            success: function(t) {
                t.cancel;
            }
        });
    }, 
    
    gologssin: function()
    { wx.switchTab({ url: '../member/index', }) },
    loadMore: function() {
        0 == this.data.list.length || this.pageRequest(a);
    },
    onShareAppMessage: function(t) {
        return t.from, {
            title: this.data.shareTitle,
            path: "/tommie_duanshiping/pages/index/index?openids=" + wx.getStorageSync("share_openid"),
            imageUrl: this.data.url + this.data.imageUrl
        };
    },
    onShareTimeline: function() {
        return {
            title: this.data.shareTitle,
            path: "/tommie_duanshiping/pages/index/index?openid=" + wx.getStorageSync("share_openid"),
            imageUrl: this.data.share_img
        };
    } 
});
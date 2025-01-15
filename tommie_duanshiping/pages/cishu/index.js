function t(t, a, e) {
    return a in t ? Object.defineProperty(t, a, {
        value: e,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[a] = e, t;
}

var a, e = require("../../../C26774871B34E4DFA4011C806D76A052.js"), n = getApp();

Page({
    data: (a = {
        showTopTips: !1,
        color: "#ff9900",
        errorMessage: "错误提示",
        inputvalue: "",
        loginState: 0,
        appname: "",
        title: "",
        description: "",
        buttonjiexi: "recommend",
        qqgourp: "",
        shareTitle: "",
        api_url: "",
        helpUrl: "",
        adId: "",
        share_img: "",
        progress: 0,
        adImg: "",
        adText: "",
        copyText: null,
        isAudit: "0",
        downurl: "",
        isMember: ""
    }, t(a, "progress", ""), t(a, "playurl", ""), t(a, "adUnitIds", ""), t(a, "invite_award", ""), 
    t(a, "jiexibut", ""), a),
    onLoad: function(t) {
        wx.getStorageSync("invita_openid").length < 5 && t.openid;
    },
    onShow: function(t) {
        var a = this;
         a.index(), wx.checkSession({
            success: function(t) {
                console.log("没过期"), a.setData({
                    loginState: 1
                });
            },
            fail: function() {
                console.log("过期了"), a.setData({
                    loginState: 0
                });
            }
        });
    },
    tipKeFuMsg: function(t) {
        wx.playBackgroundAudio({
            dataUrl: "http://tts.baidu.com/text2audio?idx=1&tex=" + encodeURIComponent(this.data.description) + "&cuid=baidu_speech_demo&cod=2&lan=zh&ctp=1&pdt=1&spd=5&per=0&vol=5&pit=5"
        });
    },
    start: function() {
        this.setData({
            color: "#ffb428"
        });
    },
    end: function() {
        this.setData({
            color: "#faa508"
        });
    },
    warn: function() {
        wx.showModal({
            title: "温馨提示",
            content: "请先登陆!",
            confirmColor: "#ff9900",
            showCancel: !1,
            success: function(t) {}
        });
    },
    updateUserInfo: function(t) {
        var a = this;
        t.detail.userInfo ? (a.setData({
            loginState: 1
        }), n.util.getUserInfo(function(t) {
            n.util.request({
                url: "entry/wxapp/login",
                cachetime: "30",
                data: {
                    inviterOpenid: wx.getStorageSync("invita_openid")
                },
                success: function(t) {
                    wx.setStorageSync("share_openid", t.data.data.openid), a.index(), a.query();
                },
                fail: function(t) {
                    a.setData({
                        loginState: 0
                    });
                }
            });
        }, t.detail)) : a.setData({
            loginState: 0
        });
    },
    changeLoginState: function() {
        this.setData({
            loginState: 0
        });
    },
    invalue: function(t) {
        this.setData({
            inputvalue: t.detail.value
        });
    },
    clear: function() {
        this.setData({
            inputvalue: ""
        });
    },
    index: function() {
        var t = this;
        n.util.request({
            url: "entry/wxapp/index",
            success: function(a) {
                console.log(a.data.data), t.setData({
                    title: a.data.data.index.title,
                    appname: a.data.data.index.app_name,
                    description: a.data.data.index.description,
                    qqgourp: a.data.data.index.qq_group,
                    shareTitle: a.data.data.index.share_title,
                    api_url: a.data.data.index.api_url,
                    share_img: a.data.data.url + a.data.data.index.share_img,
                    adId: a.data.data.index.ad_id,
                    invite_award: a.data.data.index.invite_award,
                    adUnitIds: a.data.data.index.adUnitIds,
                    adImg: a.data.data.url + a.data.data.index.adimg,
                    adText: a.data.data.index.adtext,
                    copyText: a.data.data.index.copytext,
                    isAudit: a.data.data.index.isaudit,
                    helpUrl: a.data.data.index.help_url,
                    progress: a.data.data.index.progress,
                    isMember: a.data.data.index.is_member,
                    jiexibut: a.data.data.index.api_url ? "下载视频" : "解析视频"
                }), wx.setNavigationBarTitle({
                    title: a.data.data.index.app_name
                });
            }
        });
    },
    
    onShareAppMessage: function(t) {
        return t.from, {
            title: this.data.shareTitle,
            path: "/tommie_duanshiping/pages/index/index?openid=" + wx.getStorageSync("share_openid"),
            imageUrl: this.data.share_img
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
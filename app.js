var n = require("14A61D721B34E4DF72C075756787A052.js"), e = wx.getAccountInfoSync();

console.log(e.miniProgram.appId), App({
    onLaunch: function() {
        if (wx.setStorageSync("appid", e.miniProgram.appId), wx.canIUse("getUpdateManager")) {
            var n = wx.getUpdateManager();
            n.onCheckForUpdate(function(e) {
                e.hasUpdate && (n.onUpdateReady(function() {
                    wx.showModal({
                        title: "更新提示",
                        content: "新版本已经准备好，是否重启应用？",
                        success: function(e) {
                            e.confirm && n.applyUpdate();
                        }
                    });
                }), n.onUpdateFailed(function() {
                    wx.showModal({
                        title: "已经有新版本了哟~",
                        content: "新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~"
                    });
                }));
            });
        } else wx.showModal({
            title: "提示",
            content: "当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。"
        });
    },
    onShow: function(n) {
        var e = wx.getUpdateManager();
        e.onCheckForUpdate(function(n) {
            console.log(n.hasUpdate);
        }), e.onUpdateReady(function() {
            wx.showModal({
                title: "更新提示",
                content: "新版本已经准备好，是否马上重启小程序？",
                success: function(n) {
                    n.confirm && e.applyUpdate();
                }
            });
        }), e.onUpdateFailed(function() {});
    },
    onError: function(n) {},
    util: n,
    userInfo: {
        sessionid: null
    },
    siteInfo: require("22AA12831B34E4DF44CC7A8436E6A052.js"),
    globalData: {
        api_url: null,
        progress: null,
        ad_shiping: null,
        wxid: null,
        day: null,
        ad: null,
        banner: null
    }
});
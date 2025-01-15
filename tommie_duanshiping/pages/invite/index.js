var t = require("../../../C26774871B34E4DFA4011C806D76A052.js"), e = getApp(), a = 1;

require("../../../692CE4611B34E4DF0F4A8C660427A052.js");

Page({
    data: {
        userlist: [],
        list: [],
        show: !1
    },
    onLoad: function(t) {},
    onReady: function() {},
    onShow: function() {
        this.pageRequest(), a = 0;
    },
    onHide: function() {},
    pageRequest: function() {
        var t = this;
        e.util.request({
            url: "entry/wxapp/invite",
            data: {},
            success: function(e) {
                e.data.data.forEach(function(e) {
                    e.regtime = t.formatTimeTwo(e.regtime);
                }), t.setData({
                    userlist: e.data.data
                });
            }
        });
    },
    loadMore: function() {
        a++, this.setData({
            list: this.data.list.concat(t.page(this.data.userlist, a))
        });
    },
    onShareAppMessage: function() {},
    formatTimeTwo: function(t) {
        var e = new Date(1e3 * parseInt(t)), a = e.getFullYear(), n = e.getMonth() + 1, i = e.getDate(), s = e.getHours(), o = e.getMinutes(), r = e.getSeconds(), u = new Date();
        Date.parse(u.toDateString());
        return a + "-" + n + "-" + i + " " + s + ":" + o + ":" + r;
    }
});
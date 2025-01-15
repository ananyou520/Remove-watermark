var a = getApp();

Page({
    data: {
        loginState: "0",
        headimg: "",
        helpUrl: "",
        nickname: "",
        contact: "",
        qq: "",
        admire_img: "",
        admire_title: "",
        id: "",
        is_pay: "0",
        isAudit: 1,
        isMember: "",
        num: "10",
        endtime:"",
        inviteuum: 0,
        inviteaward: 0,
        onpayenter: "0",
        qq_group: "",
        date: ""
    },
    onLoad: function(a) {
        if (wx.getStorageSync("invita_openid").length < 5) {
            var t = a.openid || "";
            wx.setStorageSync("invita_openid", t);
        }
    },
    onLoad: function() {
        var o = this, t = wx.getStorageSync("ile");
           console.log(t), this.setData({
            avatarUrl:t.userInfo.avatarUrl,
            nickName:t.userInfo.nickName
        });
    },
    onShow: function(t) {
        var e = this;
        wx.checkSession({
            success: function(t) {
                console.log("没过期"), e.setData({
                    loginState: 1
                }), a.util.request({
                    url: "entry/wxapp/member",
                    success: function(a) {
                            console.log(a.data.data),e.setData({
                            app_name: wx.getStorageSync("zw"),
                            yanzheng: wx.getStorageSync("userInfo"),
                            headimg: a.data.data.user.headimg,
                            nickname: a.data.data.user.nickname,
                            contact: a.data.data.contact.contact,
                            qq: a.data.data.contact.qq_num,
                            admire_title: a.data.data.contact.admire_title,
                            admire_img: a.data.data.contact.admire_img,
                            is_pay: a.data.data.contact.is_pay,
                            num: a.data.data.user.maximum,
                            isAudit: a.data.data.contact.isaudit,
                            date: a.data.data.endtime,
                            isMember: a.data.data.contact.is_member,
                            onpayenter: a.data.data.contact.onpayenter,
                            inviteaward: a.data.data.contact.invite_award,
                            helpUrl: a.data.data.contact.help_url,
                            qq_group: a.data.data.contact.qq_group,
                            id: a.data.data.user.id,
                            inviteuum: a.data.data.inviteuum
                        });
                    }
                });
            },
            fail: function() {
                console.log("过期了"), e.setData({
                    loginState: 0
                });
            }
        });
    },
    updateUserInfo: function(t) {
        var e = this;
        t.detail.userInfo ? a.util.getUserInfo(function(t) {
            a.util.request({
                url: "entry/wxapp/login",
                cachetime: "30",
                data: {
                    inviterOpenid: wx.getStorageSync("invita_openid")
                },
                success: function(t) {
                    wx.setStorageSync("share_openid", t.data.data.openid), a.util.request({
                        url: "entry/wxapp/member",
                        cachetime: "300",
                        success: function(a) {
                            console.log(a.data.data), e.setData({
                                headimg: a.data.data.user.headimg,
                                nickname: a.data.data.user.nickname,
                                contact: a.data.data.contact.contact,
                                qq: a.data.data.contact.qq_num,
                                is_pay: a.data.data.contact.is_pay,
                                date: a.data.data.endtime,
                                num: a.data.data.user.maximum,
                                isAudit: a.data.data.contact.isaudit,
                                isMember: a.data.data.contact.is_member,
                                onpayenter: a.data.data.contact.onpayenter,
                                inviteaward: a.data.data.contact.invite_award,
                                helpUrl: a.data.data.contact.help_url,
                                id: a.data.data.user.id,
                                inviteuum: a.data.data.inviteuum
                            });
                            var o = wx.getStorageSync("ile");
                             wx.showModal({
                                title: "温馨提示",
                                content: "获取头像和昵称",
                                confirmColor: "#52bcff",
                                showCancel: !1,
                                success: function(t) {
                                    e.getUserProfile();
                                }
                            });
                        }
                    }), e.setData({
                       yanzheng: 1
                    });
                },
                fail: function(a) {
                    e.setData({
                        yanzheng: 0
                    });
                }
            });
        }, t.detail) : e.setData({
            yanzheng: 0
        });
    },
    warn: function() {
        wx.showModal({
            title: "温馨提示",
            content: "请先登陆!",
            confirmColor: "#ffa500",
            showCancel: !1,
            success: function(a) {}
        });
    },

    copyqq_group: function() {
        wx.setClipboardData({
            data: this.data.qq_group,
            success: function(a) {},
            fail: function(a) {},
            complete: function(a) {}
        });
    },
    business: function() {
        var a = this;
        wx.showModal({
            title: "温馨提示",
            content: "您将复制QQ号:" + a.data.qq,
            confirmColor: "#ffa500",
            showCancel: !1,
            success: function(t) {
                wx.setClipboardData({
                    data: a.data.qq
                });
            }
        });
    },

    success: function(t) {
        console.log(t), wx.setStorage({
          key: "video",
          data: t.data.data
         }), wx.navigateTo({
          url: "../shiping/index"
              });
       },

    getUserProfile: function(e) {
        var t = this;
        wx.getUserProfile({
            desc: "展示用户信息",
            success: function(e) {
                console.log(e),t.setData({                
                    userInfo: e.userInfo,
                    hasUserInfo: !0
                }),wx.setStorage({
                    key: "ile",
                    data: e
                   });
            }
        });
    },
    business1: function() {
        wx.setClipboardData({
            data: "1213888115",
            success: function(a) {
                this.alert("已复制客服微信号~");
            }
        });
    },
    zanshang: function(e) {
        this.data.admire_title ? this.setData({
            modalName: e.currentTarget.dataset.target
        }) : wx.showToast({
            title: "未设置赞赏码",
            icon: "none",
            duration: 1500
        });
    },
    hidezs: function(e) {
        this.setData({
            modalName: null
        });
    }, 
    gorecorder: function() {
        wx.navigateTo({
            url: "../md5/index"
        });
    },
    goshare: function() {
        wx.navigateTo({
            url: "../invite/index"
        });
    },
    gocourse: function() {
        wx.navigateTo({
            url: "../help/index"
        });
    },
    gosetup: function() {
        wx.navigateTo({
            url: "../shezhi/index"
        });
    },

    cdkey: function() {
        wx.navigateTo({
            url: "../keypay/keypay"
        });
    },
    previewImage: function(a) {
        wx.previewImage({
            urls: [ this.data.contact ]
        });
    },
    onShareAppMessage: function(a) {
        return {
            title: this.data.nickname + "的会员中心",
            path: "/tommie_duanshiping/pages/member/index?openid=" + wx.getStorageSync("share_openid")
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
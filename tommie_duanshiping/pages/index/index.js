!function() {

function t(t, a, e) {
    return a in t ? Object.defineProperty(t, a, {
        value: e,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[a] = e, t;
  }
  
  var a, n = require("../../../FBD142A71B34E4DF9DB72AA0FD27A052.js"), i = getApp(),h = null,appjs = require("../../../22AA12831B34E4DF44CC7A8436E6A052.js");
  
  Page({
    data: (a = {
        url: "",
        lunbo: "0",
        showTopTips: !1,
        color: "#ff9900",
        errorMessage: "错误提示",
        inputvalue: "",
        loginState: "1",
        isImg: !1,
        appname: "",
        title: "",
        description: "",
        currentTab: 0,
        buttonjiexi: "recommend",
        qqgourp: "",
        shareTitle: "",
        api_url: "",
        help_tuji: "",
        helpUrl: "",
        ad_chaping: "",
        ad_id: "",
        ad_shiping: "",
        ad_tupian: "",
        adId: "",
        share_img: "",
        progress: 0,
        adImg: "",
        adText: "",
        copyText: "",
        isAudit: "0",
        downurl: "",
        downimg: "",
        isMember: ""
    }, t(a, "progress", ""), t(a, "playurl", ""), t(a, "ad_id", ""), t(a, "scrollTop", 0),
    t(a, "showAddMeBtn", !0), t(a, "isTop", 0), t(a, "jiexibut", ""), t(a, "lunbo", 0),a), 

    onLoad: function(t) {
        if (wx.getStorageSync("invita_openid").length < 5) {
            var a = t.openid || "";
            wx.setStorageSync("invita_openid", a);
        }
    },

    onShow: function(t) {
        var a = this;
         a.index(), wx.getStorage({
            key: "userInfo",
            success: function(t) {
                a.setData({
                    loginState: 1
                });
            },
            fail: function(t) {
                a.setData({
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

    zhantie: function() {
        var a = this;
        wx.getClipboardData({
            success: function(t) {
                var e = n.handleUrl(t.data);
                            t.cancel || a.setData({
                                inputvalue: e,
                                downurl: ""
                            });
            },
            fail: function(t) {},
            complete: function(t) {}
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
        console.log(wx.getStorageSync("openids"));
        var a = this;
        t.detail.userInfo ? (a.setData({
            loginState: 1
        }), i.util.getUserInfo(function(t) {
            i.util.request({
                url: "entry/wxapp/login",
                cachetime: "30",
                data: {
                    inviterOpenid: wx.getStorageSync("openids")
                },
                success: function(t) {
                    wx.setStorageSync("share_openid", t.data.data.openid), a.index();
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
        i.util.request({
            url: "entry/wxapp/index",
            success: function(a) {
              console.log(a)
                a.data.data.index.adimg && t.setData({
                    isImg: !0
                }), wx.setStorageSync("is_check", a.data.data.index.is_check), wx.setStorageSync("zs", a.data.data.index.ad_id), wx.setStorageSync("zw", a.data.data.index.app_name),wx.setStorageSync("zd",a.data.data.index.adimg),t.setData({
                    appname: a.data.data.index.app_name,
                    url: a.data.data.url,
                    lunbo: a.data.data.lunbo,
                    yanzheng: wx.getStorageSync("userInfo"),
                    description: a.data.data.index.description,
                    vip: a.data.data.index.vip,
                    ad_chaping: a.data.data.index.ad_chaping,
                    ad_shiping: a.data.data.index.ad_shiping,
                    ad_tupian: a.data.data.index.ad_tupian,
                    qqgourp: a.data.data.index.qq_group,
                    shareTitle: a.data.data.index.share_title,
                    help_tuji: a.data.data.index.help_tuji,
                    api_url: a.data.data.index.api_url,
                    adId: a.data.data.index.ad_id,
                    adImg: a.data.data.url + a.data.data.index.adimg,
                    share_img: a.data.data.url + a.data.data.index.share_img,
                    adText: a.data.data.index.adtext,
                    copyText: a.data.data.index.copytext,
                    isAudit: a.data.data.index.isaudit,
                    helpUrl: a.data.data.index.help_url,
                    progress: a.data.data.index.progress,
                    isMember: a.data.data.index.is_member,
                    jiexibut: a.data.data.index.api_url ? "下载素材" : "解析素材"
                }), wx.setNavigationBarTitle({
                    title: a.data.data.index.app_name
                });setTimeout(function() {
                    var e = null;
                    wx.createInterstitialAd && (e = wx.createInterstitialAd({
                        adUnitId: t.data.ad_chaping
                    })), e && e.show().catch(function(t) {
                        console.error(t);
                    });
                }, 9e3);
            }
        });
    },

    paste: function() {
        var t = this;
        wx.getClipboardData({
            success: function(a) {
                var e = n.handleUrl(a.data);
                e ? t.setData({
                    inputvalue: e
                }) : wx.showModal({
                    title: "温馨提示",
                    content: "没有可用的链接",
                    confirmColor: "#ff9900",
                    showCancel: !1,
                    success: function(a) {
                        t.setData({
                            result: ""
                        });
                    }
                });
            }
        });
    },
    copy: function() {
        let that = this;
        if (that.data.copyText.length > 6) {
            wx.navigateTo({
                url: '../../pages/web/index?url=' + that.data.copyText
            })
        } else {
            wx.navigateTo({
                url: '../help/index'
            })
        }
    },

    query: function(t) {
      var a = this, e = a.isUrl(a.data.inputvalue);
      if(wx.getStorageSync("share_openid") != ""){
        console.log(wx.getStorageSync("share_openid"))
        e && (wx.request({
          url: appjs.addrroot+'api/api.php?openid='+wx.getStorageSync("share_openid"), // 请求的URL
          method: 'GET', // 请求方法
          success: function(res) {
              console.log(res.data); // 打印返回的数据
              if(res.data > 0){
                wx.showLoading({
                  title: '解析中',
                });
                  wx.request({
                    url: "https://api.emoboy.vip/api/shuiyin/delWatermark?key=67b38463-4f5d-b6f2-b14b8202&url="+e,
                    data: {
                    },
                    method: 'GET', // 请求方法
                    success: function(t) {
                      wx.hideLoading();
                      console.log(t),console.log(t.data)
                      if(t.data.code == 200){
                        if(res.data == '2'){
                          wx.request({
                            url: appjs.addrroot+'api/del.php?openid='+wx.getStorageSync("share_openid"), // 请求的URL
                            method: 'GET', // 请求方法
                            success: function(res) {
                              wx.setStorage({
                                key: "video",
                                data: t.data.data.data_info
                                }), wx.navigateTo({
                                url: "../shiping/index"
                                    });
                            },
                            fail: function(error) {
                            }
                          });
                        }else{
                          wx.setStorage({
                            key: "video",
                            data: t.data.data.data_info
                            }), wx.navigateTo({
                            url: "../shiping/index"
                                });
                        }
                      }else{
                        wx.showModal({
                          title: "提示",
                          content: t.data.msg,
                          showCancel: !1,
                          success: function(t) {
                          }
                      });
                      }
                   
                    },
                    fail: function(t) {
                      wx.hideLoading();
                }
                });
              }else if(res.data == 0){
                  wx.hideToast({}), wx.showModal({
                    title: "提示",
                    content: "解析次数不够",
                    showCancel: !1,
                    confirmText: "获取次数",
                    confirmColor: "#ed3f14",
                    success: function(t) {
                        3 === e && wx.removeStorage({
                            key: "userInfo",
                            success: function(t) {
                                a.setData({
                                    loginState: "0"
                                }), wx.reLaunch({
                                    url: "../index/index"
                                });
                            }
                        });
                    },success: function(t) {
                        if (t.confirm) {
                            console.log('用户点击确定')
                            wx.switchTab({
                                url: "../video/index"
                            });
                        }
                    }
                });
              }else{
                wx.showToast({
                  title: "请求失败",
                  icon: "error",
                  duration: 800
              }), setTimeout(function() {
                  wx.hideToast({});
              }, 800);
              }
              
          },
          fail: function() {
              console.log('请求失败');
          }
        }));
      }else{
        wx.hideToast({}), wx.showModal({
          title: "提示",
          content: "未登录，请先登录！",
          showCancel: !1,
          confirmText: "前往登陆",
          confirmColor: "#ed3f14",
          success: function(t) {
              3 === e && wx.removeStorage({
                  key: "userInfo",
                  success: function(t) {
                      a.setData({
                          loginState: "0"
                      }), wx.reLaunch({
                          url: "../index/index"
                      });
                  }
              });
          },success: function(t) {
              if (t.confirm) {
                  console.log('用户点击确定')
                  wx.switchTab({
                      url: "../member/index"
                  });
              }
          }
      });
      }
    },

    bindChange: function(o) {
        this.setData({
            currentTab: o.detail.current
        });
    },
    swichNav: function(o) {
        if (this.data.currentTab === o.target.dataset.current) return !1;
        this.setData({
            currentTab: o.target.dataset.current
        });
    },
    isUrl: function(t) {
        var a = this;
        return 0 == t.length ? (wx.showModal({
            title: "温馨提示",
            content: "网址不能为空",
            confirmColor: "#ff9900",
            showCancel: !1
        }), !1) : n.handleUrl(t) || (wx.showModal({
            title: "温馨提示",
            content: "请输入正确的网址",
            confirmColor: "#ff9900",
            showCancel: !1,
            success: function(t) {
                a.setData({
                    result: ""
                });
            }
        }), !1);
    },
    help: function() {
wx.navigateTo({
            url: "../help/index"
        });
    },
    jiaoc: function() {
   wx.navigateTo({
            url: "../jiaoc/index"
        });
    },
    cishu: function() {
     wx.navigateTo({
            url: "../cishu/index"
        });
    },
    keypay: function() {
    wx.navigateTo({
            url: "../kepay/keypay"
        });
    },
    onClickAddToMinProgramCloseBtn: function() {
        wx.setStorageSync("showAddMeFlag" + this.data.time, !0), this.setData({
            showAddMeBtn: !1
        });
  
    },  
  
    shibai: function() {
   wx.navigateTo({
            url: "../shibai/index"
        });
    },
    user: function() {
      wx.navigateTo({
            url: "../user/user"
        });
    },
    toduihuan: function() {
        wx.navigateTo({
            url: "../keypay/keypay"
        });
    },

    copyqq: function() {
        var t;
        t = this.data.qqgourp, wx.setClipboardData({
            data: t,
            success: function(t) {
                wx.showToast({
                    title: "复制成功",
                    icon: "success",
                    duration: 800
                }), setTimeout(function() {
                    wx.hideToast({});
                }, 800);
            }
        });
    },

    onPageScroll: function(t) {
        t.scrollTop > 200 ? this.setData({
            floorstatus: !0
        }) : this.setData({
            floorstatus: !1
        });
    },
    goTop: function(t) {
        wx.pageScrollTo ? wx.pageScrollTo({
            scrollTop: 0
        }) : wx.showModal({
            title: "提示",
            content: "当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。"
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
}();
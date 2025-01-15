!function() {

function t(t, a, e) {
    return a in t ? Object.defineProperty(t, a, {
        value: e,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[a] = e, t;
  }
  
  var a, n = require("../../../FBD142A71B34E4DF9DB72AA0FD27A052.js"), i = getApp(),h = null;
  
  Page({
    data: (a = {
        url: "",
        title: "",
        api_url: "",
        winHeight: 0,
        winWidth: 0,
        help_tuji: "",
        currentTab:0,
        percents: 0,
        percent: 0,
        ad_tupian: "",
        ad_id: "",
        ad_shiping: "",
        vip: "",
        qq_group: "",
        progress: 0,
        modalHidden: !0,
        copyText: null,
        downurl: "",
        downimg: "",
    }, t(a, "progress", ""), t(a, "playurl", ""), t(a, "scrollTop", 0),
    t(a, "showAddMeBtn", !0), t(a, "isTop", 0), t(a, "jiexibut", ""), a), 

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
    buttonTap: function() {
        this.setData({
            modalHidden: !1
        });
    },
    modalCandel: function() {
        this.setData({
            modalHidden: !0
        });
    },
    goBack: function() {
        wx.navigateBack({
            delta: 1
        });
    },

    index: function() {
        var t = this;
        i.util.request({
            url: "entry/wxapp/index",
            success: function(a) {
                    t.setData({
                    url: a.data.data.url,
                    ad_id: a.data.data.index.ad_id,
                    vip: a.data.data.index.vip,
                    qq_group: a.data.data.index.qq_group,
                    adImg: a.data.data.url + a.data.data.index.adimg,
                    ad_tupian: a.data.data.index.ad_tupian,
                    help_tuji: a.data.data.index.help_tuji,
                    api_url: a.data.data.index.api_url,
                    copyText: a.data.data.index.copytext,
                    progress: a.data.data.index.progress,
                    jiexibut: a.data.data.index.api_url ? "下载素材" : "解析素材"
                }), wx.setNavigationBarTitle({
                    title: a.data.data.index.app_name
                });
            }
        });
    },
    onLoad: function() {
        var o = this, t = wx.getStorageSync("video");
          console.log("==="),console.log(t),console.log("==="), this.setData({ 
            title: t.title || "温馨提示：该视频没有标题哦",
            //视频封面复制链接
            downimg: t.img,
            downimgs: t.pics,
            imgsdown: decodeURIComponent(t.pics),
            //视频保存链接
            downurl: t.url,
            downimg: t.img,
            //视频复制链接
            playurl: decodeURIComponent(t.url),
            ad_id: wx.getStorageSync("zs"),
            adimg: wx.getStorageSync("zd"),
            time: Date.parse(new Date()),
        }),wx.createRewardedVideoAd && (console.log("视频预载中"), (h = wx.createRewardedVideoAd({
            adUnitId:o.data.ad_id
        })).onError(function(o) {
            console.log("视频加载失败");
        })), wx.getSystemInfo({
            success: function(t) {
                o.setData({
                    winWidth: t.windowWidth,
                    winHeight: t.windowHeight
                });
            }
        }), (o = this).data.winHeight > 500 && o.setData({
            maxheight: 400
        }), o.data.winHeight > 600 && o.setData({
            maxheight: 500
        }), o.data.winHeight > 670 && o.setData({
            maxheight: 550
        });
    },
    bindChange: function(o) {
        this.setData({
            currentTab: o.detail.current
        });
    },
    previewImage: function(o) {
       wx.previewImage({
            current: o.target.dataset.src,
            urls: this.data.downimgs
        });
    },
    swichNav: function(o) {
        if (this.data.currentTab === o.target.dataset.current) return !1;
        this.setData({
            currentTab: o.target.dataset.current
        });
    },
    savevideo: function() {
        let that = this;
        if (that.data.vip==0) {
        if (that.data.ad_id.length>6) {
            var lasttim = wx.getStorageSync('lasttim');
            if (lasttim < that.data.time) {
                console.log('正在加载激励视频')
                wx.showModal({
                    title: '温馨提示',
                    content: '观看一次完整广告\r\n解锁24小时无限使用\r\n或开通会员免广告',
                    showCancel: true,
                    cancelText: "取消",
                    cancelColor: "#52bcff",
                    confirmText: "确定",
                    confirmColor: "#ed3f14",
                    success(res) {
                        if (res.confirm) {
                            console.log('用户点击确定')
                            h.load()
                                .then(() => h.show())
                                .catch(err => console.log(err.errMsg))
                            h.onClose((status) => {
                                if (status && status.isEnded || status === undefined) {
                                    that.downloadss();
                                    var outtime = Number(that.data.time) + Number(that.data.qq_group);
                                    wx.setStorageSync("lasttim", outtime)
                                    console.log('当前时间', that.data.time)
                                    console.log('过期时间', outtime)
                                } else {
                                    console.log('用户没看完就关闭')
                                    wx.showToast({
                                        title: '观看完广告之后自动下载到手机哦',
                                        icon: "none",
                                        duration: 3000,
                                    })
                                }
                            })
                        }
                    }
                })
            } else {
                that.downloadss();
            }
        } else {
            that.downloadss();
        }
    } else {
        that.downloadss();
    }
    },
      downloadss: function() {
        
        var o = this;
        console.log("----")
        console.log(o.data.api_url)
        console.log(o.data.api_url + encodeURIComponent(o.data.downurl))
        o.data.api_url && (wx.showToast({
            title: "开始下载！",
            icon: "loading",
            duration: 1e3
        }), wx.downloadFile({
            url: o.data.api_url + encodeURIComponent(o.data.downurl),
            success: function(t) {
                200 === t.statusCode ? (wx.hideToast({}), wx.saveVideoToPhotosAlbum({
                    filePath: t.tempFilePath,
                    success: function(t) {
                        o.setData({
                            
                        }), wx.showModal({
                            title: "下载成功",
                            content: "请在手机相册中查看！",
                            confirmColor: "#52bcff",
                            showCancel: !1,
                            success: function(o) {}
                        });
                    }
                })) : o.dowww(o.data.downurl);
            },
            fail: function(t) {
                o.dowww(o.data.downurl);
            }
        }).onProgressUpdate(function(t) {
            o.setData({
                percent: String(t.progress)
            });
        }));
    },
    dowww: function(o) {
        var t = this;
        wx.downloadFile({
            url: o.data.api_url + encodeURIComponent(o.data.downurl),
            success: function(o) {
                200 === o.statusCode && (wx.hideToast({}), wx.saveVideoToPhotosAlbum({
                    filePath: o.tempFilePath,
                    success: function(o) {
                        t.setData({
                            
                        }), wx.showModal({
                            title: "下载成功",
                            content: "请在手机相册中查看！",
                            confirmColor: "#52bcff",
                            showCancel: !1,
                            success: function(o) {}
                        });
                    }
                }));
            },
            fail: function(o) {
                wx.hideToast({}), wx.showModal({
                    title: "下载失败",
                    content: "该视频无法直接下载，请复制无水印链接到手机QQ浏览器下载",
                    confirmColor: "#52bcff",
                    showCancel: !1,
                    success: function(o) {
                        t.setData({});
                    }
                });
            }
        }).onProgressUpdate(function(o) {
            t.setData({
                percent: String(o.progress)
            });
        });
    },
    imgid: function() {
        let that = this;
        if (that.data.vip==0) {
            if (that.data.ad_id.length>6) {
            var lasttim = wx.getStorageSync('lasttim');
            if (lasttim < that.data.time) {
                console.log('正在加载激励视频')
                wx.showModal({
                    title: '温馨提示',
                    content: '观看一次完整广告\r\n解锁24小时无限使用\r\n或开通会员免广告',
                    showCancel: true,
                    cancelText: "取消",
                    cancelColor: "#52bcff",
                    confirmText: "确定",
                    confirmColor: "#ed3f14",
                    success(res) {
                        if (res.confirm) {
                            console.log('用户点击确定')
                            h.load()
                                .then(() => h.show())
                                .catch(err => console.log(err.errMsg))
                            h.onClose((status) => {
                                if (status && status.isEnded || status === undefined) {
                                    that.img();
                                    var outtime = Number(that.data.time) + Number(that.data.qq_group);
                                    wx.setStorageSync("lasttim", outtime)
                                    console.log('当前时间', that.data.time)
                                    console.log('过期时间', outtime)
                                } else {
                                    console.log('用户没看完就关闭')
                                    wx.showToast({
                                        title: '观看完广告之后自动下载到手机哦',
                                        icon: "none",
                                        duration: 3000,
                                    })
                                }
                            })
                        }
                    }
                })
            } else {
                that.img();
            }
        } else {
            that.img()
        }
    } else {
        that.img()
    }
    },
    img() {
        let o = this;
        wx.showLoading({
            title: "正在下载"
        }), wx.downloadFile({
            url:o.data.help_tuji + encodeURIComponent(o.data.downimg),
            success: function(o) {
                console.log(o), wx.saveImageToPhotosAlbum({
                    filePath: o.tempFilePath,
                    success: function(o) {
                        console.log(o), wx.hideLoading(), wx.showToast({
                            title: "下载成功",
                            icon: "success",
                            duration: 2e3
                        });
                    },
                    fail: function(o) {
                        wx.showModal({
                            title: "温馨提示",
                            content: "用户拒绝授权访问本地相册将导致图片无法保存！如需继续操作，请点击确定前往开启授权。",
                            success: function(o) {
                                o.confirm && wx.openSetting();
                            }
                        });
                    },
                    complete(o) {
                        console.log(o), wx.hideLoading();
                    }
                });
            },
            fail: function() {
                wx.downloadFile({
                    url: o.data.help_tuji + encodeURIComponent(o.data.downimg),
                    success: function(o) {
                        console.log(o), wx.saveImageToPhotosAlbum({
                            filePath: o.tempFilePath,
                            success: function(o) {
                                console.log(o), wx.hideLoading(), wx.showToast({
                                    title: "下载成功",
                                    icon: "success",
                                    duration: 2e3
                                });
                            },
                            fail: function(o) {
                                wx.showModal({
                                    title: "温馨提示",
                                    content: "用户拒绝授权访问本地相册将导致图片无法保存！如需继续操作，请点击确定前往开启授权。",
                                    success: function(o) {
                                        o.confirm && wx.openSetting();
                                    }
                                });
                            },
                            complete(o) {
                                console.log(o), wx.hideLoading();
                            }
                        });
                    },
                    fail: function() {}
                });
            }
        });
    },
    saveimgs: function(o) {
        var t = this;
        if (t.data.vip==0) {
        if (t.data.ad_id.length>6) {
            if (wx.getStorageSync("lasttime") < t.data.time) console.log("正在加载激励视频"), wx.showModal({
                title: "温馨提示",
                content: "观看一段广告\r\n解锁24小时无限使用\r\n或开通会员免广告",
                showCancel: !0,
                cancelText: "取消",
                cancelColor: "#52bcff",
                confirmText: "确定",
                confirmColor: "#ed3f14",
                success: function(e) {
                    e.confirm && (console.log("用户点击确定"), h.load().then(function() {
                        return h.show();
                    }).catch(function(o) {
                        return console.log(o.errMsg);
                    }), h.onClose(function(e) {
                        if (e && e.isEnded || void 0 === e) {
                            var n = o.currentTarget.dataset.src;
                            console.log(n), wx.showLoading({
                                title: "正在下载"
                            }), wx.downloadFile({
                                url: t.data.help_tuji + encodeURIComponent(n),
                                success: function(o) {
                                    console.log(o), wx.saveImageToPhotosAlbum({
                                        filePath: o.tempFilePath,
                                        success: function(o) {
                                            console.log(o), wx.hideLoading(), wx.showToast({
                                                title: "下载成功",
                                                icon: "success",
                                                duration: 2e3
                                            });
                                        },
                                        fail: function(o) {
                                            wx.showModal({
                                                title: "提示",
                                                content: "用户拒绝授权访问本地相册将导致图片无法保存！如需继续操作，请点击确定前往开启授权。",
                                                success: function(o) {
                                                    o.confirm && wx.openSetting();
                                                }
                                            });
                                        },
                                        complete: function(o) {
                                            console.log(o), wx.hideLoading();
                                        }
                                    });
                                },
                                fail: function() {
                                    wx.downloadFile({
                                        url: t.data.help_tuji + encodeURIComponent(n),
                                        success: function(o) {
                                            console.log(o), wx.saveImageToPhotosAlbum({
                                                filePath: o.tempFilePath,
                                                success: function(o) {
                                                    console.log(o), wx.hideLoading(), wx.showToast({
                                                        title: "下载成功",
                                                        icon: "success",
                                                        duration: 2e3
                                                    });
                                                },
                                                fail: function(o) {
                                                    wx.showModal({
                                                        title: "提示",
                                                        content: "用户拒绝授权访问本地相册将导致图片无法保存！如需继续操作，请点击确定前往开启授权。",
                                                        success: function(o) {
                                                            o.confirm && wx.openSetting();
                                                        }
                                                    });
                                                },
                                                complete: function(o) {
                                                    console.log(o), wx.hideLoading();
                                                }
                                            });
                                        }
                                    });
                                }
                            });
                            var i = Number(t.data.time) + Number(t.data.qq_group);
                            wx.setStorageSync("lasttime", i), console.log("当前时间", t.data.time), console.log("过期时间", i);
                        } else console.log("用户没看完就关闭"), wx.showToast({
                            title: "观看完广告之后自动下载到手机哦",
                            icon: "none",
                            duration: 3e3
                        });
                    }));
                }
            }); else {
                var e = o.currentTarget.dataset.src;
                console.log(e), wx.showLoading({
                    title: "正在下载"
                }), wx.downloadFile({
                    url: t.data.help_tuji + encodeURIComponent(e),
                    success: function(o) {
                        console.log(o), wx.saveImageToPhotosAlbum({
                            filePath: o.tempFilePath,
                            success: function(o) {
                                console.log(o), wx.hideLoading(), wx.showToast({
                                    title: "下载成功",
                                    icon: "success",
                                    duration: 2e3
                                });
                            },
                            fail: function(o) {
                                wx.showModal({
                                    title: "提示",
                                    content: "用户拒绝授权访问本地相册将导致图片无法保存！如需继续操作，请点击确定前往开启授权。",
                                    success: function(o) {
                                        o.confirm && wx.openSetting();
                                    }
                                });
                            },
                            complete: function(o) {
                                console.log(o), wx.hideLoading();
                            }
                        });
                    },
                    fail: function() {
                        wx.downloadFile({
                            url: t.data.help_tuji + encodeURIComponent(e),
                            success: function(o) {
                                console.log(o), wx.saveImageToPhotosAlbum({
                                    filePath: o.tempFilePath,
                                    success: function(o) {
                                        console.log(o), wx.hideLoading(), wx.showToast({
                                            title: "下载成功",
                                            icon: "success",
                                            duration: 2e3
                                        });
                                    },
                                    fail: function(o) {
                                        wx.showModal({
                                            title: "提示",
                                            content: "用户拒绝授权访问本地相册将导致图片无法保存！如需继续操作，请点击确定前往开启授权。",
                                            success: function(o) {
                                                o.confirm && wx.openSetting();
                                            }
                                        });
                                    },
                                    complete: function(o) {
                                        console.log(o), wx.hideLoading();
                                    }
                                });
                            },
                            fail: function() {}
                        });
                    }
                });
            }
        } else {
            e = o.currentTarget.dataset.src;
            console.log(e), wx.showLoading({
                title: "正在下载"
            }), wx.downloadFile({
                url: t.data.help_tuji + encodeURIComponent(e),
                success: function(o) {
                    console.log(o), wx.saveImageToPhotosAlbum({
                        filePath: o.tempFilePath,
                        success: function(o) {
                            console.log(o), wx.hideLoading(), wx.showToast({
                                title: "下载成功",
                                icon: "success",
                                duration: 2e3
                            });
                        },
                        fail: function(o) {
                            wx.showModal({
                                title: "提示",
                                content: "用户拒绝授权访问本地相册将导致图片无法保存！如需继续操作，请点击确定前往开启授权。",
                                success: function(o) {
                                    o.confirm && wx.openSetting();
                                }
                            });
                        },
                        complete: function(o) {
                            console.log(o), wx.hideLoading();
                        }
                    });
                },
                fail: function() {
                    wx.downloadFile({
                        url: t.data.help_tuji + encodeURIComponent(e),
                        success: function(o) {
                            console.log(o), wx.saveImageToPhotosAlbum({
                                filePath: o.tempFilePath,
                                success: function(o) {
                                    console.log(o), wx.hideLoading(), wx.showToast({
                                        title: "下载成功",
                                        icon: "success",
                                        duration: 2e3
                                    });
                                },
                                fail: function(o) {
                                    wx.showModal({
                                        title: "提示",
                                        content: "用户拒绝授权访问本地相册将导致图片无法保存！如需继续操作，请点击确定前往开启授权。",
                                        success: function(o) {
                                            o.confirm && wx.openSetting();
                                        }
                                    });
                                },
                                complete: function(o) {
                                    console.log(o), wx.hideLoading();
                                }
                            });
                        }
                    });
                }
            });
        }
    } else {
        e = o.currentTarget.dataset.src;
        console.log(e), wx.showLoading({
            title: "正在下载"
        }), wx.downloadFile({          
            url: t.data.help_tuji + encodeURIComponent(e),
            success: function(o) {
                console.log(o), wx.saveImageToPhotosAlbum({
                    filePath: o.tempFilePath,
                    success: function(o) {
                        console.log(o), wx.hideLoading(), wx.showToast({
                            title: "下载成功",
                            icon: "success",
                            duration: 2e3
                        });
                    },
                    fail: function(o) {
                        wx.showModal({
                            title: "提示",
                            content: "用户拒绝授权访问本地相册将导致图片无法保存！如需继续操作，请点击确定前往开启授权。",
                            success: function(o) {
                                o.confirm && wx.openSetting();
                            }
                        });
                    },
                    complete: function(o) {
                        console.log(o), wx.hideLoading();
                    }
                });
            },
            fail: function() {
                wx.downloadFile({
                    url: t.data.help_tuji + encodeURIComponent(e),
                    success: function(o) {
                        console.log(o), wx.saveImageToPhotosAlbum({
                            filePath: o.tempFilePath,
                            success: function(o) {
                                console.log(o), wx.hideLoading(), wx.showToast({
                                    title: "下载成功",
                                    icon: "success",
                                    duration: 2e3
                                });
                            },
                            fail: function(o) {
                                wx.showModal({
                                    title: "提示",
                                    content: "用户拒绝授权访问本地相册将导致图片无法保存！如需继续操作，请点击确定前往开启授权。",
                                    success: function(o) {
                                        o.confirm && wx.openSetting();
                                    }
                                });
                            },
                            complete: function(o) {
                                console.log(o), wx.hideLoading();
                            }
                        });
                    }
                });
            }
        });
    }
    },
    download: function() {
        let that = this;
        if (that.data.vip==0) {
        if (that.data.ad_id.length>6) {
            var lasttime = wx.getStorageSync('lasttime');
            if (lasttime < that.data.time) {
                console.log('正在加载激励视频')
                wx.showModal({
                    title: '温馨提示',
                    content: '观看一次完整广告\r\n解锁24小时无限使用\r\n或开通会员免广告',
                    showCancel: true,
                    cancelText: "取消",
                    cancelColor: "#52bcff",
                    confirmText: "确定",
                    confirmColor: "#ed3f14",
                    success(res) {
                        if (res.confirm) {
                            console.log('用户点击确定')
                            h.load()
                                .then(() => h.show())
                                .catch(err => console.log(err.errMsg))
                            h.onClose((status) => {
                                if (status && status.isEnded || status === undefined) {
                                    that.downloadFile(that.data.downimgs).then(res => {
                                        that.setData({
                                            list_show: false,
                                        })
                                        wx.showToast({
                                            title: '下载完成'
                                        })
                                    })
                                    var outtime = Number(that.data.time) + Number(that.data.qq_group);
                                    wx.setStorageSync("lasttime", outtime)
                                    console.log('当前时间', that.data.time)
                                    console.log('过期时间', outtime)
                                } else {
                                    console.log('用户没看完就关闭')
                                    wx.showToast({
                                        title: '观看完广告之后自动下载到手机哦',
                                        icon: "none",
                                        duration: 3000,
                                    })
                                }
                            })
                        }
                    }
                })
            } else {
                that.downloadFile(that.data.downimgs).then(res => {
                    that.setData({
                        list_show: false,
                    })
                    wx.showToast({
                        title: '下载完成'
                    })
                })
            }
        } else {
            that.downloadFile(that.data.downimgs).then(res => {
                that.setData({
                    list_show: false,
                })
                wx.showToast({
                    title: '下载完成'
                })
            })
        }
    } else {
        that.downloadFile(that.data.downimgs).then(res => {
            that.setData({
                list_show: false,
            })
            wx.showToast({
                title: '下载完成'
            })
        })
    }
    },
    downloadFile: function(o) {
        var t = this;
        this.setData({
            list_show: !0
        });
        var e = Promise.resolve();
        return o.forEach(function(n, i) {
            e = e.then(function() {
                var e = 10 / o.length * 10;
                return t.setData({
                    currentindex: i + 1,
                    percents: (i + 1) * e
                }), t.downloads(n);
            });
        }), e;     
    },
    downloads:function(o) {
        var t = this;
        return new Promise(function(e, n) {
            wx.downloadFile({
                url: o,
                success: function(o) {
                    var n = o.tempFilePath;
                    wx.saveImageToPhotosAlbum({
                        filePath: n,
                        success: function(o) {
                            e(o);
                        },
                        fail: function(o) {
                            t.setData({
                                list_show: !1
                            });
                        }
                    });
                },
                fail: function(i) {
                    wx.downloadFile({
                        url: t.data.help_tuji + encodeURIComponent(o),
                        success: function(o) {
                            var n = o.tempFilePath;
                            wx.saveImageToPhotosAlbum({
                                filePath: n,
                                success: function(o) {
                                    e(o);
                                },
                                fail: function(o) {
                                    t.setData({
                                        list_show: !1
                                    });
                                }
                            });
                        },
                        fail: function(o) {
                            console.log(o, "err"), n(o);
                        }
                    });
                }
            });
        });
    },

    copydownimgs: function(o) {
        var t = this;
        if (t.data.vip==0) {
        if (t.data.ad_id.length>6) {
            if (wx.getStorageSync("lasttime") < t.data.time) console.log("正在加载激励视频"), wx.showModal({
                title: "温馨提示",
                content: "观看一段广告\r\n解锁24小时无限使用\r\n或开通会员免广告",
                showCancel: !0,
                cancelText: "取消",
                cancelColor: "#52bcff",
                confirmText: "确定",
                confirmColor: "#ed3f14",
                success: function(e) {
                    e.confirm && (console.log("用户点击确定"), h.load().then(function() {
                        return h.show();
                    }).catch(function(o) {
                        return console.log(o.errMsg);
                    }), h.onClose(function(e) {
                        if (e && e.isEnded || void 0 === e) {
                            var n = o.currentTarget.dataset.src;
                            console.log(n), wx.setClipboardData({
                                data: n,
                                success: function(o) {
                                    wx.showToast({
                                        title: "复制成功",
                                        icon: "success",
                                        duration: 800
                                    }), setTimeout(function() {
                                        wx.hideToast({});
                                    }, 800);
                                }
                            });
                            var i = Number(t.data.time) + Number(t.data.qq_group);
                            wx.setStorageSync("lasttime", i), console.log("当前时间", t.data.time), console.log("过期时间", i);
                        } else console.log("用户没看完就关闭"), wx.showToast({
                            title: "观看完广告之后自动下载到手机哦",
                            icon: "none",
                            duration: 3e3
                        });
                    }));
                }
            }); else {
                var downimgs = o.currentTarget.dataset.src;
                console.log(downimgs), wx.setClipboardData({
                    data: downimgs,
                    success: function(o) {
                        wx.showToast({
                            title: "复制成功",
                            icon: "success",
                            duration: 800
                        }), setTimeout(function() {
                            wx.hideToast({});
                        }, 800);
                    }
                });
            }   
    } else {
        var downimgs = o.currentTarget.dataset.src
        console.log(downimgs)
        wx.setClipboardData({
            data: downimgs,
            success: function(res) {
                wx.showToast({
                    title: '复制成功',
                    icon: 'success',
                    duration: 800
                })
                setTimeout(
                    function() {
                        wx.hideToast({})
                    }, 800);
            }
        });
      } 
    } else {
        var downimgs = o.currentTarget.dataset.src
        console.log(downimgs)
        wx.setClipboardData({
            data: downimgs,
            success: function(res) {
                wx.showToast({
                    title: '复制成功',
                    icon: 'success',
                    duration: 800
                })
                setTimeout(
                    function() {
                        wx.hideToast({})
                    }, 800);
            }
        });
      } 
    },
    tupianmg: function() {
    let that = this;
    if (that.data.vip==0) {
        if (that.data.ad_id.length>6) {
        var lasttim = wx.getStorageSync('lasttim');
        if (lasttim < that.data.time) {
            console.log('正在加载激励视频')
            wx.showModal({
                title: '温馨提示',
                content: '观看一次完整广告\r\n解锁24小时无限使用\r\n或开通会员免广告',
                showCancel: true,
                cancelText: "取消",
                cancelColor: "#52bcff",
                confirmText: "确定",
                confirmColor: "#ed3f14",
                success(res) {
                    if (res.confirm) {
                        console.log('用户点击确定')
                        h.load()
                            .then(() => h.show())
                            .catch(err => console.log(err.errMsg))
                        h.onClose((status) => {
                            if (status && status.isEnded || status === undefined) {
                                that.copyimg();
                                var outtime = Number(that.data.time) + Number(that.data.qq_group);
                                wx.setStorageSync("lasttim", outtime)
                                console.log('当前时间', that.data.time)
                                console.log('过期时间', outtime)
                            } else {
                                console.log('用户没看完就关闭')
                                wx.showToast({
                                    title: '观看完广告之后自动下载到手机哦',
                                    icon: "none",
                                    duration: 3000,
                                })
                            }
                        })
                    }
                }
            })
        } else {
            that.copyimg();
        }
    } else {
        that.copyimg()
    }
} else {
    that.copyimg()
}
},
    copyimg: function() {
        wx.setClipboardData({
            data: this.data.downimg,
            success: function() {
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
      copytitles: function() {
        wx.setClipboardData({
            data: this.data.title,
            success: function() {
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
    copydownurl: function() {
        let that = this;
        if (that.data.vip==0) {
        if (that.data.ad_id.length>6) {
            var lasttim = wx.getStorageSync('lasttim');
            if (lasttim < that.data.time) {
                console.log('正在加载激励视频')
                wx.showModal({
                    title: '温馨提示',
                    content: '观看一次完整广告\r\n解锁24小时无限使用\r\n或开通会员免广告',
                    showCancel: true,
                    cancelText: "取消",
                    cancelColor: "#52bcff",
                    confirmText: "确定",
                    confirmColor: "#ed3f14",
                    success(res) {
                        if (res.confirm) {
                            console.log('用户点击确定')
                            h.load()
                                .then(() => h.show())
                                .catch(err => console.log(err.errMsg))
                            h.onClose((status) => {
                                if (status && status.isEnded || status === undefined) {
                                    that.copydownurls();
                                    var outtime = Number(that.data.time) + Number(that.data.qq_group);
                                    wx.setStorageSync("lasttim", outtime)
                                    console.log('当前时间', that.data.time)
                                    console.log('过期时间', outtime)
                                } else {
                                    console.log('用户没看完就关闭')
                                    wx.showToast({
                                        title: '观看完广告之后自动下载到手机哦',
                                        icon: "none",
                                        duration: 3000,
                                    })
                                }
                            })
                        }
                    }
                })
            } else {
                that.copydownurls();
            }
        } else {
            that.copydownurls()
        }
    } else {
        that.copydownurls()
    }
    },
    modalConfirm: function() {
        this.setData({
            modalHidden: !0
        }), wx.downloadFile({
            url: this.data.adImg,
            success: function(o) {
                console.log(o), wx.saveImageToPhotosAlbum({
                    filePath: o.tempFilePath,
                    success: function(o) {
                        console.log(o), wx.hideLoading(), wx.showModal({
                            title: "温馨提示",
                            content: "二维码已保存到相册",
                            showCancel: !1,
                        });
                    },
                    fail: function(o) {
                        wx.showModal({
                            title: "温馨提示",
                            content: "用户拒绝授权访问本地相册将导致图片无法保存！如需继续操作，请点击确定前往开启授权。",
                            success: function(o) {
                                o.confirm && wx.openSetting();
                            }
                        });
                    },
                    complete: function(o) {
                        console.log(o), wx.hideLoading();
                    }
                });
            }
        });
    },
    copydownurls: function() {
        var t = this.data.playurl;
        wx.setClipboardData({
            data: t,
            success: function(o) {
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
});
}();
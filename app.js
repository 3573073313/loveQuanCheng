App({
    data: {},
    globalData: {
        baseurl: "https://qcapi.zhuwentec.com/",
        staticurl: "https://qcstatic.zhuwentec.com/wxapp/",
        userInfo: null,
        token: "",
        mapkey: "LSCBZ-P6SRW-KQKRA-O67DZ-E5S6V-USFV7",
        logininfo: {
            rawData: null,
            signature: null,
            encryptedData: null,
            iv: null,
            sessionKey: null,
            openid: null
        },
        useTime: 1,
        timer: null,
        member: null,
        isLogin: !1,
        isHasTree: 0
    },
    onLaunch: function() {
        if (this.gethuodongdict(), wx.canIUse("getUpdateManager")) {
            var e = wx.getUpdateManager();
            e.onCheckForUpdate(function(t) {
                console.log("onCheckForUpdate====", t), t.hasUpdate && (console.log("res.hasUpdate===="), 
                e.onUpdateReady(function() {
                    wx.showModal({
                        title: "更新提示",
                        content: "新版本已经准备好，是否重启应用？",
                        success: function(t) {
                            console.log("success====", t), t.confirm && e.applyUpdate();
                        }
                    });
                }), e.onUpdateFailed(function() {
                    wx.showModal({
                        title: "已经有新版本了哟~",
                        content: "新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~"
                    });
                }));
            });
        }
    },
    onShow: function(e) {
        var t = this;
        wx.getStorageSync("member") && t.setUseTime();
    },
    setUseTime: function() {
        var e = this, t = wx.getStorageSync("use_time");
        if (void 0 !== t && "" != t || (e.globalData.useTime = 1, wx.setStorageSync("use_time", 1), 
        t = 1), t < 500) {
            var o = setInterval(function() {
                t++, e.globalData.useTime = t, wx.setStorageSync("use_time", t), 500 == t && (e.autoFinishTask(), 
                clearInterval(o));
            }, 1e3);
            e.globalData.timer = o;
        } else e.autoFinishTask();
    },
    onHide: function() {
        var e = this;
        wx.setStorageSync("use_time", e.globalData.useTime), clearInterval(e.globalData.timer);
    },
    login: function(e) {
        var t = this;
        return new Promise(function(e, o) {
            wx.login({
                success: function(n) {
                    var a = {
                        code: n.code
                    };
                    t.post("Wxlogin/login", a, "登陆中..").then(function(o) {
                        t.globalData.logininfo.sessionKey = o.sessionKey, t.globalData.logininfo.openid = o.openid, 
                        wx.getWeRunData({
                            success: function(n) {
                                var a = {
                                    sessionKey: o.sessionKey,
                                    encryptedData: n.encryptedData,
                                    iv: n.iv
                                };
                                t.post("Wxlogin/getRunData", a).then(function(o) {
                                    console.log(o.body.stepInfo.step);
                                    var n = new Date(1e3 * o.body.stepInfo.timestamp).toLocaleDateString(), a = new Date().toLocaleDateString(), s = 1;
                                    wx.setStorageSync("steps", s), n === a && (wx.setStorageSync("steps", o.body.stepInfo.step), 
                                    s = o.body.stepInfo.step), t.autoFinishTaskStep(s), e();
                                });
                            }
                        }), t.globalData.member = o.member, "" == o.member && null == o.member || (t.globalData.isLogin = !0), 
                        wx.setStorageSync("openid", o.openid), wx.setStorageSync("member", o.member), wx.setStorageSync("token", o.token);
                    }).catch(function(e) {
                        console.log(e), o();
                    });
                }
            });
        });
    },
    autoFinishTaskStep: function(e) {
        var t = this, o = {
            steps: e,
            platformTaskType: "8",
            memberId: wx.getStorageSync("member").id,
            ifRun: "1"
        };
        t.post("JnTask/autoFinishTask", o).then(function(e) {
            e.success;
        }).catch(function(e) {
            console.log(e);
        });
    },
    getScoreInfo: function(e) {
        var t = this, o = {};
        t.post("/JnInventoryQuery/get", o, "加载中...").then(function(o) {
            o && (o.body.data.yue = parseInt(o.body.data.allScore) - parseInt(o.body.data.allUse), 
            t.globalData.scoreInfo = o.body.data, wx.setStorageSync("scoreInfo", o.body.data), 
            e());
        }).catch(function(e) {
            console.log(e);
        });
    },
    onGotUserInfo: function(e, t) {
        this.initUser(e, t);
    },
    initUser: function(e, t) {
        var o = this, n = wx.getStorageSync("openid"), a = {
            sessionKey: o.globalData.logininfo.sessionKey,
            signature: e.signature,
            encryptedData: e.encryptedData,
            iv: e.iv,
            rawData: JSON.stringify(e.rawData),
            openid: n
        };
        o.post("Wxlogin/info", a, "加载用户信息..").then(function(e) {
            o.globalData.member = e.body.member, o.globalData.token = e.body.token, wx.setStorageSync("member", e.body.member), 
            wx.setStorageSync("token", e.body.token), t();
        }).catch(function(e) {});
    },
    get: function(e, t, o) {
        var n = this, a = !1, s = !1;
        return setTimeout(function() {
            o && !a && wx.showLoading({
                title: "加载中...",
                success: function() {
                    s = !0;
                }
            });
        }, 1e3), new Promise(function(o, i) {
            var c = n;
            t.token = wx.getStorageSync("token");
            var r = t;
            wx.request({
                url: e,
                data: r,
                method: "GET",
                header: {
                    "content-type": "application/x-www-form-urlencoded",
                    cookie: c.globalData.cookie
                },
                success: function(e) {
                    if (200 != e.statusCode) return i({
                        error: "服务器忙，请稍后重试",
                        code: 500
                    }), void (a = !0);
                    a = !0, o(e.data);
                },
                error: function(e) {
                    i("网络出错"), a = !0;
                },
                complete: function() {
                    a = !0, s && wx.hideLoading();
                }
            });
        });
    },
    post: function(e, t, o, n) {
        var a = this, s = !1, i = !1;
        return setTimeout(function() {
            o && !s && (wx.showLoading({
                title: "加载中...",
                success: function() {
                    i = !0;
                }
            }), setTimeout(function() {
                i && wx.hideLoading();
            }, 1e3));
        }, 1e3), new Promise(function(o, c) {
            t.token = wx.getStorageSync("token");
            var r = t;
            wx.request({
                url: a.globalData.baseurl + e,
                data: r,
                method: n || "POST",
                header: {
                    "content-type": "application/x-www-form-urlencoded",
                    cookie: a.globalData.cookie
                },
                success: function(e) {
                    if (200 != e.statusCode) return c({
                        error: "服务器忙，请稍后重试",
                        code: 500
                    }), void (s = !0);
                    s = !0, o(e.data);
                },
                error: function(e) {
                    c("网络出错"), s = !0;
                },
                complete: function() {
                    s = !0, i && wx.hideLoading();
                }
            });
        });
    },
    temppost: function(e, t, o) {
        var n = this, a = !1, s = !1;
        return setTimeout(function() {
            o && !a && wx.showLoading({
                title: "加载中...",
                success: function() {
                    s = !0;
                }
            });
        }, 1e3), new Promise(function(o, i) {
            var c = n;
            t.token = wx.getStorageSync("token");
            var r = t;
            wx.request({
                url: c.globalData.baseurl + e,
                data: r,
                method: "POST",
                header: {
                    "content-type": "application/x-www-form-urlencoded",
                    cookie: c.globalData.cookie
                },
                success: function(e) {
                    if (200 != e.statusCode) return i({
                        error: "服务器忙，请稍后重试",
                        code: 500
                    }), void (a = !0);
                    a = !0, o(e.data);
                },
                error: function(e) {
                    i("网络出错"), a = !0;
                },
                complete: function() {
                    a = !0, s && wx.hideLoading();
                }
            });
        });
    },
    postJSON: function(e, t, o) {
        var n = this, a = !1, s = !1;
        return setTimeout(function() {
            o && !a && wx.showLoading({
                title: "加载中...",
                success: function() {
                    s = !0;
                }
            });
        }, 1e3), new Promise(function(o, i) {
            var c = n, r = wx.getStorageSync("token");
            e = e + "?token=" + r;
            var u = t;
            wx.request({
                url: c.globalData.baseurl + e,
                data: u,
                method: "POST",
                header: {
                    "content-type": "application/json",
                    cookie: c.globalData.cookie
                },
                success: function(e) {
                    if (200 != e.statusCode) return i({
                        error: "服务器忙，请稍后重试",
                        code: 500
                    }), void (a = !0);
                    a = !0, o(e.data);
                },
                error: function(e) {
                    i("网络出错"), a = !0;
                },
                complete: function() {
                    a = !0, s && wx.hideLoading();
                }
            });
        });
    },
    mongoPost: function(e, t, o) {
        var n = this, a = !1, s = !1;
        return setTimeout(function() {
            o && !a && wx.showLoading({
                title: "加载中...",
                success: function() {
                    s = !0;
                }
            });
        }, 1e3), new Promise(function(o, i) {
            var c = n;
            t.token = wx.getStorageSync("token");
            var r = t;
            wx.request({
                url: c.globalData.mongourl + e,
                data: r,
                method: "POST",
                header: {
                    "content-type": "application/x-www-form-urlencoded",
                    cookie: c.globalData.cookie
                },
                success: function(e) {
                    if (200 != e.statusCode) return i({
                        error: "服务器忙，请稍后重试",
                        code: 500
                    }), void (a = !0);
                    a = !0, o(e.data);
                },
                error: function(e) {
                    i("网络出错"), a = !0;
                },
                complete: function() {
                    a = !0, s && wx.hideLoading();
                }
            });
        });
    },
    mongoGet: function(e, t, o) {
        var n = this, a = !1, s = !1;
        return setTimeout(function() {
            o && !a && wx.showLoading({
                title: "加载中...",
                success: function() {
                    s = !0;
                }
            });
        }, 1e3), new Promise(function(o, i) {
            var c = n;
            t.token = wx.getStorageSync("token");
            var r = t;
            wx.request({
                url: c.globalData.mongourl + e,
                data: r,
                method: "GET",
                header: {
                    "content-type": "application/x-www-form-urlencoded",
                    cookie: c.globalData.cookie
                },
                success: function(e) {
                    if (200 != e.statusCode) return i({
                        error: "服务器忙，请稍后重试",
                        code: 500
                    }), void (a = !0);
                    a = !0, o(e.data);
                },
                error: function(e) {
                    i("网络出错"), a = !0;
                },
                complete: function() {
                    a = !0, s && wx.hideLoading();
                }
            });
        });
    },
    checkPermission: function(e) {
        console.log("-------------checkPermission22----------"), wx.getSetting({
            success: function(e) {
                e.authSetting["scope.userLocation"] || (console.log("-------------不满足scope.userLocation权限----------"), 
                wx.authorize({
                    scope: "scope.userLocation",
                    success: function() {
                        console.log("yes"), console.log(e);
                    }
                }));
            }
        });
    },
    getPermission: function(e) {
        var t = this;
        wx.getLocation({
            type: "wgs84",
            success: function(o) {
                console.log("location", o);
                var n = o.latitude + "," + o.longitude;
                wx.request({
                    url: "https://apis.map.qq.com/ws/geocoder/v1/",
                    data: {
                        key: t.globalData.mapkey,
                        location: n
                    },
                    method: "GET",
                    success: function(t) {
                        console.info(t), e.setData({
                            address: t.data.result.address
                        });
                    }
                });
            },
            fail: function() {
                wx.getSetting({
                    success: function(o) {
                        o.authSetting["scope.userLocation"] || wx.showModal({
                            title: "是否授权当前位置",
                            content: "需要获取您的地理位置，请确认授权，否则地图功能将无法使用",
                            success: function(o) {
                                o.confirm && wx.openSetting({
                                    success: function(o) {
                                        !0 === o.authSetting["scope.userLocation"] ? (wx.showToast({
                                            title: "授权成功",
                                            icon: "success",
                                            duration: 1e3
                                        }), wx.getLocation({
                                            type: "wgs84",
                                            success: function(o) {
                                                console.log("location", o);
                                                var n = o.latitude + "," + o.longitude;
                                                wx.request({
                                                    url: "https://apis.map.qq.com/ws/geocoder/v1/",
                                                    data: {
                                                        key: t.globalData.mapkey,
                                                        location: n
                                                    },
                                                    method: "GET",
                                                    success: function(t) {
                                                        console.info(t), e.setData({
                                                            address: t.data.result.address
                                                        });
                                                    }
                                                });
                                            }
                                        })) : wx.showToast({
                                            title: "授权失败",
                                            icon: "success",
                                            duration: 1e3
                                        });
                                    }
                                });
                            }
                        });
                    },
                    fail: function(e) {
                        wx.showToast({
                            title: "调用授权窗口失败",
                            icon: "success",
                            duration: 1e3
                        });
                    }
                });
            }
        });
    },
    gethuodongdict: function() {
        this.post("/dict/sys-dict/list?type=activity_type", {}, "加载用户信息..").then(function(e) {
            wx.setStorage({
                key: "huodongdict",
                data: e.body.data
            });
        }).catch(function(e) {});
    },
    autoFinishTask: function() {
        var e = this, t = {
            taskType: "2",
            platformTaskType: "4",
            memberId: wx.getStorageSync("member").id
        };
        e.post("/JnTask/autoFinishTask", t).then(function(e) {
            e.success;
        }).catch(function(e) {
            console.log(e);
        });
    },
    setGlobalData: function(e) {
        this.globalData = e;
    },
    getMember: function() {
        return this.globalData.member;
    },
    getLogin: function() {
        return this.globalData.isLogin;
    }
});
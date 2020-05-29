var e, t = getApp();

Page({
    data: {
        isSendSMSCode: !1,
        time: 60,
        isSubmit: !1,
        tel: null,
        code: null
    },
    submit: function() {
        var e = this, t = e.data.tel, o = e.data.code;
        console.log(t, o), !t || String(t).length < 11 ? wx.showToast({
            title: "没有手机号或手机号长度错误",
            icon: "none"
        }) : !o || String(o).length < 6 ? wx.showToast({
            title: "没有验证码或验证码长度错误",
            icon: "none"
        }) : e.submitData(t, o);
    },
    submitData: function(e, o) {
        var n = this;
        wx.showLoading({
            title: "绑定中..."
        }), t.post("member/why-member/phoneBinding", {
            mobile: e,
            code: o
        }, "加载用户信息..").then(function(e) {
            e.success ? n.login() : (wx.hideLoading(), wx.showToast({
                title: e.msg,
                icon: "none"
            }));
        }).catch(function(e) {
            wx.hideLoading(), wx.showToast({
                title: e.error,
                icon: "none"
            });
        });
    },
    login: function() {
        var e = this.data.info;
        e.rawData = JSON.stringify(e.rawData), t.post("Wxlogin/info", e, "加载用户信息..").then(function(e) {
            wx.hideLoading(), wx.showToast({
                title: "绑定成功"
            }), e.body.member.phoneNumber = tel, t.globalData.member = e.body.member, t.globalData.token = e.body.token, 
            wx.setStorageSync("member", e.body.member), wx.setStorageSync("token", e.body.token), 
            wx.navigateBack({
                delta: 1
            });
        }).catch(function(e) {});
    },
    bindinput: function(e) {
        var t = this;
        if ("tel" == e.currentTarget.dataset.type) t.setData({
            tel: e.detail.value
        }); else {
            var o = t.data.tel;
            if (!o || String(o).length < 11) return void wx.showToast({
                title: "请先输入正确的手机号",
                icon: "none"
            });
            t.setData({
                code: e.detail.value
            });
        }
    },
    getPhoneNumber: function(e) {
        var t = this, o = getApp().globalData.logininfo.rawData, n = getApp().globalData.logininfo.signature, a = e.detail.encryptedData, i = e.detail.iv, s = getApp().globalData.logininfo.sessionKey;
        getApp().globalData.logininfo.openid;
        wx.login({
            success: function(e) {
                wx.request({
                    url: getApp().globalData.baseurl + "Wxlogin/phone",
                    data: {
                        code: e.code,
                        rawData: o,
                        signature: n,
                        encryptedData: a,
                        iv: i,
                        sessionKey: s
                    },
                    method: "POST",
                    header: {
                        "content-type": "application/x-www-form-urlencoded",
                        cookie: getApp().globalData.cookie
                    },
                    success: function(e) {
                        console.log(e), 200 == e.statusCode && e.data.phoneNumber && t.setData({
                            tel: e.data.phoneNumber
                        });
                    },
                    fail: function(e) {
                        reject("网络出错");
                    }
                });
            }
        });
    },
    sendSMSCode: function() {
        var e = this;
        wx.showLoading({
            title: "发送中..."
        }), new Promise(function(o, n) {
            var a = {
                phoneNumber: e.data.tel,
                oldPhoneNumber: ""
            };
            t.post("/member/why-member/checkPhoneNumber", a, "加载中...").then(function(e) {
                e.success ? e.body.flag ? (wx.showModal({
                    title: "温馨提示",
                    content: "同一手机号仅可绑定一个账号，请确认信息是否正确。",
                    showCancel: !1,
                    success: function(e) {
                        e.confirm && console.log("用户点击确定");
                    }
                }), n(), wx.hideLoading()) : o() : (wx.showToast({
                    title: "连接失败，请重试",
                    icon: "none",
                    duration: 2e3
                }), n(), wx.hideLoading());
            }).catch(function(e) {
                console.log(e), wx.hideLoading();
            });
        }).then(function(o) {
            t.post("msg/SMS_190280528", {
                mobile: e.data.tel
            }, "加载中...").then(function(t) {
                wx.hideLoading();
                var o = "none";
                t.success && (e.setData({
                    isSendSMSCode: !0
                }), e.setTime(), o = "success"), wx.showToast({
                    title: t.msg,
                    icon: o
                });
            }).catch(function(e) {
                console.log(e), wx.hideLoading();
            });
        });
    },
    setTime: function(t) {
        var o = this;
        e = setInterval(function() {
            var t = o.data.time;
            if (t <= 0) return clearInterval(e), void o.setData({
                isSendSMSCode: !1,
                time: 60
            });
            t--, o.setData({
                time: t
            });
        }, 1e3);
    },
    onLoad: function(e) {
        console.log("options.data---", e, decodeURIComponent(e.info)), this.setData({
            info: JSON.parse(decodeURIComponent(e.info))
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {
        clearInterval(e);
    },
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});
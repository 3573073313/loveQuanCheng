var e = getApp();

Page({
    data: {
        isShow: !1,
        showModal: 1,
        subobj: {},
        member: {},
        saving: !1,
        send_btn_text: "获取验证码",
        canSend: !0,
        secd: 60
    },
    onLoad: function(e) {
        this.setData({
            staticurl: getApp().globalData.staticurl
        });
        var t = getApp().globalData.member;
        console.log(t), "1" == t.authStatus && this.setData({
            isShow: !0
        }), "2" == t.authStatus && this.setData({
            isShow2: !0,
            saving: !0
        }), t.cardNumber || (t.cardNumber = ""), this.data.subobj.id = t.id, this.data.subobj.memberName = t.memberName, 
        this.data.subobj.cardNumber = t.cardNumber, this.data.subobj.phoneNumber = t.phoneNumber, 
        this.setData({
            member: t,
            subobj: this.data.subobj
        }), console.info(this.data.member);
    },
    clickOrder: function(e) {
        console.log("clickOrder"), this.setData({
            showModal: 0
        });
    },
    onShow: function() {},
    clickHidden: function() {
        console.log("00000");
        wx.showToast({
            title: "认证成功",
            duration: 2e3,
            success: function() {
                wx.reLaunch({
                    url: "/pages/mine/mine"
                });
            }
        });
    },
    lxrxm: function(e) {
        this.data.subobj.memberName = e.detail.value, this.setData({
            subobj: this.data.subobj
        });
    },
    shenfenzheng: function(e) {
        if (e.detail.value.length > 18) return !1;
        this.data.subobj.cardNumber = e.detail.value, this.setData({
            subobj: this.data.subobj
        });
    },
    phone: function(e) {
        if (e.detail.value.length > 11) return !1;
        this.data.subobj.phoneNumber = e.detail.value, this.setData({
            subobj: this.data.subobj
        });
    },
    vailCode: function(e) {
        this.data.subobj.vailCode = e.detail.value, this.setData({
            subobj: this.data.subobj
        });
    },
    clickSave: function() {
        var t = this, a = !0;
        console.info("ckickSave"), t.data.subobj.memberName || (wx.showToast({
            title: "请输入姓名",
            image: "/image/bottomico.png",
            duration: 2e3
        }), a = !1);
        var o = t.isCardID(t.data.subobj.cardNumber);
        if (1 != o && (wx.showToast({
            title: o,
            image: "/image/bottomico.png",
            duration: 2e3
        }), a = !1), /^1\d{10}$/.test(t.data.subobj.phoneNumber) || (wx.showToast({
            title: "手机号有误",
            image: "/image/bottomico.png",
            duration: 2e3
        }), a = !1), !t.data.subobj.vailCode) return wx.showToast({
            title: "请输入验证码",
            image: "/image/bottomico.png",
            duration: 2e3
        }), !1;
        if (!a) return wx.showToast({
            title: o,
            image: "/image/bottomico.png",
            duration: 2e3
        }), !1;
        this.setData({
            saving: !0
        }), wx.showLoading({
            title: "提交中...",
            mask: !0
        });
        var n = new Promise(function(a, o) {
            var n = {
                phoneNumber: t.data.subobj.phoneNumber,
                oldPhoneNumber: ""
            };
            e.post("/member/why-member/checkPhoneNumber", n, "加载中...").then(function(e) {
                e.success ? e.body.flag ? (wx.showModal({
                    title: "温馨提示",
                    content: "同一手机号仅可认证一个账号，请确认信息是否正确。",
                    showCancel: !1,
                    success: function(e) {
                        e.confirm && console.log("用户点击确定");
                    }
                }), o(), wx.hideLoading(), t.setData({
                    saving: !1
                })) : a() : (wx.showToast({
                    title: "连接失败，请重试",
                    icon: "none",
                    duration: 2e3
                }), o(), t.setData({
                    saving: !1
                }), wx.hideLoading());
            }).catch(function(e) {
                console.log(e), wx.hideLoading();
            });
        }), s = new Promise(function(a, o) {
            var n = {
                idCard: t.data.subobj.cardNumber
            };
            e.post("/member/why-member/checkIdCard", n, "加载中...").then(function(e) {
                e.success ? e.body.flag ? (wx.showModal({
                    title: "温馨提示",
                    content: "同一身份证号仅可认证一个账号，请确认信息是否正确。",
                    showCancel: !1,
                    success: function(e) {
                        e.confirm && console.log("用户点击确定");
                    }
                }), o(), t.setData({
                    saving: !1
                }), wx.hideLoading()) : a() : (wx.showToast({
                    title: "连接失败，请重试",
                    icon: "none",
                    duration: 2e3
                }), o(), t.setData({
                    saving: !1
                }), wx.hideLoading());
            }).catch(function(e) {
                console.log(e), wx.hideLoading();
            });
        });
        Promise.all([ n, s ]).then(function(a) {
            e.post("/member/why-member/authentication", t.data.subobj, "加载中...").then(function(e) {
                e.success ? (getApp().globalData.member = e.body.member, wx.setStorageSync("member", e.body.member), 
                getApp().globalData.member.cardNumber = e.body.member.cardNumber, getApp().globalData.member.memberName = e.body.member.memberName, 
                getApp().globalData.member.phoneNumber = e.body.member.phoneNumber, getApp().globalData.token = e.body.token, 
                t.clickHidden()) : wx.showToast({
                    title: e.msg,
                    image: "/image/bottomico.png",
                    duration: 2e3
                }), wx.hideLoading();
            }).catch(function(e) {
                console.log(e), wx.hideLoading();
            });
        });
    },
    isCardID: function(e) {
        var e, t, a, o, n = {
            11: "北京",
            12: "天津",
            13: "河北",
            14: "山西",
            15: "内蒙古",
            21: "辽宁",
            22: "吉林",
            23: "黑龙江",
            31: "上海",
            32: "江苏",
            33: "浙江",
            34: "安徽",
            35: "福建",
            36: "江西",
            37: "山东",
            41: "河南",
            42: "湖北",
            43: "湖南",
            44: "广东",
            45: "广西",
            46: "海南",
            50: "重庆",
            51: "四川",
            52: "贵州",
            53: "云南",
            54: "西藏",
            61: "陕西",
            62: "甘肃",
            63: "青海",
            64: "宁夏",
            65: "新疆",
            71: "台湾",
            81: "香港",
            82: "澳门",
            91: "国外"
        }, s = new Array();
        if (s = e.split(""), "" == e || null == e) return "没有输入身份证号码";
        if (null == n[parseInt(e.substr(0, 2))]) return "身份证号码错误";
        switch (e.length) {
          case 18:
            return (parseInt(e.substr(6, 4)) % 4 == 0 || parseInt(e.substr(6, 4)) % 100 == 0 && parseInt(e.substr(6, 4)) % 4 == 0 ? /^[1-9][0-9]{5}19[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}[0-9Xx]$/ : /^[1-9][0-9]{5}19[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}[0-9Xx]$/).test(e) ? (o = 7 * (parseInt(s[0]) + parseInt(s[10])) + 9 * (parseInt(s[1]) + parseInt(s[11])) + 10 * (parseInt(s[2]) + parseInt(s[12])) + 5 * (parseInt(s[3]) + parseInt(s[13])) + 8 * (parseInt(s[4]) + parseInt(s[14])) + 4 * (parseInt(s[5]) + parseInt(s[15])) + 2 * (parseInt(s[6]) + parseInt(s[16])) + 1 * parseInt(s[7]) + 6 * parseInt(s[8]) + 3 * parseInt(s[9]), 
            t = o % 11, "F", a = "10X98765432", a.substr(t, 1) == s[17].toUpperCase() || "身份证号码错误") : "身份证号码错误";

          default:
            return "身份证位数不正确";
        }
    },
    getPhoneNumber: function(e) {
        var t = this, a = getApp().globalData.logininfo.rawData, o = getApp().globalData.logininfo.signature, n = e.detail.encryptedData, s = e.detail.iv, i = getApp().globalData.logininfo.sessionKey;
        getApp().globalData.logininfo.openid;
        wx.login({
            success: function(e) {
                wx.request({
                    url: getApp().globalData.baseurl + "Wxlogin/phone",
                    data: {
                        code: e.code,
                        rawData: a,
                        signature: o,
                        encryptedData: n,
                        iv: s,
                        sessionKey: i
                    },
                    method: "POST",
                    header: {
                        "content-type": "application/x-www-form-urlencoded",
                        cookie: getApp().globalData.cookie
                    },
                    success: function(e) {
                        console.log(e), 200 == e.statusCode && e.data.phoneNumber && (t.data.member.phoneNumber = e.data.phoneNumber, 
                        t.data.subobj.phoneNumber = e.data.phoneNumber, t.setData({
                            member: t.data.member,
                            subobj: t.data.subobj
                        }));
                    },
                    fail: function(e) {
                        reject("网络出错");
                    }
                });
            }
        });
    },
    sendCode: function() {
        var e = this, t = !0;
        console.info("sendCode：" + e.data.canSend), e.data.subobj.memberName || (wx.showToast({
            title: "请输入姓名",
            image: "/image/bottomico.png",
            duration: 2e3
        }), t = !1);
        var a = e.isCardID(e.data.subobj.cardNumber);
        if (1 != a && (wx.showToast({
            title: a,
            image: "/image/bottomico.png",
            duration: 2e3
        }), t = !1), /^1\d{10}$/.test(e.data.subobj.phoneNumber) || (wx.showToast({
            title: "手机号有误",
            image: "/image/bottomico.png",
            duration: 2e3
        }), t = !1), t && e.data.canSend) {
            var o = setInterval(function() {
                0 >= e.data.secd ? (e.setData({
                    send_btn_text: "获取验证码",
                    secd: 60,
                    canSend: !0,
                    saving: !1
                }), clearInterval(o)) : e.setData({
                    send_btn_text: "(" + e.data.secd + ")秒后重试",
                    secd: e.data.secd - 1,
                    canSend: !1,
                    saving: !0
                });
            }, 1e3);
            e.sendSMSCode(e.data.subobj.phoneNumber);
        }
    },
    sendSMSCode: function(t) {
        e.post("/msg/sendSMS_171350404", {
            mobile: t
        }, "加载中...").then(function(e) {
            e.success && wx.showToast({
                title: e.msg
            }), wx.hideLoading();
        }).catch(function(e) {
            console.log(e);
        });
    }
});
var t = getApp(), a = require("../../../utils/qqmap-wx-jssdk.js"), e = require("../../../utils/util.js");

new a({
    key: "P26BZ-IRUK4-ZW5UP-XPMQL-F54SQ-3HBDW"
});

Page({
    data: {
        login: !1,
        isDefault: !0,
        member: {},
        imgCalendar: getApp().globalData.staticurl + "iconDateNN.png",
        imgTime: getApp().globalData.staticurl + "iconActiveTime@3x.png",
        imgMinus: getApp().globalData.staticurl + "zf_minus.png",
        imgAdd: getApp().globalData.staticurl + "zf_add.png",
        subobj: {
            num: 1
        },
        id: "",
        activity: {},
        surplus: 0,
        datelist: [],
        dateindex: null,
        date: "",
        showModal: 1,
        modalCode: 0,
        modalSecond: "60秒后...",
        useDate: "",
        useTime: "",
        reserveNum: 0
    },
    onLoad: function(t) {
        var a = this, e = t.id;
        a.setData({
            id: e
        });
    },
    onShow: function() {
        var t = this;
        t.watchBack(), t.getLocation();
    },
    getLocation: function() {
        var t = this;
        wx.getLocation({
            type: "wgs84",
            success: function(a) {
                console.log("location", a), t.setData({
                    latitude: a.latitude,
                    longitude: a.longitude
                }), t.getactivity();
            }
        });
    },
    getactivity: function() {
        var a = this, i = {
            id: a.data.id,
            latitude: a.data.latitude,
            longitude: a.data.longitude
        };
        t.post("/JnActivityManagement/get", i, "加载中...").then(function(t) {
            if (t) {
                var i = t.body.data, o = i.juli;
                i.juli = 1e3 < o ? parseFloat((parseInt(o) / 1e3).toFixed(2)) + "KM" : item.juli + "M";
                var n = new Date(i.starDate + " " + i.starTime), s = new Date(i.endDate + " " + i.endTime);
                if (n.getTime() < new Date().getTime()) if (s.getTime() < new Date().getTime()) console.log("现在时间大于活动开始时间时"), 
                a.outFuc(); else {
                    var u = e.formatTime(new Date());
                    parseInt(i.starDate.replace(/-/g, "")) < parseInt(u.substring(0, 10).replace(/-/g, "")) && (console.log("现在年月大于活动开始年月时"), 
                    i.starDate = u.substring(0, 10));
                }
                var d = a.getAllDate(i.starDate, i.endDate);
                console.log("activity---", i), a.setData({
                    activity: i,
                    tempDate: i.starDate + "至" + i.endDate,
                    datelist: d
                }), a.jiexiriqi();
            }
        }).catch(function(t) {
            console.log(t);
        });
    },
    outFuc: function() {
        wx.showToast({
            title: "该活动已过期",
            icon: "none",
            success: function() {
                setTimeout(function() {
                    wx.navigateBack({
                        delta: 1
                    });
                }, 1e3);
            }
        });
    },
    watchBack: function() {
        var a = this, e = t.getMember();
        e && "" != e ? (a.data.isDefault = !1, a.setData({
            isDefault: !1,
            member: e
        })) : (a.data.isDefault = !0, a.setData({
            isDefault: !0
        }));
    },
    numjian: function() {
        1 != this.data.subobj.num && (this.data.subobj.num = this.data.subobj.num - 1, this.setData({
            subobj: this.data.subobj
        }));
    },
    numjia: function() {
        var t = this.data.subobj.num;
        t != this.data.surplus && (this.data.subobj.num = t + 1, this.setData({
            subobj: this.data.subobj
        }));
    },
    getcountbydate: function(a) {
        var e = this, i = {
            activityid: e.data.activity.id,
            date: a
        };
        t.post("/activity/why-activity-order/countbydate", i, "获取当天可预订数量中...").then(function(t) {
            var a = e.data.activity.votes - t.body.data;
            e.setData({
                reserveNum: t.body.data,
                surplus: a
            });
        }).catch(function(t) {
            console.log(t);
        });
    },
    jiexiriqi: function() {
        this.data.date && (this.data.date = this.dateToString(new Date(this.data.date)));
        var t = this.contains(this.data.datelist, this.data.date), a = this.data.datelist[t];
        this.data.subobj.subdate = a, this.getcountbydate(a), this.setData({
            subobj: this.data.subobj
        });
    },
    dateToString: function(t) {
        var a = t.getFullYear(), e = (t.getMonth() + 1).toString(), i = t.getDate().toString();
        return 1 == e.length && (e = "0" + e), 1 == i.length && (i = "0" + i), a + "-" + e + "-" + i;
    },
    contains: function(t, a) {
        for (var e = 0; e < t.length; e++) if (t[e] == a) return e;
        return 0;
    },
    getYearAndMonthAndDay: function(t, a) {
        for (var e = [], i = 0; a.getTime() - t.getTime() >= 0; ) {
            var o = t.getFullYear(), n = 1 == (t.getMonth() + 1).toString().length ? "0" + (t.getMonth() + 1).toString() : (t.getMonth() + 1).toString(), s = 1 == t.getDate().toString().length ? "0" + t.getDate() : t.getDate();
            e[i] = o + "-" + n + "-" + s, t.setDate(t.getDate() + 1), i += 1;
        }
        return e.push(a), e;
    },
    lxrphone: function(t) {
        this.data.subobj.phone = t.detail.value, this.setData({
            subobj: this.data.subobj
        });
    },
    lxrxm: function(t) {
        this.data.subobj.name = t.detail.value, /^[0-9]*$/.test(this.data.subobj.name) && wx.showToast({
            title: "姓名不可为数字！",
            icon: "none",
            duration: 1500
        }), this.data.subobj.name ? this.setData({
            subobj: this.data.subobj
        }) : wx.showToast({
            title: "请输入联系人",
            icon: "none",
            duration: 2e3
        });
    },
    clickOrder: function(t) {
        var a = this;
        console.log("clickOrder", a.data.subobj), console.log("that.data.useDate---", a.data.useDate, a.data.useTime), 
        1 == a.data.activity.isLimit && a.data.reserveNum >= a.data.activity.votes ? wx.showToast({
            title: "抱歉，余票不足！",
            icon: "none"
        }) : a.data.useDate.length ? a.data.useTime.length ? a.data.subobj.num ? a.data.subobj.name && a.data.subobj.name.length ? /^[0-9]*$/.test(a.data.subobj.name) ? wx.showToast({
            title: "姓名不可为数字！",
            icon: "none",
            duration: 1500
        }) : a.data.subobj.phone ? 11 == a.data.subobj.phone.length ? a.data.subobj.num > 5 ? wx.showToast({
            title: "抱歉，最多可订5张票",
            icon: "none",
            duration: 2e3
        }) : a.setData({
            showModal: 0
        }) : wx.showToast({
            title: "手机号长度有误！",
            icon: "none",
            duration: 1500
        }) : wx.showToast({
            title: "请输入联系电话",
            icon: "none",
            duration: 2e3
        }) : wx.showToast({
            title: "请输入联系人",
            icon: "none",
            duration: 2e3
        }) : wx.showToast({
            title: "请输选择票数",
            icon: "none",
            duration: 2e3
        }) : wx.showToast({
            title: "请选择活动时间",
            icon: "none",
            duration: 1500
        }) : wx.showToast({
            title: "请选择活动日期",
            icon: "none",
            duration: 1500
        });
    },
    clickCode: function(t) {
        var a = this;
        a.setData({
            modalCode: 1
        }), a.sendmsg();
    },
    countTime: function() {
        var t = 60, a = this, e = setInterval(function() {
            if (0 == --t) return a.setData({
                modalCode: 0
            }), t = 60, a.setData({
                modalSecond: t + "秒后..."
            }), void clearInterval(e);
            a.setData({
                modalSecond: t + "秒后..."
            });
        }, 1e3);
    },
    sendmsg: function() {
        var a = this, e = {
            mobile: a.data.subobj.phone,
            codeType: "ActivityOrder"
        };
        t.post("/msg/confirmOrderSendCode", e, "发送中...").then(function(t) {
            t.success, wx.showToast({
                title: t.msg,
                icon: "none",
                duration: 2e3
            }), a.countTime();
        }).catch(function(t) {
            console.log(t);
        });
    },
    lxrcode: function(t) {
        this.data.subobj.code = t.detail.value, this.setData({
            subobj: this.data.subobj
        });
    },
    gbmodal: function() {
        this.setData({
            showModal: 1
        });
    },
    submitorder: function() {
        var a = this;
        if (a.data.subobj.code) if (6 == a.data.subobj.code.length) {
            var e = {};
            e.num = a.data.subobj.num, e.codeType = "ActivityOrder", e.usePhone = a.data.subobj.phone, 
            e.useName = a.data.subobj.name, e.useDate = a.data.useDate + " " + a.data.useTime, 
            e.activityId = a.data.activity.id, e.code = a.data.subobj.code, t.post("/activity/why-activity-order/add", e, "提交订单中...").then(function(t) {
                t.success ? (wx.setStorageSync("order_id", t.body.orderid), wx.redirectTo({
                    url: "/pages/mine/activityorder/activityorder"
                })) : wx.showToast({
                    title: t.msg,
                    icon: "none",
                    duration: 2e3
                });
            }).catch(function(t) {
                console.log(t);
            });
        } else wx.showToast({
            title: "验证码长度有误！",
            icon: "none",
            duration: 1500
        }); else wx.showToast({
            title: "请输入验证码",
            icon: "none",
            duration: 2e3
        });
    },
    getAllDate: function(t, a) {
        var e = [], i = t.split("-"), o = a.split("-"), n = new Date();
        n.setUTCFullYear(i[0], i[1] - 1, i[2]);
        var s = new Date();
        s.setUTCFullYear(o[0], o[1] - 1, o[2]);
        var u = n.getTime(), d = s.getTime(), c = void 0;
        for (c = u; c <= d; ) e.push(this.format(new Date(parseInt(c)))), c += 864e5;
        return e;
    },
    format: function(t) {
        var a = "", e = t.getMonth() + 1 >= 10 ? t.getMonth() + 1 : "0" + (t.getMonth() + 1), i = t.getDate() >= 10 ? t.getDate() : "0" + t.getDate();
        return a += t.getFullYear() + "-", a += e + "-", a += i;
    },
    bindchangedate: function(t) {
        console.log(t.detail.value);
        var a = this;
        console.log("useDate--", t.detail.value, "that.data.activity.starDate--", a.data.activity.starDate);
        var i = t.detail.value, o = a.data.activity, n = e.formatTime(new Date());
        i == o.starDate ? parseInt(o.starTime.replace(":", "")) < parseInt(n.slice(11, 16).replace(":", "")) && parseInt(o.endTime.replace(":", "")) > parseInt(n.slice(11, 16).replace(":", "")) ? (console.log("现在时分大于活动开始时分时", o.starTime, n.slice(11, 16)), 
        o.starTime = n.slice(11, 16), a.getcountbydate(i), a.setData({
            useDate: i,
            activity: o
        })) : parseInt(o.endTime.replace(":", "")) < parseInt(n.slice(11, 16).replace(":", "")) ? o.starDate == o.endDate ? (console.log("现在时分大于活动结束时分时"), 
        a.outFuc()) : wx.showToast({
            title: "所选日期时间已过，请重新选择日期",
            icon: "none",
            duration: 3e3
        }) : (a.getcountbydate(i), a.setData({
            useDate: i
        })) : (a.getcountbydate(i), a.setData({
            useDate: i
        }));
    },
    bindchangeTime: function(t) {
        var a = this;
        if (a.data.useDate.length) {
            console.log(t.detail.value);
            var e = t.detail.value;
            a.setData({
                useTime: e
            });
        } else wx.showToast({
            title: "请先选择活动日期",
            icon: "none",
            duration: 1500
        });
    }
});
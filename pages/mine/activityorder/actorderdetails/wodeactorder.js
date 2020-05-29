var t = function(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}(require("../../../../utils/weapp-qrcode.js")), a = getApp();

Page({
    data: {
        orderid: "",
        showModal: 1,
        showModalFlag: 1,
        star: 5,
        flag: 0,
        starScore: "",
        num: "",
        pointNum: "",
        mystarScore: "",
        num2: "",
        pointNum2: "",
        peoNum: "",
        staticUrl: a.globalData.staticurl
    },
    onLoad: function(t) {
        var a = this;
        0 == t.toEvaluate && a.clickEvaluate(), a.setData({
            staticurl: "https://hm.zhuwentec.com/cul-cloud/",
            memberId: getApp().globalData.member.id
        });
        t.id && (a.setData({
            type: 2
        }), t.id), t.roomid && (a.setData({
            type: 1
        }), t.roomid), this.data.orderid = t.id, this.getinfo(this.data.orderid);
    },
    clickOrder: function(a) {
        var e = this, i = e.data.info;
        i.orderState = i.order_state, console.log("clickOrderinfo--", i), "2" == i.is_limit ? wx.navigateTo({
            url: "/pages/mine/activityorder/actposition/position",
            events: {
                acceptDataFromOpenedPage: function(t) {
                    console.log(t);
                }
            },
            success: function(t) {
                t.eventChannel.emit("acceptDataFromOpenerPage", {
                    data: i
                });
            }
        }) : (new t.default("myQrcode", {
            text: "Q:" + i.id + ":" + i.code,
            width: 200,
            height: 200,
            padding: 12,
            correctLevel: t.default.CorrectLevel.L,
            callback: function(t) {
                console.log(t.path);
            }
        }), e.setData({
            info: i,
            showModal: 0
        }));
    },
    clickEvaluate: function() {
        this.setData({
            showModalFlag: 0
        });
    },
    closehxm: function(t) {
        this.setData({
            showModal: 1
        });
    },
    closepingjia: function() {
        this.setData({
            showModalFlag: 1,
            flag: 0
        });
    },
    onShow: function() {
        this.setData({
            imgDate: this.data.staticUrl + "iconDateNN.png",
            imgTime: this.data.staticUrl + "iconActiveTime@3x.png",
            imgPrice: this.data.staticurl + "/wxapp/images/faxian_price.png",
            imgConcats: this.data.staticUrl + "iconPersonN.png",
            imgTelephone: this.data.staticUrl + "iconTelNN.png",
            starOn: this.data.staticurl + "/wxapp/images/changguanstar01.png",
            starOff: this.data.staticurl + "/wxapp/images/changguanstar02.png",
            starOn01: this.data.staticurl + "/wxapp/images/star_per01.png",
            starOn02: this.data.staticurl + "/wxapp/images/star_per02.png",
            starOn03: this.data.staticurl + "/wxapp/images/star_per03.png",
            starOn04: this.data.staticurl + "/wxapp/images/star_per04.png",
            starOn05: this.data.staticurl + "/wxapp/images/star_per05.png",
            starOn06: this.data.staticurl + "/wxapp/images/star_per06.png",
            starOn07: this.data.staticurl + "/wxapp/images/star_per07.png",
            starOn08: this.data.staticurl + "/wxapp/images/star_per08.png",
            starOn09: this.data.staticurl + "/wxapp/images/star_per09.png"
        });
    },
    pay: function() {
        var t = this;
        a.post("/activity/why-activity-order/payment?type=1&id=" + t.data.orderid, {}, "支付中...").then(function(a) {
            a.success && (wx.showToast({
                title: "支付成功"
            }), t.getinfo(t.data.orderid));
        }).catch(function(t) {
            console.log(t);
        });
    },
    getinfo: function(t) {
        var e = this;
        a.post("/activity/why-activity-order/get?id=" + t, {}, "获取活动详情列表中...").then(function(t) {
            var a = t.body.data, i = new Date(a.end_date), s = new Date(a.star_date);
            a.end_date = i.getFullYear() + "-" + (i.getMonth() + 1) + "-" + i.getDate(), a.star_date = s.getFullYear() + "-" + (s.getMonth() + 1) + "-" + s.getDate(), 
            a.latitude = parseInt(a.latitude) / 1e6, a.longitude = parseInt(a.longitude) / 1e6, 
            e.setData({
                info: a
            });
        }).catch(function(t) {
            console.log(t);
        });
    },
    getBase64ImageUrl: function(t) {
        return t ? "data:image/png;base64," + (t = wx.arrayBufferToBase64(wx.base64ToArrayBuffer(t))) : "";
    },
    goEvaluate: function() {
        var t = this;
        a.post("/activity/why-activity-order/upOrderState?id=" + t.data.orderid + "&state=5", {}, "加载中...").then(function(a) {
            a.success && (wx.showToast({
                title: "评价成功"
            }), t.getinfo(t.data.orderid));
        }).catch(function(t) {
            console.log(t);
        });
    },
    surepingjia: function() {
        var t = this, e = {
            relationshipId: t.data.info.id,
            type: t.data.type,
            stars: t.data.flag
        };
        a.post("/WhyVenueActOrderEvaluate/save", e, "提交中...").then(function(a) {
            a.success && (t.setData({
                showModalFlag: 1
            }), wx.showToast({
                title: "评价成功"
            }), wx.navigateTo({
                url: "/pages/mine/activityorder/activityorder?state=5"
            }));
        }).catch(function(t) {
            console.log(t);
        });
    },
    changeColor1: function() {
        this.setData({
            flag: 1
        });
    },
    changeColor2: function() {
        this.setData({
            flag: 2
        });
    },
    changeColor3: function() {
        this.setData({
            flag: 3
        });
    },
    changeColor4: function() {
        this.setData({
            flag: 4
        });
    },
    changeColor5: function() {
        this.setData({
            flag: 5
        });
    },
    getScore: function() {
        console.log("获取评价分数");
        var t = this, e = {
            memberId: t.data.memberId,
            orderId: t.data.orderid
        };
        a.post("/WhyVenueActOrderEvaluate/getScore", e, "获取中...").then(function(a) {
            if (console.log(a), a.success) {
                var e = a.body.data;
                t.setData({
                    starScore: e.totalScore,
                    mystarScore: e.stars,
                    peoNum: e.countNumber
                }), t.setStar();
            }
        }).catch(function(t) {
            console.log(t);
        });
    },
    setStar: function() {
        var t = this;
        t.setData({
            num: parseInt(t.data.starScore),
            pointNum: parseInt(t.data.starScore % 1 * 10),
            num2: parseInt(t.data.mystarScore),
            pointNum2: parseInt(t.data.mystarScore % 1 * 10)
        });
    }
});
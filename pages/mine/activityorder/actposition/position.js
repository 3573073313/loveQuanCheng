var t, a = require("../../../../utils/qqmap-wx-jssdk.js"), o = getApp();

Page({
    data: {
        orderInfo: {},
        pageinfo: {},
        borderRadius: 5,
        latitude: null,
        longitude: null,
        markers: [],
        mapCtx: "",
        callout: {
            content: "当前位置",
            bgColor: "#736F6E",
            color: "#ffffff",
            padding: 10,
            display: "ALWAYS",
            borderRadius: 5
        },
        mobileLocation: {
            longitude: 0,
            latitude: 0,
            address: "",
            pageSize: 10,
            pageNo: 1
        },
        actives: [],
        activesBoolean: !1,
        activesLen: !1,
        tempWindowHeightFlag: 0
    },
    onLoad: function(t) {
        var a = this;
        this.getOpenerEventChannel().on("acceptDataFromOpenerPage", function(t) {
            console.log(t), a.getActOrderInfo(t.data), a.setData({
                orderInfo: t.data
            });
        });
        var o = 0;
        wx.getSystemInfo({
            success: function(t) {
                console.log(t.screenHeight), o = t.screenHeight - 150;
            }
        }), this.setData({
            staticurl: getApp().globalData.staticurl,
            tempWindowHeightFlag: o
        });
    },
    onShow: function() {
        var o = this;
        t = new a({
            key: "LSCBZ-P6SRW-KQKRA-O67DZ-E5S6V-USFV7"
        }), this.data.latitude ? (t.reverseGeocoder({
            location: {
                latitude: this.data.latitude,
                longitude: this.data.longitude
            },
            success: function(t) {
                console.log(t), o.data.mobileLocation.address = t.result.address, console.log(o.data.mobileLocation.address), 
                o.setData({
                    mobileLocation: o.data.mobileLocation
                });
            }
        }), this.mapCtx = wx.createMapContext("qqMap")) : this.getmylocation();
    },
    getActOrderInfo: function(t) {
        var a = this, o = [], e = {
            id: t.id,
            title: t.activityName,
            latitude: t.latitude,
            longitude: t.longitude,
            circle: [ {
                color: "#00000044",
                latitude: t.latitude,
                longitude: t.longitude,
                radius: t.signInDistance,
                fillColor: "#00000044"
            } ],
            iconPath: "https://qcstatic.zhuwentec.com/wxapp/icon-dw-new-map.png",
            width: 20,
            height: 20,
            callout: {
                content: t.activityName,
                bgColor: a.data.callout.bgColor,
                color: a.data.callout.color,
                padding: a.data.callout.padding,
                display: a.data.callout.display,
                borderRadius: a.data.callout.borderRadius
            }
        };
        o.push(e);
        var i = {
            id: 0,
            title: "当前位置",
            latitude: a.data.latitude,
            longitude: a.data.longitude,
            callout: {
                content: "当前位置",
                bgColor: a.data.callout.bgColor,
                color: a.data.callout.color,
                padding: a.data.callout.padding,
                display: a.data.callout.display,
                borderRadius: a.data.callout.borderRadius
            }
        };
        o.push(i), a.setData({
            markers: o,
            circles: [ {
                color: "#00000044",
                latitude: t.latitude,
                longitude: t.longitude,
                radius: t.signInDistance,
                fillColor: "#00000044"
            } ]
        });
    },
    markertap: function(t) {
        console.log(t);
    },
    getmylocation: function() {
        var t = this;
        wx.getLocation({
            type: "gcj02",
            success: function(a) {
                console.log(a), t.setData({
                    latitude: a.latitude,
                    longitude: a.longitude,
                    markers: t.data.markers
                });
            },
            fail: function(a) {
                o.getPermission(t), console.log("fail");
            }
        });
    },
    moveToLocation: function() {
        var t = this;
        wx.chooseLocation({
            success: function(a) {
                var o = {
                    longitude: a.longitude,
                    latitude: a.latitude,
                    address: a.address,
                    pageSize: 10,
                    pageNo: 1
                };
                t.setData({
                    mobileLocation: o,
                    latitude: a.latitude,
                    longitude: a.longitude,
                    markers: t.data.markers
                });
            },
            fail: function(t) {
                console.log("fail");
            }
        });
    },
    getchangguanlist: function() {
        var t = this;
        wx.getLocation({
            type: "gcj02",
            success: function(a) {
                console.log(a);
                var e = a.latitude, i = a.longitude;
                t.data.mobileLocation.longitude = i, t.data.mobileLocation.latitude = e, o.post("venue/why-venue/list", t.data.mobileLocation, "获取场馆列表中...").then(function(a) {
                    for (var o = {
                        pages: a.body.page.pages,
                        current: a.body.page.current
                    }, e = [], i = 0; i < a.body.page.records.length; i++) {
                        var l = a.body.page.records[i].latitude, d = a.body.page.records[i].longitude;
                        console.log("----", l, d);
                        var n = {
                            id: a.body.page.records[i].id,
                            title: a.body.page.records[i].venueName,
                            latitude: l,
                            longitude: d,
                            iconPath: "https://qcstatic.zhuwentec.com/wxapp/map_icon.png",
                            width: 20,
                            height: 20,
                            callout: {
                                content: a.body.page.records[i].venueName,
                                bgColor: t.data.callout.bgColor,
                                color: t.data.callout.color,
                                padding: t.data.callout.padding,
                                display: t.data.callout.display,
                                borderRadius: t.data.callout.borderRadius
                            }
                        };
                        e.push(n);
                    }
                    var c = {
                        id: 0,
                        title: "当前位置",
                        latitude: t.data.latitude,
                        longitude: t.data.longitude,
                        callout: {
                            content: "当前位置",
                            bgColor: t.data.callout.bgColor,
                            color: t.data.callout.color,
                            padding: t.data.callout.padding,
                            display: t.data.callout.display,
                            borderRadius: t.data.callout.borderRadius
                        }
                    };
                    e.push(c), console.log(a), t.data.activesBoolean = !0, t.setData({
                        activesBoolean: t.data.activesBoolean
                    }), 0 == a.body.page.records.length && (t.data.activesLen = !0, t.setData({
                        activesLen: t.data.activesLen
                    })), t.setData({
                        pageinfo: o,
                        actives: a.body.page.records,
                        markers: e
                    });
                }).catch(function(t) {
                    console.log(t);
                });
            }
        });
    },
    goCheckIn: function() {
        var t = this, a = t.data.orderInfo;
        wx.showModal({
            title: "提示",
            content: "尊敬的用户，您即将" + (2 == a.orderState ? "签到" : "签退") + "，请确认是否继续" + (2 == a.orderState ? "签到" : "签退") + "？",
            success: function(e) {
                e.confirm ? wx.getLocation({
                    type: "gcj02",
                    success: function(e) {
                        var i = t.data.orderInfo, l = {
                            orderId: i.id,
                            latitude: e.latitude,
                            longitude: e.longitude
                        }, d = "";
                        2 != i.activityType ? d = "/activity/why-activity-order/goCheckIn" : (d = "JnUnderlineActivitySign/activitySign", 
                        l.signType = i.signType, l.memberId = o.getMember().id), o.post(d, l, (2 == a.orderState ? "签到" : "签退") + "中...").then(function(t) {
                            t.success ? wx.showToast({
                                title: t.msg,
                                icon: "success",
                                duration: 2e3,
                                success: function() {
                                    setTimeout(function() {
                                        var t = 1 == l.signType ? 2 == a.orderState ? 3 : 2 : 2 == a.orderState ? 3 : 6;
                                        wx.setStorageSync("orderState", t), wx.navigateBack({
                                            delta: 1
                                        });
                                    }, 2e3);
                                }
                            }) : wx.showToast({
                                title: t.msg,
                                icon: "none",
                                duration: 2e3
                            });
                        }).catch(function(t) {
                            console.log(t);
                        });
                    }
                }) : e.cancel && console.log("用户点击取消");
            }
        });
    }
});
var t = function(t) {
    if (t && t.__esModule) return t;
    var e = {};
    if (null != t) for (var a in t) Object.prototype.hasOwnProperty.call(t, a) && (e[a] = t[a]);
    return e.default = t, e;
}(require("../../ec-canvas/echarts")), e = new (require("../../utils/qqmap-wx-jssdk.js"))({
    key: "P26BZ-IRUK4-ZW5UP-XPMQL-F54SQ-3HBDW"
}), a = getApp();

Page({
    data: {
        login: !1,
        isDefault: !0,
        member: {},
        staticurl: getApp().globalData.staticurl,
        indicatorDots: !0,
        vertical: !1,
        autoplay: !0,
        interval: 3e3,
        duration: 1200,
        activeColor: "#D01728",
        swipers: [ {
            url: getApp().globalData.staticurl + "zhuanfen_swiper.png"
        }, {
            url: getApp().globalData.staticurl + "zhuanfen_swiper.png"
        } ],
        activityList: [],
        ec: {
            lazyLoad: !0
        },
        latitude: "",
        longitude: "",
        address: "",
        scoreInfo: {},
        finish: !1,
        ecComponent: {},
        chart: {},
        index: 0,
        scoreList: [ "积分", "0-9", "10-19", "20-29", "30-39", "40-49", "50-59", "60-69", "70-79", "80-89", "90-100" ],
        typeIndex: 0,
        typeList: [],
        areaList: [],
        areaIndex: [ 0, 0 ]
    },
    onLoad: function(t) {
        console.log("onload加载"), this.getLocation();
    },
    onShow: function() {
        console.log("show显示");
        var t = this;
        t.watchBack(), t.getScoreInfo(), t.getTypeList(), t.getFirstArea();
    },
    init: function() {
        console.log("进入echarts初始化");
        var e = this, a = "";
        e.ecComponentOne.init(function(o, i, n) {
            var s = t.init(o, null, {
                width: i,
                height: n
            });
            a = e.data.scoreInfo.allScore < 60 ? .01 : (parseInt(e.data.scoreInfo.allScore) / 1e4).toFixed(2), 
            console.log("percent哈哈哈", a);
            var r = {
                series: [ {
                    name: "刻度",
                    type: "gauge",
                    radius: "119.0%",
                    center: [ "50%", "90%" ],
                    min: 0,
                    max: 50,
                    splitNumber: 10,
                    startAngle: 180,
                    endAngle: 0,
                    axisLine: {
                        show: !0,
                        lineStyle: {
                            width: 1,
                            color: [ [ 1, "rgba(0,0,0,0)" ] ]
                        }
                    },
                    axisLabel: {
                        show: !0,
                        color: "#C51A2A",
                        distance: -18,
                        formatter: function(t) {
                            switch (t + "") {
                              case "0":
                                return "0";

                              case "10":
                                return "2千";

                              case "20":
                                return "4千";

                              case "30":
                                return "6千";

                              case "40":
                                return "8千";

                              case "50":
                                return "1万";
                            }
                        }
                    },
                    axisTick: {
                        show: !0,
                        splitNumber: 2,
                        lineStyle: {
                            color: "#C51A2A",
                            width: 1
                        },
                        length: -7
                    },
                    splitLine: {
                        show: !0,
                        length: -11,
                        lineStyle: {
                            color: "#C51A2A",
                            width: 1
                        }
                    },
                    detail: {
                        show: !1
                    },
                    pointer: {
                        show: !1
                    }
                }, {
                    type: "gauge",
                    radius: "119%",
                    center: [ "50%", "90%" ],
                    splitNumber: 0,
                    startAngle: 180,
                    endAngle: 0,
                    axisLine: {
                        show: !0,
                        lineStyle: {
                            width: 10,
                            color: [ [ a, new t.graphic.LinearGradient(0, 0, 1, 0, [ {
                                offset: 0,
                                color: "#FAC97F"
                            }, {
                                offset: 1,
                                color: "#E95D48"
                            } ]) ], [ 1, "#D4D2D3" ] ]
                        }
                    },
                    splitLine: {
                        show: !1
                    },
                    axisLabel: {
                        show: !1
                    },
                    axisTick: {
                        show: !1
                    },
                    pointer: {
                        show: !1
                    },
                    title: {
                        show: !0,
                        offsetCenter: [ 0, "-5%" ],
                        textStyle: {
                            color: "#666",
                            fontSize: 12
                        }
                    },
                    detail: {
                        show: !0,
                        offsetCenter: [ 0, "-40%" ],
                        color: "#000",
                        formatter: function(t) {
                            return t;
                        },
                        textStyle: {
                            fontSize: 25
                        }
                    },
                    data: [ {
                        name: "累计积分",
                        value: e.data.scoreInfo.allScore ? e.data.scoreInfo.allScore : 0
                    } ]
                } ]
            }, l = {
                series: [ {
                    name: "刻度",
                    type: "gauge",
                    radius: "119.0%",
                    center: [ "50%", "90%" ],
                    min: 0,
                    max: 50,
                    splitNumber: 10,
                    startAngle: 180,
                    endAngle: 0,
                    axisLine: {
                        show: !0,
                        lineStyle: {
                            width: 1,
                            color: [ [ 1, "rgba(0,0,0,0)" ] ]
                        }
                    },
                    axisLabel: {
                        show: !0,
                        color: "#C51A2A",
                        distance: -18,
                        formatter: function(t) {
                            switch (t + "") {
                              case "0":
                                return "0";

                              case "10":
                                return "2千";

                              case "20":
                                return "4千";

                              case "30":
                                return "6千";

                              case "40":
                                return "8千";

                              case "50":
                                return "1万";
                            }
                        }
                    },
                    axisTick: {
                        show: !0,
                        splitNumber: 2,
                        lineStyle: {
                            color: "#C51A2A",
                            width: 1
                        },
                        length: -7
                    },
                    splitLine: {
                        show: !0,
                        length: -11,
                        lineStyle: {
                            color: "#C51A2A",
                            width: 1
                        }
                    },
                    detail: {
                        show: !1
                    },
                    pointer: {
                        show: !1
                    }
                }, {
                    type: "gauge",
                    radius: "119%",
                    center: [ "50%", "90%" ],
                    splitNumber: 0,
                    startAngle: 180,
                    endAngle: 0,
                    axisLine: {
                        show: !0,
                        lineStyle: {
                            width: 10,
                            color: [ [ a, new t.graphic.LinearGradient(0, 0, 1, 0, [ {
                                offset: 0,
                                color: "#D4D2D3"
                            }, {
                                offset: 1,
                                color: "#D4D2D3"
                            } ]) ], [ 1, "#D4D2D3" ] ]
                        }
                    },
                    splitLine: {
                        show: !1
                    },
                    axisLabel: {
                        show: !1
                    },
                    axisTick: {
                        show: !1
                    },
                    pointer: {
                        show: !1
                    },
                    title: {
                        show: !0,
                        offsetCenter: [ 0, "-5%" ],
                        textStyle: {
                            color: "#666",
                            fontSize: 12
                        }
                    },
                    detail: {
                        show: !0,
                        offsetCenter: [ 0, "-40%" ],
                        color: "#000",
                        formatter: function(t) {
                            return t;
                        },
                        textStyle: {
                            fontSize: 25
                        }
                    },
                    data: [ {
                        name: "累计积分",
                        value: e.data.scoreInfo.allScore ? e.data.scoreInfo.allScore : 0
                    } ]
                } ]
            };
            return e.data.scoreInfo.allScore < 60 ? (console.log("分数", e.data.scoreInfo.allScore), 
            console.log("分数少于60！"), s.setOption(l)) : (console.log("分数", e.data.scoreInfo.allScore), 
            console.log("分数大于60！"), s.setOption(r)), e.setData({
                isLoaded: !0
            }), s;
        });
    },
    watchBack: function() {
        var t = this, e = a.getMember();
        e && "" != e ? (t.data.isDefault = !1, t.setData({
            isDefault: !1,
            member: e
        })) : (t.data.isDefault = !0, t.setData({
            isDefault: !0
        }));
    },
    onConfirm: function(t) {
        var e = this;
        console.log(t), console.log("onConfirm:" + JSON.stringify(t)), a.onGotUserInfo(t.detail.detail, function() {
            var t = wx.getStorageSync("member");
            a.setUseTime(), console.log("callback:" + JSON.stringify(t)), e.setData({
                member: t,
                login: !1,
                isDefault: !1
            });
        });
    },
    onCancel: function() {
        this.setData({
            login: !1
        });
    },
    getMylocation: function() {
        var t = this;
        e.reverseGeocoder({
            success: function(e) {
                var e = e.result;
                t.setData({
                    latitude: e.location.lat,
                    longitude: e.location.lng,
                    address: e.address + e.formatted_addresses.recommend
                }), t.getactivityList();
            },
            fail: function(t) {
                console.error(t);
            },
            complete: function(t) {}
        });
    },
    getLocation: function() {
        var t = this;
        wx.getLocation({
            type: "wgs84",
            success: function(e) {
                console.log("location", e), t.setData({
                    latitude: e.latitude,
                    longitude: e.longitude
                }), t.getactivityList();
            }
        });
    },
    getScoreInfo: function() {
        var t = this;
        a.getScoreInfo(function() {
            var e = wx.getStorageSync("scoreInfo");
            console.log("scoreInfo---", e), t.setData({
                scoreInfo: e,
                finish: !0
            }), t.ecComponentOne = t.selectComponent("#mychart-dom-bar"), t.init();
        });
    },
    getTypeList: function() {
        var t = this;
        a.post("JnProjectTypeManagement/list", {
            pageSize: 50
        }, "加载中...").then(function(e) {
            if (e.success) {
                console.log(e);
                var a = e.body.page.records;
                a.splice(0, 0, {
                    id: "",
                    name: "类型"
                }), t.setData({
                    typeList: a
                });
            }
        }).catch(function(t) {
            console.log(t);
        });
    },
    bindTypePickerChange: function(t) {
        var e = this;
        console.log(t), console.log("picker发送选择改变，携带值为", t.detail.value), e.data.typeIndex = t.detail.value, 
        e.setData({
            typeIndex: e.data.typeIndex,
            typeid: e.data.typeList[t.detail.value].id
        }), console.log(" that.data.typeList", e.data.typeList), console.log("picker发送选择改变，携带id为", e.data.typeList[t.detail.value].id), 
        e.getactivityList();
    },
    bindScorePickerChange: function(t) {
        var e = this;
        console.log(t), console.log("picker发送选择改变，携带值为", t.detail.value), e.data.index = t.detail.value;
        var a = e.data.scoreList[t.detail.value];
        "积分" == a && (a = ""), e.setData({
            index: e.data.index,
            tempActIntegral: a
        }), console.log("picker发送选择改变，携带id为", e.data.scoreList[t.detail.value]), e.getactivityList();
    },
    getFirstArea: function() {
        var t = this;
        a.post("/area/sys-area/listCityData", {
            pId: 1
        }, "加载中...").then(function(e) {
            if (e) {
                var o = t;
                console.log("一级地区", e);
                var i = e.body.data;
                i.splice(0, 0, {
                    title: "地区"
                }), console.log(i), o.data.areaList[0] = i, o.setData({
                    areaList: o.data.areaList
                });
                var n;
                n = o.data.areaId && "" != o.data.areaId ? o.data.areaId : {
                    pId: i[0].id
                }, a.post("/area/sys-area/listAreaData", n, "加载中...").then(function(e) {
                    if (e) {
                        var a = t, o = e.body.sList;
                        a.data.areaList[1] = o, a.setData({
                            areaList: a.data.areaList
                        });
                    }
                }).catch(function(t) {
                    console.log(t);
                });
            }
        }).catch(function(t) {
            console.log(t);
        });
    },
    bindMultiPickerColumnChange: function(t) {
        var e = this, o = this;
        if (0 == t.detail.column) {
            var i = {
                pId: o.data.areaList[0][t.detail.value].id
            };
            a.post("/area/sys-area/listAreaData", i, "加载中...").then(function(t) {
                if (t) {
                    var a = t.body.sList, o = e, a = t.body.sList;
                    o.data.areaList[1] = a, o.setData({
                        areaList: o.data.areaList
                    });
                }
            }).catch(function(t) {
                console.log(t);
            });
        }
    },
    bindMultiPickerChange: function(t) {
        var e = t.detail.value;
        console.log("picker发送选择改变，携带tempIndex为", e);
        var a = e[1];
        console.log("temp_index:", a), console.log("picker发送选择改变，携带id为", this.data.areaList[1][a]);
        var o = "";
        o = void 0 == this.data.areaList[1][a] ? "" : this.data.areaList[1][a].id, this.setData({
            areaIndex: t.detail.value,
            areaId: o
        }), this.getactivityList();
    },
    toDetail: function(t) {
        var e = this;
        e.data.isDefault ? e.setData({
            login: !0
        }) : wx.navigateTo({
            url: t.currentTarget.dataset.url
        });
    },
    getactivityList: function(t) {
        var e = this, o = {
            orgId: e.data.areaId ? e.data.areaId : "",
            itemTypeId: e.data.typeId ? e.data.typeId : ""
        };
        if (t && (o.pageNo = t), e.data.tempActIntegral) {
            var i = e.data.tempActIntegral, n = i.indexOf("-");
            o.minScore = i.substring(0, n), o.maxScore = i.substring(n + 1, i.length);
        }
        var s = "";
        s = "/jnGoodsThing/list", o.typeId = e.data.activityType ? e.data.activityType : "", 
        o.memberId = a.getMember().id, a.post(s, o, "加载中...").then(function(a) {
            if (a) {
                var o = a.body.page.records, i = (a.body.page.current, a.body.page.total, a.body.page.size, 
                e.data.activityList);
                o.forEach(function(e, a) {
                    if (e.juli && (e.juli = e.juli > 1e3 ? parseFloat((parseInt(e.juli) / 1e3).toFixed(2)) + "KM" : e.juli = e.juli + "M"), 
                    e.startDate) {
                        var o = e.startDate.split("-");
                        o.splice(0, 1), e.startDate = o.join("-");
                        var n = e.endDate.split("-");
                        n.splice(0, 1), e.endDate = n.join("-");
                    }
                    if (2 == e.type) {
                        var s = e.listImg;
                        e.listImg = e.detailImg, e.detailImg = s;
                    }
                    console.log("pageNo----", t), t && i.push(e);
                }), void 0 == t && (i = o), e.setData({
                    activityList: i,
                    pages: a.body.page.pages,
                    pageCurrent: a.body.page.current
                });
            }
        }).catch(function(t) {
            console.log(t);
        });
    },
    onReachBottom: function() {
        var t = this, e = t.data.pages, a = t.data.pageCurrent;
        e > a ? (wx.showToast({
            title: "加载中",
            icon: "loading",
            duration: 2e3
        }), t.getactivityList(a + 1)) : wx.showToast({
            title: "没有更多了",
            icon: "none",
            duration: 2e3
        });
    }
});
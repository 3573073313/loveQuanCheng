var t = getApp();

new (require("../../../../utils/qqmap-wx-jssdk.js"))({
    key: "P26BZ-IRUK4-ZW5UP-XPMQL-F54SQ-3HBDW"
});

Page({
    data: {
        topTypeList: [ {
            typeName: "投稿",
            src: "/image/index2.png"
        }, {
            typeName: "答题",
            src: "/image/index2.png",
            url: "/pages/index/indexsnap/hotActList/answer/answer"
        }, {
            typeName: "游戏",
            src: "/image/index2.png"
        }, {
            typeName: "投票",
            src: "/image/index2.png"
        }, {
            typeName: "拍客",
            src: "/image/index2.png"
        }, {
            typeName: "现场",
            src: "/image/index2.png"
        }, {
            typeName: "招募",
            src: "/image/index2.png"
        }, {
            typeName: "服务",
            src: "/image/index2.png"
        } ],
        staticurl: getApp().globalData.staticurl,
        areaList: [],
        areaIndex: [ 0, 0 ],
        typeIndex: 0,
        typeList: [],
        index: 0,
        scoreList: [ "积分", "0-9", "10-19", "20-29", "30-39", "40-49", "50-59", "60-69", "70-79", "80-89", "90-100" ],
        isNoType: !1,
        activityList: []
    },
    getLocation: function() {
        var t = this;
        wx.getLocation({
            type: "wgs84",
            success: function(a) {
                console.log("location", a), t.setData({
                    latitude: a.latitude,
                    longitude: a.longitude
                });
            }
        });
    },
    getActTypeList: function() {
        var a = this, e = {
            pageSize: 50
        };
        t.post("JnOnlineActivityType/list", e, "加载中...").then(function(t) {
            if (t.success) {
                console.log(t);
                var e = t.body.page.records;
                a.setData({
                    topTypeList: e
                });
            }
        }).catch(function(t) {
            console.log(t);
        });
    },
    clickTypeAct: function(t) {
        var a = this, e = t.currentTarget.dataset.id;
        a.setData({
            activityType: e
        }), a.getactivityList();
    },
    getTypeList: function() {
        var a = this;
        t.post("JnProjectTypeManagement/list", {
            pageSize: 50
        }, "加载中...").then(function(t) {
            if (t.success) {
                console.log(t);
                var e = t.body.page.records;
                e.splice(0, 0, {
                    id: "",
                    name: "类型"
                }), a.setData({
                    typeList: e
                });
            }
        }).catch(function(t) {
            console.log(t);
        });
    },
    getactivityList: function(a) {
        var e = this, i = {
            orgId: e.data.areaId ? e.data.areaId : "",
            itemTypeId: e.data.typeId ? e.data.typeId : ""
        };
        if (a && (i.pageNo = a), e.data.tempActIntegral) {
            var n = e.data.tempActIntegral, s = n.indexOf("-");
            i.minScore = n.substring(0, s), i.maxScore = n.substring(s + 1, n.length);
        }
        var o = "";
        e.data.isNoType ? (o = "JnOnlineActivity/list", i.activityType = e.data.snapTypeId) : (o = "/jnGoodsThing/list", 
        i.typeId = e.data.activityType ? e.data.activityType : "", i.memberId = t.getMember().id), 
        t.post(o, i, "加载中...").then(function(t) {
            if (t) {
                var i = t.body.page.records, n = {
                    current: t.body.page.current,
                    total: t.body.page.total,
                    size: t.body.page.size
                }, s = e.data.activityList;
                i.forEach(function(t, e) {
                    if (t.juli && (t.juli = t.juli > 1e3 ? parseFloat((parseInt(t.juli) / 1e3).toFixed(2)) + "KM" : t.juli = t.juli + "M"), 
                    2 == t.type) {
                        var i = t.listImg;
                        t.listImg = t.detailImg, t.detailImg = i;
                    }
                    if (t.startDate) {
                        var n = t.startDate.split("-");
                        n.splice(0, 1), t.startDate = n.join("-");
                        var o = t.endDate.split("-");
                        o.splice(0, 1), t.endDate = o.join("-");
                    }
                    console.log("pageNum----", a), a && s.push(t);
                }), void 0 == a && (s = i), e.setData({
                    activityList: s,
                    page: n
                });
            }
        }).catch(function(t) {
            console.log(t);
        });
    },
    bindTypePickerChange: function(t) {
        var a = this;
        console.log(t), console.log("picker发送选择改变，携带值为", t.detail.value), a.data.typeIndex = t.detail.value, 
        a.setData({
            typeIndex: a.data.typeIndex,
            typeId: a.data.typeList[t.detail.value].id
        }), console.log(" that.data.typeList", a.data.typeList), console.log("picker发送选择改变，携带id为", a.data.typeList[t.detail.value].id), 
        a.getactivityList();
    },
    bindScorePickerChange: function(t) {
        var a = this;
        console.log(t), console.log("picker发送选择改变，携带值为", t.detail.value), a.data.index = t.detail.value;
        var e = a.data.scoreList[t.detail.value];
        "积分" == e && (e = ""), a.setData({
            index: a.data.index,
            tempActIntegral: e
        }), console.log("picker发送选择改变，携带id为", a.data.scoreList[t.detail.value]), a.getactivityList();
    },
    getFirstArea: function() {
        var a = this;
        t.post("/area/sys-area/listCityData", {
            pId: 1
        }, "加载中...").then(function(e) {
            if (e) {
                var i = a;
                console.log("一级地区", e);
                var n = e.body.data;
                n.splice(0, 0, {
                    title: "地区"
                }), console.log(n), i.data.areaList[0] = n, i.setData({
                    areaList: i.data.areaList
                });
                var s;
                s = i.data.areaId && "" != i.data.areaId ? i.data.areaId : {
                    pId: n[0].id
                }, t.post("/area/sys-area/listAreaData", s, "加载中...").then(function(t) {
                    if (t) {
                        var e = a, i = t.body.sList;
                        e.data.areaList[1] = i, e.setData({
                            areaList: e.data.areaList
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
    bindMultiPickerColumnChange: function(a) {
        var e = this, i = this;
        if (0 == a.detail.column) {
            var n = {
                pId: i.data.areaList[0][a.detail.value].id
            };
            t.post("/area/sys-area/listAreaData", n, "加载中...").then(function(t) {
                if (t) {
                    var a = t.body.sList, i = e, a = t.body.sList;
                    i.data.areaList[1] = a, i.setData({
                        areaList: i.data.areaList
                    });
                }
            }).catch(function(t) {
                console.log(t);
            });
        }
    },
    bindMultiPickerChange: function(t) {
        var a = t.detail.value;
        console.log("picker发送选择改变，携带tempIndex为", a);
        var e = a[1];
        console.log("temp_index:", e), console.log("picker发送选择改变，携带id为", this.data.areaList[1][e]);
        var i = "";
        i = void 0 == this.data.areaList[1][e] ? "" : this.data.areaList[1][e].id, this.setData({
            areaIndex: t.detail.value,
            areaId: i
        }), this.getactivityList();
    },
    bindinput: function(t) {
        var a = t.detail.value, e = this.data.goodThing;
        e.content = a.replace(/[^\u4E00-\u9FA5A-Za-z0-9_，,.。？?!！<>《》【】""'']+$/g, ""), this.setData({
            goodThing: e
        });
    },
    onLoad: function(t) {
        console.log("options---", t);
        var a = this;
        t.isNoType && (wx.setNavigationBarTitle({
            title: "随手拍"
        }), a.setData({
            isNoType: !0,
            snapTypeId: t.snapTypeId
        })), t.id && a.setData({
            typeId: t.id,
            typeIndex: parseInt(t.index) < 4 ? parseInt(t.index) + 1 : parseInt(t.index)
        }), this.watch();
    },
    onReady: function() {},
    onShow: function() {},
    watch: function() {
        var a = this, e = "";
        setTimeout(function() {
            (e = t.getMember()) && "" != e ? (a.data.isDefault = !1, a.setData({
                isDefault: !1,
                member: e
            }), a.getTypeList(), a.getActTypeList(), a.getFirstArea(), a.getLocation(), a.getactivityList()) : (a.data.isDefault = !0, 
            a.setData({
                isDefault: !0
            }));
        }, 500);
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {
        var t = this, a = t.data.page;
        a.size * a.current > a.total ? wx.showToast({
            title: "没有更多了",
            icon: "none"
        }) : t.getactivityList(a.current + 1);
    },
    onShareAppMessage: function() {}
});
function t(t, e, a) {
    return e in t ? Object.defineProperty(t, e, {
        value: a,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[e] = a, t;
}

var e, a = getApp(), n = new (require("../../utils/qqmap-wx-jssdk.js"))({
    key: "P26BZ-IRUK4-ZW5UP-XPMQL-F54SQ-3HBDW"
});

Page({
    data: (e = {
        login: !1,
        isDefault: !0,
        member: {},
        indicatorDots: !0,
        vertical: !1,
        autoplay: !0,
        interval: 3e3,
        duration: 300,
        activeColor: "#C70304",
        personalitySigned: "",
        advList: [],
        staticurl: getApp().globalData.staticurl,
        currentTab: 0,
        activityList: [],
        headlinesList: [],
        isSnapClick: !1,
        scoreInfo: {},
        taskList: [],
        showModal: 1,
        latitude: 34.22259,
        longitude: 108.94878,
        greetings: "",
        goodthings: [],
        isGoodThingsShow: !1,
        typeList: [],
        goodsList: [],
        scrollLeft: 0,
        showTodayScoreTips: !1,
        currentTabTask: "1",
        taskTypeList: [],
        isShare: !1
    }, t(e, "greetings", "上午好"), t(e, "modalTabList", [ {
        name: "领任务",
        icon: "indexIcon1@3x.png",
        type: "navigate",
        url: "/pages/zhuanfen/zhuanfentask/zhuanfentask?currentTabTask=1"
    }, {
        name: "做好事",
        icon: "indexIcon2@3x.png",
        type: "navigate",
        url: "/pages/index/indexsnap/indexsnap?type=1"
    }, {
        name: "随手拍",
        icon: "indexIcon3@3x.png",
        type: "navigate",
        url: "/pages/index/indexsnap/indexsnap"
    }, {
        name: "兑好物",
        icon: "indexIcon4@3x.png",
        type: "switchTab",
        url: "/pages/quanyi/quanyi"
    } ]), t(e, "modalBotTabList", [ {
        name: "要闻",
        icon: "indexSecondIcon11.png",
        type: "switchTab",
        url: "/pages/news/news"
    }, {
        name: "视听",
        icon: "indexSecondIcon2.png",
        type: "switchTab",
        key: "newCurrentTab",
        value: "c8b0a4d82fa34b55b7790cdcaa5b5016",
        url: "/pages/news/news"
    }, {
        name: "志愿者",
        icon: "indexSecondIcon3.png",
        type: "switchTab",
        key: "newCurrentTab",
        value: "e8213bfd0a8a475bb76a867a4c2a77d5",
        url: "/pages/news/news"
    }, {
        name: "问计",
        icon: "indexSecondIcon4.png",
        type: "navigate",
        url: "/pages/index/questionnaireList/questionnaireList"
    }, {
        name: "捐分",
        icon: "indexSecondIcon5.png",
        type: "navigate",
        url: "/pages/index/indexdonate/indexdonate"
    } ]), e),
    toQuestionDetail: function(t) {
        wx.navigateTo({
            url: "/pages/index/questionnaireList/questionnaireList"
        });
    },
    confirm: function() {
        wx.navigateTo({
            url: "/pages/mine/woderealname/woderealname"
        });
    },
    onPullDownRefresh: function() {
        this.showData();
    },
    showData: function() {
        var t = this;
        t.setGreetings(), t.getWheelPlantingList(), t.getheadlinesList(), t.getLocation(), 
        t.getTypeList(), t.getTaskType(), wx.stopPullDownRefresh();
    },
    openMap: function(t) {
        var e = this, a = t.currentTarget.dataset.item.address;
        n.geocoder({
            address: a,
            success: function(t) {
                console.log(t), e.setData({
                    latitude: t.result.location.lat,
                    longitude: t.result.location.lng
                }), wx.openLocation({
                    latitude: e.data.latitude,
                    longitude: e.data.longitude,
                    name: a
                });
            },
            fail: function(t) {
                console.log(t);
            }
        });
    },
    toLook: function(t) {
        var e = this;
        if (e.data.isDefault) e.setData({
            login: !0
        }); else {
            var a = t.currentTarget.dataset.item;
            if (a.link) {
                var n = "/" + a.link;
                console.log(a), "4" == a.taskType && "1" == a.isAnswer && (n += "?id=" + a.itemTestId + "&taskId=" + a.id), 
                console.log(n), wx.reLaunch({
                    url: n
                });
            } else "1" == a.platformTaskType && e.setData({
                login: !0
            });
        }
    },
    onLoad: function(t) {
        this.getPersonalitySigned(), t.scrollTop && wx.pageScrollTo({
            scrollTop: parseInt(t.scrollTop)
        });
    },
    onShow: function() {
        var t = this;
        a.login().then(function(e) {
            t.getTaskList(t.data.currentTabTask), t.watchBack();
        }).catch(function(t) {}), t.showData();
    },
    getTaskType: function() {
        var t = this;
        a.post("/dict/sys-dict/list", {
            type: "task_type"
        }, "加载中...").then(function(e) {
            if (e) {
                var a = e.body.data;
                console.log("任务类型", a), t.data.taskTypeList = a, t.setData({
                    taskTypeList: t.data.taskTypeList
                });
            }
        }).catch(function(t) {
            console.log(t);
        });
    },
    clickTab: function(t) {
        var e = this;
        if (this.data.currentTab === t.target.dataset.current) return !1;
        e.setData({
            currentTab: t.target.dataset.current
        });
        var a = "";
        a = t.currentTarget.dataset ? t.currentTarget.dataset.id : e.data.typeList[0].id, 
        e.getGoodsDetails(a), e.data.scrollLeft > 0 && e.setData({
            scrollLeft: 0
        });
    },
    bindscroll: function(t) {
        this.setData({
            scrollLeft: t.detail.scrollLeft
        });
    },
    getTypeList: function() {
        var t = this;
        a.post("/goodsType/list", {}, "加载中...").then(function(e) {
            if (e && e.success) {
                var a = e.body.page.records;
                t.setData({
                    typeList: a
                }), t.getGoodsDetails(a[parseInt(t.data.currentTab)].id);
            }
        }).catch(function(t) {
            console.log(t);
        });
    },
    getGoodsDetails: function(t) {
        var e = this, n = {
            goodsTypeId: t,
            ifHome: "1"
        };
        a.post("/goods_management/list", n, "加载中...").then(function(t) {
            t.success && (console.log(t.body.page.records), e.setData({
                goodsList: t.body.page.records
            }));
        }).catch(function(t) {
            console.log(t);
        });
    },
    getPersonalitySigned: function() {
        var t = this;
        a.post("/JnHomePageTitle/listAll", {}).then(function(e) {
            e && t.setData({
                ana: e.body.data.title
            });
        }).catch(function(t) {
            console.log(t);
        });
    },
    clickTabTask: function(t) {
        var e = this;
        if (this.data.currentTabTask === t.target.dataset.current) return !1;
        e.setData({
            currentTabTask: t.target.dataset.current
        }), e.getTaskList(e.data.currentTabTask);
    },
    getTaskList: function(t) {
        var e = this, n = {
            taskType: t,
            pageNo: 1,
            pageSize: 5,
            memberId: wx.getStorageSync("member").id
        };
        a.post("/JnTask/list", n, "加载中...").then(function(t) {
            if (t.success) {
                var a = t.body.page.records;
                a.length > 3 && (a = a.slice(0, 3)), e.setData({
                    taskList: a
                });
            }
        }).catch(function(t) {
            console.log(t);
        });
    },
    finishTask: function(t, e) {
        var n = this, o = n.data.taskList;
        o[e].isSubmit = !0, n.setData({
            taskList: o
        });
        var i = wx.getStorageSync("member").id, s = {
            id: t.id,
            memberId: i
        };
        a.post("/JnTask/finishTask", s, "加载中...").then(function(e) {
            e.success && (n.setData({
                showModal: 0,
                item: t
            }), a.getScoreInfo(function() {
                n.getScoreInfo();
            }));
        }).catch(function(t) {
            console.log(t);
        });
    },
    toDetail: function(t) {
        var e = this;
        if (e.data.isDefault) e.setData({
            login: !0
        }); else {
            var a = t.currentTarget.dataset.type, n = t.currentTarget.dataset.url;
            void 0 != a && "navigate" != a || wx.navigateTo({
                url: n
            }), "switchTab" == a && (console.log(t.currentTarget.dataset.value, t.currentTarget.dataset.key), 
            t.currentTarget.dataset.value && t.currentTarget.dataset.key && wx.setStorageSync(t.currentTarget.dataset.key, t.currentTarget.dataset.value), 
            wx.switchTab({
                url: n
            }));
        }
    },
    showModal1: function(t) {
        console.log(t);
        var e = this;
        if (e.data.isDefault) e.setData({
            login: !0
        }); else {
            var a = t.target.dataset.item, n = t.target.dataset.index;
            e.finishTask(a, n);
        }
    },
    clickCancel: function() {
        var t = this;
        t.setData({
            showModal: 1
        }), t.getTaskList(t.data.currentTabTask);
    },
    setGreetings: function() {
        var t = new Date(), e = t.getHours(), a = t.getMinutes(), n = "";
        e < 4 && a < 60 && (n = "凌晨"), e > 4 && e < 8 && a < 60 && (n = "清晨"), e > 7 && e < 11 && a < 60 && (n = "上午"), 
        11 == e && a < 30 && (n = "上午"), 11 == e && a >= 30 && (n = "中午"), e > 11 && e < 13 && a < 60 && (n = "中午"), 
        e > 12 && e < 17 && a < 60 && (n = "下午"), 17 == e && a < 30 && (n = "下午"), 17 == e && a >= 30 && (n = "傍晚"), 
        e > 17 && e < 19 && a < 60 && (n = "傍晚"), 19 == e && a < 30 && (n = "傍晚"), 19 == e && a >= 30 && (n = "夜晚"), 
        e > 19 && e < 23 && a < 60 && (n = "夜晚"), e > 22 && e < 24 && a < 60 && (n = "深夜"), 
        this.setData({
            greetings: n + "好"
        });
    },
    watchBack: function() {
        var t = this, e = a.getMember();
        e && "" != e ? (t.setData({
            login: !1,
            isDefault: !1,
            member: e
        }), t.getScoreInfo(), t.getWheelPlantingList(), t.getheadlinesList(), t.getLocation(), 
        t.getGoodThings(), t.getTypeList(), t.getTaskType()) : (t.data.isDefault = !0, t.setData({
            isDefault: !0
        }));
    },
    showModal: function() {
        var t = this;
        t.data.showModal = 0, t.setData({
            showModal: t.data.showModal
        });
    },
    clickCancle: function() {
        var t = this;
        t.data.showModal = 1, t.setData({
            showModal: t.data.showModal
        });
    },
    getMylocation: function() {
        var t = this;
        n.reverseGeocoder({
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
    getactivityList: function() {
        var t = this, e = {
            pageNo: 1,
            pageSize: 10,
            latitude: t.data.latitude,
            longitude: t.data.longitude
        };
        a.post("/floor/why-floor-content/findListByActivity", e, "加载中...").then(function(e) {
            console.log("res", e), e && (e.body.listActivity.forEach(function(t, e) {
                var a = t.juli;
                t.juli = 1e3 < a ? parseFloat((parseInt(a) / 1e3).toFixed(2)) + "KM" : t.juli + "M";
                var n = t.startDate.split("-");
                n.splice(0, 1), t.startDate = n.join("-");
                var o = t.endDate.split("-");
                o.splice(0, 1), t.endDate = o.join("-");
            }), console.log("res2", e.body.listActivity), t.setData({
                activityList: e.body.listActivity
            }));
        }).catch(function(t) {
            console.log(t);
        });
    },
    getWheelPlantingList: function() {
        var t = this, e = this, n = {
            acid: "65854bbf5d17442cb0c0065844faa149"
        };
        a.post("/adv/why-cms-adv/list", n, "加载中...").then(function(a) {
            a && (e.setData({
                advList: a.body.page.records
            }), 1 == t.data.advList.length && t.setData({
                indicatorDots: !1
            }));
        }).catch(function(t) {
            console.log(t);
        });
    },
    getheadlinesList: function() {
        var t = this, e = this, n = {
            acid: "cf7ade72de92413c9413b233036a727c"
        };
        a.post("adv/why-cms-adv/indexDataList", n, "加载中...").then(function(a) {
            if (a.success) {
                console.log("res---", a);
                var n = [ [], [], [] ];
                a.body.page.forEach(function(t, e) {
                    switch (t.type) {
                      case "1":
                        t.title = "要闻", t.color = "#fd7275", t.detail = t.properties1, n[0].push(t);
                        break;

                      case "2":
                        t.title = "赚分", t.color = "#72b3fd", t.detail = t.properties1 + " " + t.properties2 + "通过" + t.properties3 + "赚得" + t.properties4 + "个积分", 
                        n[1].push(t);
                        break;

                      case "3":
                        t.title = "兑换", t.color = "#fdba72", t.detail = t.properties1 + " " + (t.properties2 ? t.properties2 : "匿名") + "兑换了" + t.properties3, 
                        n[2].push(t);
                    }
                }), console.log("newArr---", n), e.setData({
                    headlinesList: n
                }), 1 == t.data.advList.length && t.setData({
                    indicatorDots: !1
                });
            }
        }).catch(function(t) {
            console.log(t);
        });
    },
    clickMessage: function() {
        wx.navigateTo({
            url: "/pages/index/indexmessage/indexmessage"
        });
    },
    clickSearch: function() {
        wx.navigateTo({
            url: "/pages/index/indexsearch/indexsearch"
        });
    },
    onConfirm: function(t) {
        var e = this;
        console.log(t), console.log("onConfirm:" + JSON.stringify(t)), a.onGotUserInfo(t.detail.detail, function() {
            var t = wx.getStorageSync("member");
            console.log("callback:" + JSON.stringify(t)), a.setUseTime(), e.setData({
                member: t,
                login: !1,
                isDefault: !1
            });
        });
    },
    onCancel: function() {
        wx.switchTab({
            url: "/pages/index/index"
        }), this.setData({
            login: !1
        });
    },
    handleLogin: function() {
        this.setData({
            login: !0
        });
    },
    getScoreInfo: function() {
        var t = this, e = {};
        a.post("/JnInventoryQuery/get", e, "加载中...").then(function(e) {
            e && (console.log("分", e), e.body.data.yue = parseInt(e.body.data.allScore) - parseInt(e.body.data.allUse), 
            t.data.scoreInfo = e.body.data, t.setData({
                scoreInfo: t.data.scoreInfo
            }));
        }).catch(function(t) {
            console.log(t);
        });
    },
    clickMoreAct: function() {
        wx.switchTab({
            url: "/pages/zhuanfen/zhuanfen"
        });
    },
    clickMoreThing: function() {
        wx.navigateTo({
            url: "/pages/index/indexsnap/indexsnap"
        });
    },
    clickMoreQy: function() {
        wx.switchTab({
            url: "/pages/quanyi/quanyi"
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
    linkExternal: function(t) {
        var e = t.currentTarget.dataset.url;
        console.log("url---", e), -1 != e.indexOf("http") || -1 != e.indexOf("https") ? wx.navigateTo({
            url: "/pages/index/jumpExternalLinks?url=" + encodeURIComponent(e),
            success: function(t) {},
            fail: function(t) {},
            complete: function(t) {}
        }) : wx.navigateTo({
            url: e,
            success: function(t) {},
            fail: function(t) {},
            complete: function(t) {}
        });
    },
    getGoodThings: function() {
        var t = this;
        a.post("/JnHandyManagement/list", {
            isRecommend: "1"
        }, "加载中...").then(function(e) {
            if (e) {
                var a = e.body.page.records, n = a.length;
                console.log("身边好事列表", a), console.log("身边好事列表长度", n), 0 == n ? (console.log("00000"), 
                t.data.isGoodThingsShow = !1, t.setData({
                    isGoodThingsShow: t.data.isGoodThingsShow
                })) : (a.forEach(function(t, e, a) {
                    t.member && (t.name = t.member.nickname);
                    var n = t.pictures.split(",");
                    t.pictures = n, t.createDate = t.createDate.substring(5, t.createDate.length);
                }), n > 0 && n < 5 && (t.data.isGoodThingsShow = !0, t.data.goodthings = a), (n > 3 || 3 == n) && (t.data.isGoodThingsShow = !0, 
                t.data.goodthings = a.slice(0, 3)), t.setData({
                    isGoodThingsShow: t.data.isGoodThingsShow,
                    goodthings: t.data.goodthings,
                    isSnapClick: !1
                }));
            }
        }).catch(function(t) {
            console.log(t);
        });
    },
    imgPreview: function(t) {
        console.log(t);
        var e = t.target.dataset.index, a = t.target.dataset.item.pictures;
        wx.previewImage({
            current: a[e],
            urls: a
        });
    },
    goodMysSnap: function(t) {
        var e = this, a = t.currentTarget.dataset.id, n = t.currentTarget.dataset.type;
        if ("2" == n) {
            var o = t.currentTarget.dataset.index;
            if (e.data.isSnapClick) return void wx.showToast({
                title: "哎呀！点的太快了",
                icon: "none"
            });
            var i = e.data.goodthings;
            i[o].number = i[o].number > 0 ? 0 : 1, i[o].dianZanNum = i[o].number > 0 ? i[o].dianZanNum + 1 : i[o].dianZanNum - 1, 
            e.setData({
                goodthings: i,
                isSnapClick: !0
            });
        }
        e.data.member.id;
        e.goodShare(n, a);
    },
    goodShare: function(t, e) {
        var n = this, o = {
            memberId: n.data.member.id,
            goodId: e,
            type: t
        };
        a.post("JnShareLog/save", o).then(function(t) {
            t.success && n.getGoodThings();
        }).catch(function(t) {
            console.log(t);
        });
    },
    onPageScroll: function(t) {
        this.setData({
            scrollTop: t.scrollTop
        });
    },
    onShareAppMessage: function(t) {
        console.log(t);
        var e = this, a = t.target.dataset.item;
        t.target.dataset.type;
        return t.currentTarget = t.target, e.goodMysSnap(t), {
            title: a.content,
            path: "/pages/index/indexsnap/indexsnapDetail/indexsnapDetail?item=" + JSON.stringify(a),
            imageUrl: a.pictures[0],
            desc: a.name
        };
    },
    toNews: function(t) {
        var e = t.currentTarget.dataset.id;
        console.log("id---", e), wx.navigateTo({
            url: "/pages/news/detail/detail?id=" + e
        });
    }
});
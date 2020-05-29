var t = getApp(), e = new (require("../../../utils/qqmap-wx-jssdk.js"))({
    key: "P26BZ-IRUK4-ZW5UP-XPMQL-F54SQ-3HBDW"
});

Page({
    data: {
        areaList: [],
        areaIndex: [ 0, 0 ],
        typeIndex: 0,
        typeListOld: [],
        index: 0,
        scoreList: [ "积分", "0-9", "10-19", "20-29", "30-39", "40-49", "50-59", "60-69", "70-79", "80-89", "90-100" ],
        itemList: [],
        activityList: [],
        typeList: [],
        currentTab: 0,
        memberId: "",
        isGood: !1,
        isScrollTop: !1,
        staticurl: getApp().globalData.staticurl,
        isShowImg: !1,
        isSnapClick: !1,
        hotList: [],
        isShowMore: !1,
        myGoodthingIconList: [ {
            type: "做好事件数",
            count: ""
        }, {
            type: "做好事赚分",
            count: ""
        }, {
            type: "排名",
            count: ""
        } ],
        isFirst: !1
    },
    getProjectList: function() {
        var e = this, a = {
            parentId: ""
        };
        t.post("/JnProjectTypeManagement/listByType", a, "加载中...").then(function(a) {
            if (a) {
                var i = [];
                i[0] = a.body.page.records, i[0].splice(0, 0, {
                    name: "请选择"
                }), console.log("res--projectList", i), e.setData({
                    projectList: i
                });
                var o = {
                    parentId: e.data.chooseId
                };
                console.log("二级参数", o), t.post("/JnProjectTypeManagement/listByType", o, "加载中...").then(function(t) {
                    if (console.log("二级列表", t), t) {
                        var a = e.data.projectList;
                        a[1] = t.body.page.records, e.setData({
                            projectList: a
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
    getOldTypeList: function() {
        var e = this;
        t.post("/JnActivityTypeManagement/list", {}, "加载中...").then(function(t) {
            if (t) {
                var a = e, i = t.body.page;
                i.splice(0, 0, {
                    id: "",
                    name: "类型"
                }), a.setData({
                    typeListOld: i
                });
            }
        }).catch(function(t) {
            console.log(t);
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
    getactivityList: function(e) {
        var a = this, i = "?1=1", o = {
            pageNo: 1,
            pageSize: 10,
            latitude: a.data.latitude,
            longitude: a.data.longitude
        };
        e && (o.pageNo = e), a.data.typeid && (i += "&actTypeId=" + a.data.typeid), a.data.tempActIntegral && (i += "&tempActIntegral=" + a.data.tempActIntegral), 
        a.data.areaId && (i += "&areaId=" + a.data.areaId), t.post("/JnActivityManagement/list" + i, o, "加载中...").then(function(t) {
            if (t) {
                var i = t.body.page.records, o = a.data.activityList;
                i.forEach(function(t, a) {
                    var i = t.juli;
                    t.juli = 1e3 < i ? parseFloat((parseInt(i) / 1e3).toFixed(2)) + "KM" : t.juli + "M";
                    var n = t.starDate.split("-");
                    n.splice(0, 1), t.starDate = n.join("-");
                    var s = t.endDate.split("-");
                    s.splice(0, 1), t.endDate = s.join("-"), t.startDate = t.starDate, t.startTime = t.starTime, 
                    t.detailImg = t.activityCover ? t.activityCover.indexOf(",") > 0 ? t.activityCover.split(",")[0] : t.activityCover : t.actDetailImg.indexOf(",") > 0 ? t.actDetailImg.split(",")[0] : t.actDetailImg, 
                    t.activityName = t.actName, t.integral = t.actIntegral, t.activityTypeName = t.actType ? t.actType.name : "", 
                    e > 1 && o.push(t);
                }), e > 1 && (i = o), a.setData({
                    activityList: i,
                    pages: t.body.page.pages,
                    pageCurrent: t.body.page.current
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
            typeid: e.data.typeListOld[t.detail.value].id
        }), console.log(" that.data.typeListOld", e.data.typeListOld), console.log("picker发送选择改变，携带id为", e.data.typeListOld[t.detail.value].id), 
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
        var e = this;
        t.post("/area/sys-area/listCityData", {
            pId: 1
        }, "加载中...").then(function(a) {
            if (a) {
                var i = e;
                console.log("一级地区", a);
                var o = a.body.data;
                o.splice(0, 0, {
                    title: "地区"
                }), console.log(o), i.data.areaList[0] = o, i.setData({
                    areaList: i.data.areaList
                });
                var n;
                n = i.data.areaId && "" != i.data.areaId ? i.data.areaId : {
                    pId: o[0].id
                }, t.post("/area/sys-area/listAreaData", n, "加载中...").then(function(t) {
                    if (t) {
                        var a = e, i = t.body.sList;
                        a.data.areaList[1] = i, a.setData({
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
    bindMultiPickerColumnChange: function(e) {
        var a = this, i = this;
        if (0 == e.detail.column) {
            var o = {
                pId: i.data.areaList[0][e.detail.value].id
            };
            t.post("/area/sys-area/listAreaData", o, "加载中...").then(function(t) {
                if (t) {
                    var e = t.body.sList, i = a, e = t.body.sList;
                    i.data.areaList[1] = e, i.setData({
                        areaList: i.data.areaList
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
        var i = "";
        i = void 0 == this.data.areaList[1][a] ? "" : this.data.areaList[1][a].id, this.setData({
            areaIndex: t.detail.value,
            areaId: i
        }), this.getactivityList();
    },
    showMore: function() {
        var t = this;
        console.log("显示更多"), t.setData({
            isShowMore: !t.data.isShowMore
        });
    },
    getGoodthingNumber: function() {
        var e = this;
        t.post("JnGoodManagement/getGoodThingCount", {
            memberId: e.data.memberId
        }).then(function(t) {
            if (t.success) {
                var a = e.data.myGoodthingIconList, i = t.body.data;
                a[0].count = i.goodThingNum + "件", a[1].count = i.scoreCount + "分", a[2].count = i.rank + "名", 
                e.setData({
                    myGoodthingIconList: a
                });
            }
        }).catch(function(t) {});
    },
    openMap: function(t) {
        var a = this, i = t.currentTarget.dataset.item.address;
        e.geocoder({
            address: i,
            success: function(t) {
                console.log(t), a.setData({
                    latitude: t.result.location.lat,
                    longitude: t.result.location.lng
                }), wx.openLocation({
                    latitude: a.data.latitude,
                    longitude: a.data.longitude,
                    name: i
                });
            },
            fail: function(t) {
                console.log(t);
            }
        });
    },
    toActDetail: function(t) {
        var e = t.currentTarget.dataset.item;
        wx.navigateTo({
            url: "/pages/zhuanfen/zhuanfenorder/zhuanfenorder?id=" + e.activityId + "&type=2" + ("-1" != e.typeName.indexOf("投稿") ? "&contribute=1" : "")
        });
    },
    toMore: function(t) {
        var e = this;
        t.currentTarget.dataset.id, wx.navigateTo({
            url: "/pages/index/indexsnap/hotActList/hotActList?" + (t.currentTarget.dataset.id ? "id=" + t.currentTarget.dataset.id : "") + (t.currentTarget.dataset.index || 0 == t.currentTarget.dataset.index ? "&index=" + t.currentTarget.dataset.index : "") + (e.data.isAddGoodthings ? "" : "isNoType=1&snapTypeId=" + e.data.snapTypeId)
        });
    },
    lookImg: function(t) {
        var e = t.currentTarget.dataset.img, a = t.currentTarget.dataset.list;
        this.setData({
            isShowImg: !0
        }), wx.previewImage({
            current: e,
            urls: a
        });
    },
    setScroll: function() {
        var t = this;
        t.data.isFirst ? (t.setData({
            isFirst: !1
        }), t.setScroll()) : wx.pageScrollTo({
            scrollTop: t.data.scrollTop,
            success: function(t) {
                console.log("成功----", t);
            },
            complete: function(t) {
                console.log("触发了----", t);
            }
        });
    },
    onLoad: function(t) {
        var e = this;
        console.log("options--", t), t.scrollTop && (this.setData({
            scrollTop: parseInt(t.scrollTop),
            isFirst: !0
        }), e.setScroll()), t.type && wx.setNavigationBarTitle({
            title: "做好事"
        });
        var a = wx.getSystemInfoSync().windowHeight, i = wx.getSystemInfoSync().windowWidth;
        this.setData({
            windowHeight: a,
            windowWidth: i,
            currentTab: t.tab ? t.tab : t.currentTab ? t.currentTab : 0,
            isAddGoodthings: !!t.type,
            isOldGoodthing: !!t.isOld
        }), console.log("currentTab---", e.data.currentTab), t.isOld && e.getLocation();
    },
    onShow: function() {
        var e = this;
        if (e.getSnapType(), e.data.isShowImg) e.setData({
            isShowImg: !1
        }); else {
            var a = t.globalData.mineToSnapTab;
            a && (e.data.currentTab = a, e.setData({
                currentTab: e.data.currentTab
            }));
            var i = "";
            setTimeout(function() {
                (i = t.getMember()) && "" != i && (e.setData({
                    member: i,
                    memberId: t.globalData.member.id
                }), e.setFuc(), e.getGoodthingNumber(), e.data.isOldGoodthing ? (e.getProjectList(), 
                e.getOldTypeList(), e.getFirstArea()) : e.getHotList());
            }, 500);
        }
    },
    onReachBottom: function() {
        this.setPageNo(!0), this.setData({
            isScrollTop: !0
        });
    },
    onPullDownRefresh: function() {
        this.setPageNo(!1);
    },
    setPageNo: function(t) {
        var e = this, a = e.data.pages, i = e.data.pageCurrent;
        t ? a > i ? (wx.showToast({
            title: "加载中",
            icon: "loading",
            duration: 2e3
        }), e.data.isOldGoodthing ? e.getactivityList(i + 1) : e.setFuc(i + 1)) : wx.showToast({
            title: "没有更多了",
            icon: "none",
            duration: 2e3
        }) : (e.data.isOldGoodthing ? e.getactivityList() : e.setFuc(1), wx.stopPullDownRefresh());
    },
    clickTab: function(t) {
        var e = this, a = parseInt(t.target.dataset.current);
        e.setData({
            currentTab: a,
            itemList: [],
            isScrollTop: !1
        }), e.data.isOldGoodthing && 0 == a ? e.getactivityList() : e.setFuc(1);
    },
    setFuc: function(e) {
        var a = this, i = {};
        2 != a.data.currentTab || (i.memberId = t.getMember().id), e ? i.pageNo = e : a.data.pageCurrent && (i.pageNo = a.data.pageCurrent), 
        a.getList(i);
    },
    getList: function(e) {
        var a = this, i = "", o = a.data.currentTab;
        console.log("currentTab---", o), a.data.isAddGoodthings ? (i = "/JnGoodManagement/list", 
        a.data.isOldGoodthing || 0 != o || (e.memberId = "")) : i = "JnHandyManagement/list", 
        t.post(i, e, "加载中...").then(function(t) {
            if (t.success) {
                var i = a.data.itemList, n = t.body.page.records;
                n.forEach(function(t) {
                    t.pictures && (t.picturesList = [], t.picturesList = t.pictures.split(",")), e.pageNo > 1 && i.push(t), 
                    t.createDate = t.createDate.substring(5, t.createDate.length);
                }), e.pageNo > 1 && (n = i), a.data.isScrollTop, console.log("itemList-----", n), 
                a.getTypeList(), a.setData({
                    itemList: n,
                    currentTab: o,
                    pages: t.body.page.pages,
                    pageCurrent: t.body.page.current,
                    isSnapClick: !1,
                    isScrollTop: !1
                });
            }
        }).catch(function(t) {});
    },
    getSnapType: function() {
        var e = this, a = {
            type: "5"
        };
        t.post("JnOnlineActivityType/get", a, "加载中...").then(function(t) {
            if (t.success) {
                console.log(t);
                var a = t.body.data;
                e.setData({
                    snapTypeId: a.id
                });
            }
        }).catch(function(t) {
            console.log(t);
        });
    },
    getTypeList: function() {
        var e = this;
        t.post("JnProjectTypeManagement/list", {
            pageSize: 50
        }, "加载中...").then(function(t) {
            if (t.success) {
                console.log(t);
                var a = t.body.page.records, i = e.data.itemList;
                i.forEach(function(t) {
                    a.find(function(e) {
                        return t.typeId == e.id;
                    }) && (t.typeName = a.find(function(e) {
                        return t.typeId == e.id;
                    }).name);
                });
                var o = {
                    name: "更多",
                    icon: e.data.staticurl + "goodActMoreNew@3x.png"
                };
                a.splice(4, 0, o), e.setData({
                    typeList: a,
                    itemList: i
                });
            }
        }).catch(function(t) {
            console.log(t);
        });
    },
    getHotList: function() {
        var e = this, a = {
            memberId: e.data.memberId
        }, i = "";
        e.data.isAddGoodthings ? i = "jnGoodsThing/findHotGoodThingList" : (a.activityType = e.data.snapTypeId, 
        i = "JnOnlineActivity/findHotActivityList"), t.post(i, a, "加载中...").then(function(t) {
            if (console.log("热门列表--", t), t.success) {
                var a = t.body.list;
                e.setData({
                    hotList: a
                });
            }
        }).catch(function(t) {
            console.log(t);
        });
    },
    delType: function(e) {
        var a = this, i = e.currentTarget.dataset.id;
        console.log("delete:" + i);
        var o = "";
        o = a.data.isAddGoodthings ? "/JnGoodManagement/delete" : "/JnHandyManagement/delete", 
        wx.showModal({
            title: "提示",
            content: "确认要删除吗?",
            success: function(e) {
                e.confirm ? t.post(o, {
                    id: i
                }, "加载中...").then(function(t) {
                    t.success && (a.setFuc(), a.data.isAddGoodthings && a.getGoodthingNumber());
                }).catch(function(t) {
                    console.log(t);
                }) : e.cancel && console.log("用户点击取消");
            }
        });
    },
    goodMysSnap: function(t) {
        var e = this, a = t.currentTarget.dataset.id, i = t.currentTarget.dataset.type;
        if ("2" == i) {
            var o = t.currentTarget.dataset.index;
            if (e.data.isSnapClick) return void wx.showToast({
                title: "哎呀！点的太快了",
                icon: "none"
            });
            var n = e.data.itemList;
            n[o].number = n[o].number > 0 ? 0 : 1, n[o].dianZanNum = n[o].number > 0 ? n[o].dianZanNum + 1 : n[o].dianZanNum - 1, 
            e.setData({
                itemList: n,
                isScrollTop: !0,
                isSnapClick: !0
            });
        }
        e.goodShare(i, a);
    },
    goodShare: function(e, a) {
        var i = this, o = {
            memberId: i.data.memberId,
            goodId: a,
            type: e
        };
        t.post("JnShareLog/save", o).then(function(t) {
            t.success && i.setFuc();
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
        var e = this, a = t.target.dataset.item;
        t.target.dataset.type;
        return t.currentTarget = t.target, e.goodMysSnap(t), {
            title: a.content,
            path: "/pages/index/indexsnap/indexsnapDetail/indexsnapDetail?item=" + JSON.stringify(a),
            imageUrl: a.picturesList ? a.picturesList[0] : "",
            desc: a.name
        };
    }
});
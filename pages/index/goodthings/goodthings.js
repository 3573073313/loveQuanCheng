function t(t, a, e) {
    return a in t ? Object.defineProperty(t, a, {
        value: e,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[a] = e, t;
}

var a, e = getApp(), o = new (require("../../../utils/qqmap-wx-jssdk.js"))({
    key: "P26BZ-IRUK4-ZW5UP-XPMQL-F54SQ-3HBDW"
});

Page({
    data: (a = {
        areaList: [],
        areaIndex: [ 0, 0 ],
        typeIndex: 0,
        typeList: [],
        index: 0,
        scoreList: [ "积分", "0-9", "10-19", "20-29", "30-39", "40-49", "50-59", "60-69", "70-79", "80-89", "90-100" ],
        isDefault: !1,
        member: {},
        currentTab: 0,
        staticurl: getApp().globalData.staticurl,
        nocultures: [],
        selectArray: [],
        showModal: 1,
        goodType: [ "图片", "视频" ],
        projectList: [],
        projectListIndex: [ 0, 0 ],
        goodThing: {},
        pictures: [],
        videoUrl: "",
        total: 0,
        isAdd: !0
    }, t(a, "nocultures", []), t(a, "activesLen", !1), t(a, "hasMore", !0), t(a, "loadMore", !0), 
    t(a, "isUnloading", !1), t(a, "params", {
        pageNo: 1,
        pageSize: 6
    }), a),
    openMap: function(t) {
        var a = this, e = t.currentTarget.dataset.item.address;
        o.geocoder({
            address: e,
            success: function(t) {
                console.log(t), a.setData({
                    latitude: t.result.location.lat,
                    longitude: t.result.location.lng
                }), wx.openLocation({
                    latitude: a.data.latitude,
                    longitude: a.data.longitude,
                    name: e
                });
            },
            fail: function(t) {
                console.log(t);
            }
        });
    },
    getLocation: function() {
        var t = this;
        wx.getLocation({
            type: "wgs84",
            success: function(a) {
                console.log("location", a), t.setData({
                    latitude: a.latitude,
                    longitude: a.longitude
                }), t.getactivityList();
            }
        });
    },
    getactivityList: function() {
        var t = this, a = "?1=1", o = {
            pageNo: 1,
            pageSize: 10,
            latitude: t.data.latitude,
            longitude: t.data.longitude
        };
        t.data.typeid && (a += "&actTypeId=" + t.data.typeid), t.data.tempActIntegral && (a += "&tempActIntegral=" + t.data.tempActIntegral), 
        t.data.areaId && (a += "&areaId=" + t.data.areaId), e.post("/JnActivityManagement/list" + a, o, "加载中...").then(function(a) {
            a && (a.body.page.records.forEach(function(t, a) {
                var e = t.juli;
                t.juli = 1e3 < e ? parseFloat((parseInt(e) / 1e3).toFixed(2)) + "KM" : t.juli + "M";
                var o = t.starDate.split("-");
                o.splice(0, 1), t.starDate = o.join("-");
                var i = t.endDate.split("-");
                i.splice(0, 1), t.endDate = i.join("-");
            }), t.setData({
                activityList: a.body.page.records
            }));
        }).catch(function(t) {
            console.log(t);
        });
    },
    bindTypePickerChange: function(t) {
        var a = this;
        console.log(t), console.log("picker发送选择改变，携带值为", t.detail.value), a.data.typeIndex = t.detail.value, 
        a.setData({
            typeIndex: a.data.typeIndex,
            typeid: a.data.typeList[t.detail.value].id
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
        var t = this;
        e.post("/area/sys-area/listCityData", {
            pId: 1
        }, "加载中...").then(function(a) {
            if (a) {
                var o = t;
                console.log("一级地区", a);
                var i = a.body.data;
                i.splice(0, 0, {
                    title: "地区"
                }), console.log(i), o.data.areaList[0] = i, o.setData({
                    areaList: o.data.areaList
                });
                var n;
                n = o.data.areaId && "" != o.data.areaId ? o.data.areaId : {
                    pId: i[0].id
                }, e.post("/area/sys-area/listAreaData", n, "加载中...").then(function(a) {
                    if (a) {
                        var e = t, o = a.body.sList;
                        e.data.areaList[1] = o, e.setData({
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
    bindMultiPickerColumnChange: function(t) {
        var a = this, o = this;
        if (0 == t.detail.column) {
            var i = {
                pId: o.data.areaList[0][t.detail.value].id
            };
            e.post("/area/sys-area/listAreaData", i, "加载中...").then(function(t) {
                if (t) {
                    var e = t.body.sList, o = a, e = t.body.sList;
                    o.data.areaList[1] = e, o.setData({
                        areaList: o.data.areaList
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
        var o = "";
        o = void 0 == this.data.areaList[1][e] ? "" : this.data.areaList[1][e].id, this.setData({
            areaIndex: t.detail.value,
            areaId: o
        }), this.getactivityList();
    },
    bindinput: function(t) {
        var a = t.detail.value, e = this.data.goodThing;
        e.content = a.replace(/[^\u4E00-\u9FA5A-Za-z0-9_，,.。？?!！<>《》【】""'']+$/g, ""), this.setData({
            goodThing: e
        });
    },
    getTypeList: function() {
        var t = this;
        e.post("/JnActivityTypeManagement/list", {}, "加载中...").then(function(a) {
            if (a) {
                var e = t, o = a.body.page.records;
                o.splice(0, 0, {
                    id: "",
                    name: "类型"
                }), e.setData({
                    typeList: o
                });
            }
        }).catch(function(t) {
            console.log(t);
        });
    },
    onShow: function() {
        var t = this, a = "";
        setTimeout(function() {
            (a = e.getMember()) && "" != a ? (t.data.isDefault = !1, t.setData({
                isDefault: !1,
                member: a
            }), t.getGoodThingList()) : (t.data.isDefault = !0, t.setData({
                isDefault: !0
            }));
        }, 500), t.getProjectList(), t.getTypeList(), t.getFirstArea(), t.getLocation();
    },
    onLoad: function(t) {
        var a = this, o = a.data.currentTab;
        console.log("options.currentTab", t), t.currentTab ? (o = t.currentTab, console.log("currentTab", o)) : e.globalData.mineToMygoodthingTab && (o = e.globalData.mineToMygoodthingTab, 
        console.log("currentTabglobalData", o));
        var i = wx.getSystemInfoSync().windowHeight, n = wx.getSystemInfoSync().windowWidth;
        a.setData({
            currentTab: o,
            windowHeight: i,
            windowWidth: n
        });
    },
    onReachBottom: function() {
        var t = this, a = t.data.params;
        t.data.hasMore && !t.data.loadMore ? (t.data.loadMore = !0, a.pageNo = parseInt(a.pageNo) + 1, 
        t.setData({
            params: a
        }), t.getGoodThingList()) : t.data.hasMore || wx.showToast({
            title: "没有更多了",
            icon: "none",
            duration: 2e3
        });
    },
    getGoodThingList: function() {
        var t = this;
        t.data.params.memberId = t.data.member.id, t.setData({
            params: t.data.params
        }), e.post("/JnGoodManagement/list", t.data.params, "加载中...").then(function(a) {
            if (a.success) {
                console.log(a);
                var e = a.body.page.records, o = a.body.page.total;
                t.setData({
                    total: o
                }), e.forEach(function(t, a, o) {
                    var i = t.pictures;
                    t.pictures = i.split(","), e[a] = t;
                }), 0 == e.length && (t.data.activesLen = !0, t.setData({
                    activesLen: t.data.activesLen
                })), t.setData({
                    params: t.data.params,
                    nocultures: e,
                    loadMore: !1
                }), a.body.page.current == a.body.page.pages && t.setData({
                    hasMore: !1
                });
            }
        }).catch(function(t) {
            console.log(t);
        });
    },
    getProjectList: function() {
        var t = this, a = {
            parentId: ""
        };
        e.post("/JnProjectTypeManagement/listByType", a, "加载中...").then(function(a) {
            if (a) {
                var o = [];
                o[0] = a.body.page.records, o[0].splice(0, 0, {
                    name: "请选择"
                }), console.log("res--projectList", o), t.setData({
                    projectList: o
                });
                var i = {
                    parentId: t.data.chooseId
                };
                console.log("二级参数", i), e.post("/JnProjectTypeManagement/listByType", i, "加载中...").then(function(a) {
                    if (console.log("二级列表", a), a) {
                        var e = t.data.projectList;
                        e[1] = a.body.page.records, t.setData({
                            projectList: e
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
    clickTab: function(t) {
        var a = this;
        if (this.data.currentTab === t.target.dataset.current) return !1;
        a.setData({
            currentTab: t.target.dataset.current
        }), "1" == a.data.currentTab && (a.data.params.pageNo = 1, a.setData({
            nocultures: [],
            activesLen: !1,
            hasMore: !0,
            loadMore: !0,
            params: a.data.params
        }), a.getGoodThingList());
    },
    clickSubmit: function(t) {
        console.log(t);
        var a = this;
        a.data.isUnloading ? wx.showToast({
            title: "文件正在上传中，不能提交",
            icon: "none",
            duration: 2e3
        }) : 0 !== a.data.projectListIndex[0] ? void 0 === a.data.goodThing.address || "" == a.data.goodThing.address || null == a.data.goodThing.address ? wx.showToast({
            title: "请选地址",
            icon: "none",
            duration: 2e3
        }) : t.detail.value.content && "" != t.detail.value.content ? (a.data.goodThing.content = t.detail.value.content, 
        a.data.goodThing.surName = a.data.member.nickname, a.data.goodThing.telephone = a.data.member.phoneNumber, 
        a.data.projectList[1].length > 0 ? (a.data.goodThing.typeId = a.data.projectList[1][a.data.projectListIndex[1]].id, 
        a.data.goodThing.integral = a.data.projectList[1][a.data.projectListIndex[1]].integralMinValue, 
        a.data.goodThing.typeIds = a.data.projectList[0][a.data.projectListIndex[0]].id + "," + a.data.projectList[1][a.data.projectListIndex[1]].id, 
        a.data.goodThing.typeName = a.data.projectList[0][a.data.projectListIndex[0]].name + "-" + a.data.projectList[1][a.data.projectListIndex[1]].name) : (a.data.goodThing.typeId = a.data.projectList[0][a.data.projectListIndex[0]].id, 
        a.data.goodThing.integral = a.data.projectList[0][a.data.projectListIndex[0]].integralMinValue, 
        a.data.goodThing.typeIds = a.data.projectList[0][a.data.projectListIndex[0]].id, 
        a.data.goodThing.typeName = a.data.projectList[0][a.data.projectListIndex[0]].name), 
        a.data.goodThing.pictures = a.data.pictures.join(","), a.data.goodThing.videos = a.data.videoUrl, 
        a.data.goodThing.memberId = a.data.member.id, a.data.goodThing.state = "1", a.data.goodThing.source = "好事", 
        e.post("/JnGoodManagement/save", a.data.goodThing, "加载中...").then(function(t) {
            t && (a.setData({
                showModal: 0
            }), a.getGoodThingList());
        }).catch(function(t) {
            console.log(t);
        })) : wx.showToast({
            title: "请填写好事内容",
            icon: "none",
            duration: 2e3
        }) : wx.showToast({
            title: "请选择好事类型",
            icon: "none",
            duration: 2e3
        });
    },
    clickCancle: function() {
        var t = this, a = t.data.goodThing.address;
        t.data.goodThing = {}, t.data.goodThing.address = a, t.getGoodThingList(), t.setData({
            currentTab: 1,
            showModal: 1,
            goodThing: t.data.goodThing,
            pictures: [],
            videoUrl: ""
        });
    },
    handleres: function(t) {
        var a = this;
        t.tempFilePaths && t.tempFilePaths.forEach(function(e, o, i) {
            a.upImgs(e, t.tempFiles[o].size);
        });
    },
    imgPreview: function(t) {
        console.log(t);
        var a = t.target.dataset.index, e = t.target.dataset.item.pictures;
        wx.previewImage({
            current: e[a],
            urls: e
        });
    },
    deleteImg: function(t) {
        var a = this.data.pictures, e = t.currentTarget.dataset.index;
        a.splice(e, 1), this.setData({
            pictures: a
        }), this.data.pictures.length < 9 && this.setData({
            isAdd: !0
        }), this.data.pictures.length <= 0 && this.setData({
            goodType: [ "图片", "视频" ]
        });
    },
    previewImg: function(t) {
        var a = this, e = t.currentTarget.dataset.index, o = [];
        a.data.pictures.forEach(function(t, a, e) {
            o.push(t);
        }), wx.previewImage({
            current: o[e],
            urls: o
        });
    },
    delType: function(t) {
        var a = this, o = t.currentTarget.dataset.id;
        console.log("delete:" + o), wx.showModal({
            title: "提示",
            content: "确认要删除吗?",
            success: function(t) {
                t.confirm ? e.post("/JnGoodManagement/delete", {
                    id: o
                }, "加载中...").then(function(t) {
                    t.success && a.getGoodThingList();
                }).catch(function(t) {
                    console.log(t);
                }) : t.cancel && console.log("用户点击取消");
            }
        });
    },
    isShowToast: function() {
        wx.showToast({
            title: "视频上传中，请稍后进行选择",
            icon: "none"
        });
    },
    chooseLoc: function() {
        console.log("呵呵呵");
        var t = this;
        wx.chooseLocation({
            success: function(a) {
                if ("" !== a.address && "" !== a.name) {
                    console.log("成功", a);
                    var e = a.address + a.name;
                    t.data.goodThing.address = e, t.setData({
                        goodThing: t.data.goodThing
                    });
                }
            },
            fail: function(t) {
                console.log("失败", t);
            }
        });
    }
});
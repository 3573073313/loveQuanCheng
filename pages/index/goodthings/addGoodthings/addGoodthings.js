function t(t, a, e) {
    return a in t ? Object.defineProperty(t, a, {
        value: e,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[a] = e, t;
}

var a, e = getApp(), o = new (require("../../../../utils/qqmap-wx-jssdk.js"))({
    key: "P26BZ-IRUK4-ZW5UP-XPMQL-F54SQ-3HBDW"
});

Page({
    data: (a = {
        isDefault: !1,
        member: {},
        currentTab: 0,
        staticurl: getApp().globalData.staticurl,
        nocultures: [],
        selectArray: [ {
            label: "好事0"
        }, {
            label: "好事1"
        }, {
            label: "好事2"
        }, {
            label: "好事3"
        } ],
        showModal: 1,
        goodType: [ "图片", "视频" ],
        projectList: [],
        projectListIndex: [ 0 ],
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
    bindinput: function(t) {
        var a = t.detail.value, e = this.data.goodThing;
        e.content = a.replace(/[^\u4E00-\u9FA5A-Za-z0-9_，,.。？?!！<>《》【】""'']+$/g, ""), this.setData({
            goodThing: e
        });
    },
    onShow: function() {
        var t = this, a = "";
        setTimeout(function() {
            (a = e.getMember()) && "" != a ? (t.data.isDefault = !1, t.setData({
                isDefault: !1,
                member: a
            })) : (t.data.isDefault = !0, t.setData({
                isDefault: !0
            }));
        }, 500), t.getProjectList();
    },
    onLoad: function() {
        var t = this, a = e.globalData.mineToMygoodthingTab;
        t.data.currentTab = a, t.setData({
            currentTab: t.data.currentTab
        });
    },
    getMylocation: function() {
        var t = this;
        o.reverseGeocoder({
            success: function(a) {
                var a = a.result;
                t.data.goodThing.address = a.address + a.formatted_addresses.recommend, t.setData({
                    latitude: a.location.lat,
                    longitude: a.location.lng,
                    goodThing: t.data.goodThing
                });
            },
            fail: function(t) {
                console.error(t);
            },
            complete: function(t) {}
        });
    },
    onReachBottom: function() {
        var t = this, a = t.data.params;
        t.data.hasMore && !t.data.loadMore ? (t.data.loadMore = !0, a.pageNo = parseInt(a.pageNo) + 1, 
        t.setData({
            params: a
        })) : t.data.hasMore || wx.showToast({
            title: "没有更多了",
            icon: "none",
            duration: 2e3
        });
    },
    getProjectList: function() {
        var t = this, a = {
            parentId: ""
        };
        e.post("/JnProjectTypeManagement/listByType", a, "加载中...").then(function(a) {
            if (a) {
                var e = [];
                e[0] = a.body.page.records, e[0].splice(0, 0, {
                    name: "请选择"
                }), console.log("res--projectList", e), t.setData({
                    projectList: e
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
        }));
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
        a.data.goodThing.typeId = a.data.projectList[0][a.data.projectListIndex[0]].id, 
        a.data.goodThing.integral = a.data.projectList[0][a.data.projectListIndex[0]].integralMinValue, 
        a.data.goodThing.typeIds = a.data.projectList[0][a.data.projectListIndex[0]].id, 
        a.data.goodThing.typeName = a.data.projectList[0][a.data.projectListIndex[0]].name, 
        a.data.goodThing.pictures = a.data.pictures.join(","), a.data.goodThing.videos = a.data.videoUrl, 
        a.data.goodThing.memberId = a.data.member.id, a.data.goodThing.state = "1", a.data.goodThing.source = "好事", 
        e.post("/JnGoodManagement/save", a.data.goodThing, "加载中...").then(function(t) {
            t && a.setData({
                showModal: 0
            });
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
        t.data.goodThing = {}, t.data.goodThing.address = a, t.setData({
            showModal: 1,
            pictures: [],
            videoUrl: ""
        }), wx.redirectTo({
            url: "/pages/index/goodthings/goodthings?currentTab=1"
        });
    },
    bindMultiPickerChange: function(t) {
        var a = this, e = t.detail.value, o = e[0], i = a.data.projectList[0][o].id;
        console.log(e), console.log(i), a.setData({
            projectListIndex: t.detail.value,
            chooseId: i
        });
    },
    bindMultiPickerColumnChange: function(t) {
        var a = this;
        if (console.log(t.detail), 0 == t.detail.column && 0 == t.detail.value) {
            var o = a.data.projectList;
            o[1] = [ {
                name: ""
            } ], console.log("tempList---", o), a.setData({
                projectList: o
            });
        }
        if (0 == t.detail.column && 0 != t.detail.value) {
            var i = {
                parentId: a.data.projectList[0][t.detail.value].id
            };
            e.post("/JnProjectTypeManagement/listByType", i, "加载中...").then(function(t) {
                if (t) {
                    var e = a.data.projectList;
                    e[1] = t.body.page.records, a.setData({
                        projectList: e
                    });
                }
            }).catch(function(t) {
                console.log(t);
            });
        }
    },
    showmodal: function(t) {
        var a = this;
        wx.showActionSheet({
            itemList: a.data.goodType,
            itemColor: "#00000",
            success: function(t) {
                t.cancel || ("图片" == a.data.goodType[t.tapIndex] ? a.camera() : a.video());
            }
        });
    },
    camera: function() {
        var t = this;
        wx.chooseImage({
            count: 9,
            sizeType: [ "original", "compressed" ],
            sourceType: [ "album", "camera" ],
            success: function(a) {
                t.handleres(a);
            }
        });
    },
    video: function() {
        var t = this;
        t.setData({
            isUnloading: !0
        }), wx.chooseVideo({
            sizeType: [ "original", "compressed" ],
            sourceType: [ "album", "camera" ],
            success: function(a) {
                t.uploadVideo(a), t.setData({
                    isAdd: !1
                });
            },
            complete: function(a) {
                console.log("complete"), t.setData({
                    isUnloading: !1
                });
            }
        });
    },
    uploadVideo: function(t) {
        var a = this;
        wx.uploadFile({
            url: e.globalData.baseurl + "/file/upload",
            filePath: t.tempFilePath,
            name: "photo",
            header: {
                "content-type": "multipart/form-data"
            },
            formData: null,
            success: function(t) {
                var e = JSON.parse(t.data);
                a.setData({
                    videoUrl: e.body.data.url,
                    goodType: [ "视频" ]
                });
            }
        });
    },
    deleteVideo: function() {
        console.log("删除视频"), this.setData({
            videoUrl: "",
            isAdd: !0,
            goodType: [ "图片", "视频" ]
        });
    },
    handleres: function(t) {
        var a = this;
        t.tempFilePaths && t.tempFilePaths.forEach(function(e, o, i) {
            a.upImgs(e, t.tempFiles[o].size);
        });
    },
    upImgs: function(t, a) {
        var o = this;
        o.setData({
            goodType: [ "图片" ]
        }), a > 5e5 && a < 5e6 ? wx.compressImage({
            src: t,
            quality: 10,
            success: function(t) {
                wx.uploadFile({
                    url: e.globalData.baseurl + "/file/upload",
                    filePath: t.tempFilePath,
                    name: "photo",
                    header: {
                        "content-type": "multipart/form-data"
                    },
                    formData: null,
                    success: function(t) {
                        var a = JSON.parse(t.data);
                        if (a.body.data.url && "" != a.body.data.url && (o.data.pictures.push(a.body.data.url), 
                        o.setData({
                            pictures: o.data.pictures
                        })), o.data.pictures.length >= 9) {
                            var e = o.data.pictures.splice(0, 9);
                            o.setData({
                                pictures: e,
                                isAdd: !1
                            });
                        }
                    }
                });
            }
        }) : a >= 5e6 ? wx.compressImage({
            src: t,
            quality: 4,
            success: function(t) {
                wx.uploadFile({
                    url: e.globalData.baseurl + "/file/upload",
                    filePath: t.tempFilePath,
                    name: "photo",
                    header: {
                        "content-type": "multipart/form-data"
                    },
                    formData: null,
                    success: function(t) {
                        var a = JSON.parse(t.data);
                        if (a.body.data.url && "" != a.body.data.url && (o.data.pictures.push(a.body.data.url), 
                        o.setData({
                            pictures: o.data.pictures
                        })), o.data.pictures.length >= 9) {
                            var e = o.data.pictures.splice(0, 9);
                            o.setData({
                                pictures: e,
                                isAdd: !1
                            });
                        }
                    }
                });
            }
        }) : wx.uploadFile({
            url: e.globalData.baseurl + "/file/upload",
            filePath: t,
            name: "photo",
            header: {
                "content-type": "multipart/form-data"
            },
            formData: null,
            success: function(t) {
                var a = JSON.parse(t.data);
                if (a.body.data.url && "" != a.body.data.url && (o.data.pictures.push(a.body.data.url), 
                o.setData({
                    pictures: o.data.pictures
                })), o.data.pictures.length >= 9) {
                    var e = o.data.pictures.splice(0, 9);
                    o.setData({
                        pictures: e,
                        isAdd: !1
                    });
                }
            }
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
        var a = t.currentTarget.dataset.id;
        console.log("delete:" + a), wx.showModal({
            title: "提示",
            content: "确认要删除吗?",
            success: function(t) {
                t.confirm ? e.post("/JnGoodManagement/delete", {
                    id: a
                }, "加载中...").then(function(t) {
                    t.success;
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
    openMap: function() {
        var t = this, a = t.data.goodThing;
        wx.chooseLocation({
            success: function(e) {
                console.log("选择地址---", e), o.reverseGeocoder({
                    location: {
                        latitude: e.latitude,
                        longitude: e.longitude
                    },
                    success: function(o) {
                        var o = o.result;
                        console.log("成功-----------====", o), a.address = "" + o.address_component.city + o.address_component.district + o.address_component.street, 
                        a.latitude = e.latitude, a.longitude = e.longitude, t.setData({
                            goodThing: a
                        });
                    },
                    fail: function(t) {
                        console.error(t);
                    },
                    complete: function(t) {
                        console.log(t);
                    }
                });
            },
            fail: function(t) {
                console.log("取消选择", t);
            }
        });
    }
});
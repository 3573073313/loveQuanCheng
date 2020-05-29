var t = getApp(), e = new (require("../../../../utils/qqmap-wx-jssdk.js"))({
    key: "P26BZ-IRUK4-ZW5UP-XPMQL-F54SQ-3HBDW"
});

Page({
    data: {
        isDefault: !1,
        staticurl: getApp().globalData.staticurl,
        member: {},
        typeobj: {},
        typeList: [],
        index: 0,
        subobj: {},
        earnScore: "",
        goodType: [ "图片", "视频" ],
        pictures: [],
        videoUrl: "",
        showModal: 1,
        isAdd: !0,
        isTypeIndex: 0,
        isUnloading: !1,
        isShowMore: !1
    },
    showMore: function() {
        var t = this;
        console.log("显示更多"), t.setData({
            isShowMore: !t.data.isShowMore
        });
    },
    onLoad: function(t) {
        var e = this;
        if (t.info) {
            var a = JSON.parse(t.info);
            console.log("info----", a), a = "img" !== a[0].children[0].tagName ? a : [], e.setData({
                info: a,
                infoId: t.id,
                typeId: t.typeId,
                infoTitle: t.infoTitle,
                score: t.score,
                contribute: !!t.contribute
            });
        }
        t.addGoodthings && (e.setData({
            isAddGoodthings: !0
        }), wx.setNavigationBarTitle({
            title: "做好事"
        })), t.contribute && wx.setNavigationBarTitle({
            title: "投稿"
        });
    },
    onShow: function() {
        var e = "", a = this;
        a.getList(), setTimeout(function() {
            (e = t.getMember()) && "" != e ? (a.data.isDefault = !1, a.setData({
                isDefault: !1,
                member: e
            })) : (a.data.isDefault = !0, a.setData({
                isDefault: !0
            }));
        }, 500);
    },
    openMap: function() {
        var t = this, a = t.data.subobj;
        wx.chooseLocation({
            success: function(o) {
                e.reverseGeocoder({
                    location: {
                        latitude: o.latitude,
                        longitude: o.longitude
                    },
                    success: function(e) {
                        var e = e.result;
                        a.address = "", e.address_component.city && (a.address += e.address_component.city, 
                        e.address_component.district && (a.address += "·" + e.address_component.district, 
                        e.address_component.street && (a.address += "·" + e.address_component.street))), 
                        a.latitude = o.latitude, a.longitude = o.longitude, t.setData({
                            subobj: a
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
    },
    isShowToast: function() {
        wx.showToast({
            title: "视频上传中，请稍后进行选择",
            icon: "none"
        });
    },
    getMylocation: function() {
        var t = this, a = t.data.subobj;
        wx.getLocation({
            type: "gcj02",
            success: function(o) {
                e.reverseGeocoder({
                    location: {
                        latitude: o.latitude,
                        longitude: o.longitude
                    },
                    success: function(e) {
                        var e = e.result;
                        console.log("成功", e.address), a.address = e.address, t.setData({
                            subobj: a
                        });
                    },
                    fail: function(t) {
                        console.error(t);
                    },
                    complete: function(t) {
                        console.log(t);
                    }
                });
            }
        });
    },
    getList: function() {
        var e = this;
        t.post("JnProjectTypeManagement/list", {
            pageSize: 50
        }, "加载中...").then(function(t) {
            if (t.success) {
                console.log(t);
                var a = t.body.page.records, o = {
                    name: "更多",
                    icon: e.data.staticurl + "goodActMoreNew@3x.png"
                };
                a.splice(4, 0, o), e.setData({
                    typeList: a
                });
            }
        }).catch(function(t) {
            console.log(t);
        });
    },
    setType: function(t) {
        var e = this, a = t.currentTarget.dataset.index, o = t.currentTarget.dataset.item, s = e.data.subobj;
        s.typeId = o.id, s.integralMaxValue = o.integralMaxValue, s.integralMinValue = o.integralMinValue, 
        s.typeName = o.name, e.setData({
            index: a,
            subobj: s
        });
    },
    bindTextAreaBlur: function(t) {
        var e = t.detail.value, a = this.data.subobj;
        a.content = e.replace(/[^\u4E00-\u9FA5A-Za-z0-9_，,.。？?!！<>《》【】""'']+$/g, ""), this.setData({
            subobj: a
        });
    },
    showmodal: function(t) {
        var e = this;
        console.log("that.data.pictures---", e.data.pictures), e.data.pictures && e.data.pictures.length ? e.setData({
            goodType: [ "图片" ]
        }) : e.setData({
            goodType: [ "图片", "视频" ]
        }), wx.showActionSheet({
            itemList: e.data.goodType,
            success: function(t) {
                t.cancel || ("图片" == e.data.goodType[t.tapIndex] ? e.camera() : e.video());
            },
            fail: function(t) {}
        });
    },
    camera: function() {
        var t = this;
        wx.chooseImage({
            count: t.data.pictures.length ? 9 - t.data.pictures.length : 9,
            sizeType: [ "original", "compressed" ],
            sourceType: [ "album", "camera" ],
            success: function(e) {
                wx.showToast({
                    title: "加载中",
                    icon: "loading",
                    duration: 2e3
                }), t.handleres(e);
            },
            fail: function(t) {}
        });
    },
    handleres: function(t) {
        var e = this;
        t.tempFilePaths && t.tempFilePaths.forEach(function(a, o, s) {
            e.upImgs(a, t.tempFiles[o].size);
        });
    },
    upImgs: function(e, a) {
        var o = this;
        a > 5e5 && a < 5e6 ? wx.compressImage({
            src: e,
            quality: 10,
            success: function(e) {
                wx.uploadFile({
                    url: t.globalData.baseurl + "/file/upload",
                    filePath: e.tempFilePath,
                    name: "photo",
                    header: {
                        "content-type": "multipart/form-data"
                    },
                    formData: null,
                    success: function(t) {
                        var e = JSON.parse(t.data);
                        if (e.body.data.url && "" != e.body.data.url && (o.data.pictures.push(e.body.data.url), 
                        o.setData({
                            pictures: o.data.pictures
                        })), o.data.pictures.length >= 9) {
                            var a = o.data.pictures.splice(0, 9);
                            o.setData({
                                pictures: a,
                                isAdd: !1
                            });
                        }
                    }
                });
            }
        }) : a >= 5e6 ? wx.compressImage({
            src: e,
            quality: 4,
            success: function(e) {
                wx.uploadFile({
                    url: t.globalData.baseurl + "/file/upload",
                    filePath: e.tempFilePath,
                    name: "photo",
                    header: {
                        "content-type": "multipart/form-data"
                    },
                    formData: null,
                    success: function(t) {
                        var e = JSON.parse(t.data);
                        if (e.body.data.url && "" != e.body.data.url && (o.data.pictures.push(e.body.data.url), 
                        o.setData({
                            pictures: o.data.pictures
                        })), o.data.pictures.length >= 9) {
                            var a = o.data.pictures.splice(0, 9);
                            o.setData({
                                pictures: a,
                                isAdd: !1
                            });
                        }
                    }
                });
            }
        }) : wx.uploadFile({
            url: t.globalData.baseurl + "/file/upload",
            filePath: e,
            name: "photo",
            header: {
                "content-type": "multipart/form-data"
            },
            formData: null,
            success: function(t) {
                var e = JSON.parse(t.data);
                if (e.body.data.url && "" != e.body.data.url && (o.data.pictures.push(e.body.data.url), 
                o.setData({
                    pictures: o.data.pictures
                })), o.data.pictures.length >= 9) {
                    var a = o.data.pictures.splice(0, 9);
                    o.setData({
                        pictures: a,
                        isAdd: !1
                    });
                }
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
            success: function(e) {
                t.uploadVideo(e), console.log("选择---", e), wx.showLoading({
                    title: "加载中"
                }), t.setData({
                    isAdd: !1,
                    isUnloading: !1
                });
            },
            fail: function(e) {
                console.log("fail"), t.setData({
                    goodType: [ "图片", "视频" ],
                    isUnloading: !1
                });
            },
            complete: function(t) {
                console.log("complete");
            }
        });
    },
    uploadVideo: function(e) {
        var a = this;
        wx.uploadFile({
            url: t.globalData.baseurl + "/file/upload",
            filePath: e.tempFilePath,
            name: "photo",
            header: {
                "content-type": "multipart/form-data"
            },
            formData: null,
            success: function(t) {
                console.log("视频res----", t), wx.hideLoading();
                var e = JSON.parse(t.data);
                console.log("视频res--data--", e), a.setData({
                    videoUrl: e.body.data.url
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
    deleteImg: function(t) {
        var e = this.data.pictures, a = t.currentTarget.dataset.index;
        e.splice(a, 1), this.setData({
            pictures: e
        }), this.data.pictures.length < 9 && this.setData({
            isAdd: !0
        }), this.data.pictures.length <= 0 && this.setData({
            goodType: [ "图片", "视频" ]
        });
    },
    previewImg: function(t) {
        var e = this, a = t.currentTarget.dataset.index, o = [];
        e.data.pictures.forEach(function(t, e, a) {
            o.push(t);
        }), wx.previewImage({
            current: o[a],
            urls: o
        });
    },
    clickSubmit: function() {
        var e = this, a = e.data.subobj;
        if (e.data.isUnloading) wx.showToast({
            title: "文件正在上传中，不能提交",
            icon: "none",
            duration: 2e3
        }); else if (a.content) if (void 0 !== a.address) {
            if (a.pictures = e.data.pictures.join(","), a.videos = e.data.videoUrl, a.address = a.address, 
            a.memberId = e.data.member.id, a.surName = e.data.member.nickname, a.telephone = e.data.member.phoneNumber, 
            e.data.infoId) a.activityId = e.data.infoId, a.typeId = e.data.typeId; else {
                var o = e.data.typeList, s = e.data.index;
                a.typeId = o[s].id;
            }
            e.data.contribute && (a.typeName = "投稿");
            var i = "";
            e.data.isAddGoodthings || e.data.contribute ? (i = "/JnGoodManagement/save", a.state = "1", 
            a.source = "好事") : i = "/JnHandyManagement/save", e.setData({
                isSubmit: !0
            }), t.post(i, a, "加载中...").then(function(t) {
                t && e.setData({
                    showModal: 0
                });
            }).catch(function(t) {
                console.log(t);
            });
        } else wx.showToast({
            title: "请选择地址",
            icon: "none",
            duration: 2e3
        }); else wx.showToast({
            title: "请填内容",
            icon: "none",
            duration: 2e3
        });
    },
    clickCancle: function(t) {
        var e = this, a = e.data.subobj.address;
        e.data.subobj = {}, e.data.subobj.address = a, e.data.subobj.typeId = "", e.data.subobj.integral = "", 
        e.data.subobj.content = "", e.setData({
            showModal: 1,
            subobj: e.data.subobj,
            pictures: [],
            videoUrl: "",
            typeList: [],
            earnScore: ""
        }), wx.navigateBack({
            delta: 1
        });
    }
});
var t = getApp(), a = new (require("../../../utils/qqmap-wx-jssdk.js"))({
    key: "P26BZ-IRUK4-ZW5UP-XPMQL-F54SQ-3HBDW"
});

Page({
    data: {
        isSubmit: !1,
        staticurl: getApp().globalData.staticurl,
        isDefault: !1,
        member: {},
        typeList: [ {
            label: "功能吐槽",
            show: !0
        }, {
            label: "系统故障"
        }, {
            label: "内容意见"
        } ],
        obj: {},
        goodType: [ "图片", "视频" ],
        pictures: [],
        videoUrl: "",
        showModal: 1,
        isAdd: !0
    },
    getType: function() {
        var a = this;
        t.post("/dict/sys-dict/list", {
            type: "feed_back_type"
        }, "加载中...").then(function(t) {
            if (t) {
                var e = t.body.data;
                console.log("反馈类型", JSON.stringify(e)), e.length && (e[0].show = !0, a.setData({
                    typeList: e
                }));
            }
        }).catch(function(t) {
            console.log(t);
        });
    },
    chooseType: function(t) {
        var a = this, e = t.currentTarget.dataset.index, o = a.data.typeList;
        o.forEach(function(t) {
            delete t.show;
        }), o[e].show = !0, a.setData({
            typeList: o
        });
    },
    onLoad: function() {},
    onShow: function() {
        var a = "", e = this;
        setTimeout(function() {
            (a = t.getMember()) && "" != a ? (e.data.isDefault = !1, e.setData({
                isDefault: !1,
                member: a
            })) : (e.data.isDefault = !0, e.setData({
                isDefault: !0
            }));
        }, 500), e.getMylocation(), e.getType();
    },
    getMylocation: function() {
        var t = this;
        a.reverseGeocoder({
            success: function(a) {
                var a = a.result;
                t.data.obj.address = a.address + a.formatted_addresses.recommend, t.setData({
                    latitude: a.location.lat,
                    longitude: a.location.lng,
                    obj: t.data.obj
                });
            },
            fail: function(t) {
                console.error(t);
            },
            complete: function(t) {}
        });
    },
    showmodal: function(t) {
        var a = this;
        wx.showActionSheet({
            itemList: a.data.goodType,
            itemColor: "#00000",
            success: function(t) {
                t.cancel || ("图片" == a.data.goodType[t.tapIndex] ? (a.setData({
                    goodType: [ "图片" ]
                }), a.camera()) : (a.setData({
                    goodType: [ "视频" ]
                }), a.video()));
            }
        });
    },
    camera: function() {
        var t = this;
        wx.chooseImage({
            count: t.data.pictures.length ? 9 - t.data.pictures.length : 9,
            sizeType: [ "original", "compressed" ],
            sourceType: [ "album", "camera" ],
            success: function(a) {
                t.handleres(a);
            }
        });
    },
    handleres: function(t) {
        var a = this;
        t.tempFilePaths && t.tempFilePaths.forEach(function(e, o, s) {
            a.upImgs(e, t.tempFiles[o].size);
        });
    },
    upImgs: function(a, e) {
        var o = this;
        e > 5e5 && e < 5e6 ? wx.compressImage({
            src: a,
            quality: 10,
            success: function(a) {
                wx.uploadFile({
                    url: t.globalData.baseurl + "/file/upload",
                    filePath: a.tempFilePath,
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
        }) : e >= 5e6 ? wx.compressImage({
            src: a,
            quality: 4,
            success: function(a) {
                wx.uploadFile({
                    url: t.globalData.baseurl + "/file/upload",
                    filePath: a.tempFilePath,
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
            url: t.globalData.baseurl + "/file/upload",
            filePath: a,
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
    video: function() {
        var t = this;
        wx.chooseVideo({
            sizeType: [ "original", "compressed" ],
            sourceType: [ "album", "camera" ],
            success: function(a) {
                t.uploadVideo(a), t.setData({
                    isAdd: !1
                });
            }
        });
    },
    uploadVideo: function(a) {
        var e = this;
        wx.uploadFile({
            url: t.globalData.baseurl + "/file/upload",
            filePath: a.tempFilePath,
            name: "photo",
            header: {
                "content-type": "multipart/form-data"
            },
            formData: null,
            success: function(t) {
                var a = JSON.parse(t.data);
                e.setData({
                    videoUrl: a.body.data.url
                });
            }
        });
    },
    bindTextAreaBlur: function(t) {
        this.data.obj.content = t.detail.value, this.setData({
            obj: this.data.obj
        });
    },
    isFinish: function() {
        var t = this;
        t.data.obj.content ? t.clickSubmit() : wx.showToast({
            title: "请填内容",
            icon: "none",
            duration: 2e3
        });
    },
    clickSubmit: function() {
        var a = this, e = a.data.obj;
        a.data.isSubmit || (a.setData({
            isSubmit: !0
        }), e.surName = a.data.member.nickname, a.data.member.phoneNumber && "" != a.data.member.phoneNumber ? e.telephone = a.data.member.phoneNumber : e.telephone = "", 
        e.pictures = a.data.pictures.join(","), e.videos = a.data.videoUrl, e.memberId = a.data.member.id, 
        e.feedBackType = a.data.typeList.find(function(t) {
            return t.show;
        }).value, console.log("obj.feedBackType--", e.feedBackType), t.post("/JnContentProposal/save", e, "加载中...").then(function(t) {
            console.log(t), t && a.setData({
                showModal: 0
            });
        }).catch(function(t) {
            console.log(t);
        }));
    },
    clickCancle: function() {
        var t = this, a = t.data.obj.address;
        t.data.obj = {}, t.data.obj.address = a, t.setData({
            showModal: 1,
            obj: t.data.obj,
            pictures: [],
            videoUrl: ""
        }), wx.navigateTo({
            url: "/pages/mine/yfkjy/yfkjy?data=1"
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
    openMap: function() {
        var t = this, e = t.data.obj;
        wx.chooseLocation({
            success: function(o) {
                a.reverseGeocoder({
                    location: {
                        latitude: o.latitude,
                        longitude: o.longitude
                    },
                    success: function(a) {
                        var a = a.result;
                        e.address = a.address_component.city + "·" + a.address_component.district + "·" + a.address_component.street, 
                        e.latitude = o.latitude, e.longitude = o.longitude, t.setData({
                            obj: e
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
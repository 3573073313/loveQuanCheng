var e = getApp();

Page({
    data: {
        staticUrl: e.globalData.staticurl,
        isSubmit: !1,
        recruitForm: [],
        pickerList: [ {
            name: "请选择"
        }, {
            name: "高中及以下"
        }, {
            name: "大专"
        }, {
            name: "本科"
        }, {
            name: "硕士"
        }, {
            name: "博士及以上"
        } ],
        fileType: [ "图片", "视频", "其他文件" ],
        pictures: []
    },
    upLoad: function(e) {
        var t = this, a = t.data.recruitForm, i = e.currentTarget.dataset.index;
        void 0 == a[i].pictures && (a[i].pictures = []);
        var r = a[i].pictures, o = a[i].fileTypeList;
        o = r && r.length ? [ "图片" ] : [ "图片", "视频", "其他文件" ], t.setData({
            recruitForm: a
        }), wx.showActionSheet({
            itemList: o,
            success: function(e) {
                switch (console.log(e.tapIndex), e.tapIndex) {
                  case 0:
                    t.camera(i);
                    break;

                  case 1:
                    t.video(i);
                    break;

                  case 2:
                    t.uploadFile(i);
                }
            },
            fail: function(e) {
                console.log(e.errMsg);
            }
        });
    },
    camera: function(e) {
        var t = this;
        console.log("图片---");
        var a = t.data.recruitForm;
        wx.chooseImage({
            count: 9 - a[e].pictures.length,
            sizeType: [ "original", "compressed" ],
            sourceType: [ "album", "camera" ],
            success: function(a) {
                wx.showToast({
                    title: "加载中",
                    icon: "loading",
                    duration: 2e3
                }), console.log("res---", a), t.handleres(a, e);
            },
            fail: function(e) {}
        });
    },
    handleres: function(e, t) {
        var a = this;
        e.tempFilePaths && e.tempFiles.forEach(function(e) {
            a.upImgs(e.path, e.size, t);
        });
    },
    upImgs: function(t, a, i) {
        var r = this;
        a > 5e5 && a < 5e6 ? wx.compressImage({
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
                    success: function(e) {
                        var t = JSON.parse(e.data), a = r.data.recruitForm;
                        t.body.data.url && "" != t.body.data.url && a[i].pictures.push(t.body.data.url), 
                        a[i].pictures.length >= 9 && (a[i].pictures = a[i].pictures.splice(0, 9)), console.log("recruitForm--recruitForm[index]---1111", a[i]), 
                        a[i].fileType = "photo", r.setData({
                            recruitForm: a
                        });
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
                    success: function(e) {
                        var t = JSON.parse(e.data), a = r.data.recruitForm;
                        t.body.data.url && "" != t.body.data.url && a[i].pictures.push(t.body.data.url), 
                        a[i].pictures.length >= 9 && (a[i].pictures = a[i].pictures.splice(0, 9)), console.log("recruitForm--recruitForm[index]---222", a[i]), 
                        a[i].fileType = "photo", r.setData({
                            recruitForm: a
                        });
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
            success: function(e) {
                var t = JSON.parse(e.data), a = r.data.recruitForm;
                t.body.data.url && "" != t.body.data.url && a[i].pictures.push(t.body.data.url), 
                a[i].pictures.length >= 9 && (a[i].pictures = a[i].pictures.splice(0, 9)), console.log("recruitForm--recruitForm[index]---333", a[i]), 
                a[i].fileType = "photo", r.setData({
                    recruitForm: a
                });
            }
        });
    },
    previewImg: function(e) {
        var t = this.data.recruitForm, a = e.currentTarget.dataset.index, i = e.currentTarget.dataset.i, r = [];
        t[a].pictures.forEach(function(e) {
            r.push(e);
        }), wx.previewImage({
            current: r[i],
            urls: r
        });
    },
    video: function(e) {
        var t = this, a = t.data.recruitForm;
        a[e].isUnloading = !0, t.setData({
            recruitForm: a
        }), wx.chooseVideo({
            sizeType: [ "original", "compressed" ],
            sourceType: [ "album", "camera" ],
            success: function(i) {
                t.uploadVideo(i, e), console.log("选择---", i), wx.showLoading({
                    title: "加载中"
                }), a[e].isUnloading = !1, t.setData({
                    recruitForm: a
                });
            },
            fail: function(i) {
                console.log("fail"), a[e].isUnloading = !1, a[e].fileTypeList = [ "图片", "视频", "其他文件" ], 
                t.setData({
                    recruitForm: a
                });
            },
            complete: function(e) {
                console.log("complete");
            }
        });
    },
    uploadVideo: function(t, a) {
        var i = this;
        wx.uploadFile({
            url: e.globalData.baseurl + "/file/upload",
            filePath: t.tempFilePath,
            name: "photo",
            header: {
                "content-type": "multipart/form-data"
            },
            formData: null,
            success: function(e) {
                console.log("视频res----", e), wx.hideLoading();
                var t = JSON.parse(e.data), r = i.data.recruitForm;
                console.log("视频res--data--", t), r[a].videoUrl = t.body.data.url, r[a].fileType = "video", 
                i.setData({
                    recruitForm: r
                });
            }
        });
    },
    deleteFile: function(e) {
        console.log("删除文件");
        var t = this, a = t.data.recruitForm, i = e.currentTarget.dataset.index;
        a[i].fileName = "", a[i].fileUrl = "", a[i].fileType = "", t.setData({
            recruitForm: a
        });
    },
    deleteVideo: function(e) {
        console.log("删除视频");
        var t = this, a = t.data.recruitForm, i = e.currentTarget.dataset.index;
        console.log("index---", i), console.log("recruitForm[index]---", a[i]), console.log("recruitForm[index].videoUrl---", a[i].videoUrl), 
        a[i].videoUrl = "", t.setData({
            recruitForm: a
        });
    },
    deleteImg: function(e) {
        var t = this.data.recruitForm, a = e.currentTarget.dataset.index, i = t[a].pictures, r = e.currentTarget.dataset.i;
        i.splice(r, 1), this.setData({
            recruitForm: t
        }), this.data.pictures.length < 9 && this.setData({}), this.data.pictures.length <= 0 && (t[a].fileTypeList = [ "图片", "视频", "其他文件" ], 
        this.setData({
            recruitForm: t
        }));
    },
    uploadFile: function(t) {
        var a = this, i = a.data.recruitForm;
        wx.chooseMessageFile({
            count: 1,
            type: "file",
            success: function(r) {
                console.log("选择--", r), wx.uploadFile({
                    url: e.globalData.baseurl + "/file/upload",
                    filePath: r.tempFiles[0].path,
                    name: "photo",
                    header: {
                        "content-type": "multipart/form-data"
                    },
                    formData: null,
                    success: function(e) {
                        var o = JSON.parse(e.data);
                        console.log("resUp---", e), console.log("resUp-data--", o), o.body.data.url && "" != o.body.data.url && (i[t].fileName = r.tempFiles[0].name, 
                        i[t].fileType = r.tempFiles[0].type, i[t].fileUrl = o.body.data.url, i[t].fileTempUrl = r.tempFiles[0].path), 
                        a.setData({
                            recruitForm: i
                        });
                    }
                });
            }
        });
    },
    lookDetail: function(e) {
        var t = this, a = e.currentTarget.dataset.index, i = t.data.recruitForm;
        wx.openDocument({
            filePath: i[a].fileTempUrl,
            fileType: "doc",
            success: function(e) {
                console.log("打开文档成功");
            },
            fail: function(e) {
                console.log("打开文档失败", e);
            }
        });
    },
    getFocus: function(e) {
        var t = this, a = t.data.recruitForm;
        a[e.currentTarget.dataset.index].focus = !0, t.setData({
            recruitForm: a
        });
    },
    textareaBlur: function(e) {
        var t = this, a = t.data.recruitForm;
        a[e.currentTarget.dataset.index].focus = !1, t.setData({
            recruitForm: a
        });
    },
    chooseRadio: function(e) {
        var t = this, a = t.data.recruitForm;
        a.find(function(e) {
            return "radio" == e.type;
        }).value = e.currentTarget.dataset.value, t.setData({
            recruitForm: a
        });
    },
    inputFuc: function(e) {
        var t = this, a = t.data.recruitForm;
        a[e.currentTarget.dataset.index].value = e.detail.value, t.setData({
            recruitForm: a
        });
    },
    bindPickerChange: function(e) {
        var t = this, a = e.currentTarget.dataset.index, i = t.data.recruitForm;
        i[a].value = e.detail.value, console.log("picker发送选择改变，携带值为", e.detail.value), t.setData({
            recruitForm: i
        });
    },
    submitActiveTypeList: function(t) {
        e.postJSON("JnUnderlineActivityOrder/save", t).then(function(e) {
            e.success && wx.showToast({
                title: "提交成功",
                duration: 1e3,
                success: function() {
                    setTimeout(function() {
                        wx.navigateBack({
                            delta: 1
                        });
                    }, 500);
                }
            });
        }).catch(function(e) {});
    },
    getActivityOrderDetails: function(e) {
        var t = this;
        e = JSON.parse(e), console.log("result--", e), t.setData({
            actList: e
        }), t.setFormList();
    },
    getActiveTypeList: function() {
        var t = this;
        e.post("/JnUnderlineRecruitActivity/get", {
            id: t.data.id
        }).then(function(e) {
            e.success && (t.setData({
                actList: e.body.data.template.columnList
            }), t.setFormList());
        }).catch(function(e) {});
    },
    setFormList: function() {
        var e = this, t = e.data.actList, a = e.data.recruitForm;
        t.forEach(function(t, i) {
            var r = {
                key: t.fieldName,
                title: t.columnName,
                placeholder: t.columnComment,
                maxlength: t.fieldLength,
                type: t.htmlType,
                isRequired: t.isRequired,
                actItem: t
            };
            if (void 0 != t.value) {
                if ("picker" == t.htmlType && (r.pickerList = e.data.pickerList, t.value = r.pickerList.indexOf(r.pickerList.find(function(e) {
                    return e.name == t.value;
                }))), "radio" == t.htmlType && (t.value = "男" == t.value ? 0 : 1), r.value = t.value, 
                "file" == t.htmlType && t.value && t.fileType) switch (t.fileType) {
                  case "video":
                    r.videoUrl = t.value;
                    break;

                  case "photo":
                    r.pictures = t.value.indexOf(",") > 0 ? t.value.split(",") : [ t.value ];
                    break;

                  case "file":
                    r.fileType = t.fileType, r.fileName = r.title, wx.downloadFile({
                        url: t.value,
                        success: function(t) {
                            var r = i;
                            200 === t.statusCode && (a[r].fileUrl = t.tempFilePath, a[r].fileTempUrl = t.tempFilePath, 
                            e.setData({
                                recruitForm: a
                            }));
                        }
                    }), console.log("是文件---", i);
                }
            } else r.pickerList = "picker" == r.type ? e.data.pickerList : null, r.value = "picker" == r.type ? 0 : void 0;
            r.type = "idCard" == r.type ? "idcard" : "input" == r.type ? "text" : r.type, console.log("obj---", r), 
            a.push(r);
        }), console.log("recruitForm---", a), e.setData({
            recruitForm: a
        });
    },
    checkoutForm: function() {
        var e = this, t = e.data.recruitForm;
        new Promise(function(e, a) {
            for (var i = 0, r = 0; r < t.length; r++) {
                var o = t[r];
                if (1 == o.isRequired) if (o.value && 0 != o.value) i += 1; else if ("file" == o.type) {
                    if (!(o.pictures && o.pictures.length || o.videoUrl && o.videoUrl.length || o.fileUrl && o.fileUrl)) return wx.showToast({
                        title: o.placeholder,
                        icon: "none"
                    }), void a();
                    i += 1;
                } else {
                    if ("radio" != o.type || 0 != o.value) return wx.showToast({
                        title: o.placeholder,
                        icon: "none"
                    }), void a();
                    i += 1;
                } else i += 1;
            }
            i == t.length && e();
        }).then(function(t) {
            e.submitForm();
        });
    },
    submitForm: function() {
        var e = this;
        e.setData({
            isSubmit: !0
        });
        var t = e.data.recruitForm, a = {};
        a.memberId = e.data.memberId, a.activityType = "1", a.activityId = e.data.id, a.orderDetails = {}, 
        a.orderDetails.paramData = [], t.forEach(function(e) {
            "file" == e.type && (e.pictures && e.pictures.length && (e.value = e.pictures.join()), 
            e.videoUrl && e.videoUrl.length && (e.value = e.videoUrl), e.fileUrl && e.fileUrl.length && (e.value = e.fileUrl, 
            e.actItem.fileName = e.fileName), e.actItem.fileType = e.fileType), "radio" == e.type && (e.value = 0 == e.value ? "男" : 1 == e.value ? "女" : void 0), 
            "picker" == e.type && (0 != e.value ? e.value = e.pickerList[e.value].name : e.value = void 0), 
            e.actItem.value = e.value, void 0 != e.actItem.value && a.orderDetails.paramData.push(e.actItem);
        }), console.log("iData-----", a), e.submitActiveTypeList(a);
    },
    onLoad: function(t) {
        console.log(t), this.setData({
            id: t.id,
            memberId: e.getMember() ? e.getMember().id : "360c860bc61ff2661c4e5a97388d6a75",
            isOrder: !!t.isOrder
        }), t.isOrder ? this.getActivityOrderDetails(t.result) : this.getActiveTypeList();
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});
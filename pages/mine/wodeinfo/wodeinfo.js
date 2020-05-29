var e = getApp();

Page({
    data: {
        showModal: 1,
        showModalTel: 1,
        index: 0,
        member: {},
        array: [ "保密", "男", "女" ],
        subobj: {},
        staticurl: getApp().globalData.staticurl
    },
    onLoad: function() {
        this.setData({
            staticurl: getApp().globalData.staticurl
        });
        var e = this, a = wx.getStorageSync("member");
        console.log(a), e.data.subobj.id = a.id, e.data.subobj.avatarUrl = a.face, e.data.subobj.face = a.face, 
        e.data.subobj.nickname = a.nickname, e.data.index = a.sex, e.data.subobj.sex = a.sex, 
        a.sign && "" != a.sign ? e.data.subobj.sign = a.sign : e.data.subobj.sign = "", 
        "" == a.phoneNumber || null == a.phoneNumber ? e.data.subobj.phoneNumber = "" : e.data.subobj.phoneNumber = a.phoneNumber, 
        e.setData({
            subobj: e.data.subobj,
            index: e.data.index,
            member: a
        });
    },
    onShow: function() {},
    showmodal: function(e) {
        var a = this;
        wx.showActionSheet({
            itemList: [ "照片" ],
            itemColor: "#00000",
            success: function(e) {
                e.cancel || a.camera();
            }
        });
    },
    camera: function() {
        var e = this;
        wx.chooseImage({
            count: 1,
            sizeType: [ "original", "compressed" ],
            sourceType: [ "album", "camera" ],
            success: function(a) {
                e.handleres(a);
            }
        });
    },
    handleres: function(e) {
        var a = this;
        e.tempFilePaths ? e.tempFilePaths.forEach(function(o, t, n) {
            a.upImgs(o, t, e.tempFilePaths.length);
        }) : e.size <= 25e6 && a.upImgs(e.tempFilePath, 0, 1);
    },
    upImgs: function(a, o, t) {
        var n = this;
        wx.uploadFile({
            url: e.globalData.baseurl + "/file/upload",
            filePath: a,
            name: "photo",
            header: {
                "content-type": "multipart/form-data"
            },
            formData: null,
            success: function(e) {
                console.log(e);
                var a = JSON.parse(e.data);
                console.log(a.body), console.log(a.body.data.url), n.data.subobj.avatarUrl = a.body.data.url, 
                n.data.subobj.face = a.body.data.url, n.setData({
                    subobj: n.data.subobj
                });
            }
        });
    },
    clickFeedback: function(e) {
        this.setData({
            showModal: 0
        });
    },
    qsrname: function(e) {
        var a = this, o = a.data.subobj;
        o.nickname = e.detail.value, a.setData({
            subobj: o
        });
    },
    bindPickerChange: function(e) {
        console.log(e);
        var a = this;
        a.data.subobj.sex = e.detail.value, a.setData({
            index: e.detail.value,
            subobj: a.data.subobj
        });
    },
    clickTelback: function(e) {
        var a = this;
        a.setData({
            showModalTel: 0,
            phoneNumber: a.data.subobj.phoneNumber
        });
    },
    getPhoneNumber: function(e) {
        var a = this, o = getApp().globalData.logininfo.rawData, t = getApp().globalData.logininfo.signature, n = e.detail.encryptedData, s = e.detail.iv, i = getApp().globalData.logininfo.sessionKey;
        getApp().globalData.logininfo.openid;
        wx.login({
            success: function(e) {
                wx.request({
                    url: getApp().globalData.baseurl + "Wxlogin/phone",
                    data: {
                        code: e.code,
                        rawData: o,
                        signature: t,
                        encryptedData: n,
                        iv: s,
                        sessionKey: i
                    },
                    method: "POST",
                    header: {
                        "content-type": "application/x-www-form-urlencoded",
                        cookie: getApp().globalData.cookie
                    },
                    success: function(e) {
                        console.log(JSON.stringify(e)), 200 == e.statusCode && e.data.phoneNumber && (a.data.subobj.phoneNumber = e.data.phoneNumber, 
                        a.setData({
                            subobj: a.data.subobj
                        }), a.setData({
                            showModalTel: 1
                        }));
                    },
                    fail: function(e) {
                        reject("网络出错");
                    }
                });
            }
        });
    },
    qsrtel: function(e) {
        var a = this, o = a.data.phoneNumber;
        o = e.detail.value.replace(/\s+/g, ""), a.setData({
            phoneNumber: o
        });
    },
    clickTelHidden: function() {
        this.setData({
            showModalTel: 1
        });
    },
    submitTel: function() {
        var e = this, a = e.data.phoneNumber;
        if ("" == a || 11 != a.length) return wx.showToast({
            title: "手机号有误！",
            image: "../../../image/bottomico.png",
            duration: 1500
        }), !1;
        var o = e.data.subobj;
        o.phoneNumber = a, e.setData({
            subobj: o,
            showModalTel: 1
        });
    },
    qsrsign: function(e) {
        console.log(e);
        var a = this;
        "" != e.detail.value || void 0 != e.detail.value || "undefined" != e.detail.value || null != e.detail.value ? a.data.subobj.sign = e.detail.value : a.data.subobj.sign = "请修改个人签名", 
        a.setData({
            subobj: a.data.subobj
        });
    },
    clickSave: function() {
        var a = this;
        console.log(a.data.subobj.nickname.length), a.data.subobj.nickname.length > 5 ? wx.showToast({
            title: "昵称不能超过5个字",
            icon: "none",
            duration: 2e3
        }) : new Promise(function(o, t) {
            var n = {
                phoneNumber: a.data.subobj.phoneNumber,
                oldPhoneNumber: a.data.member.phoneNumber ? a.data.member.phoneNumber : ""
            };
            e.post("/member/why-member/checkPhoneNumber", n, "加载中...").then(function(e) {
                e.success ? e.body.flag ? (wx.showModal({
                    title: "温馨提示",
                    content: "同一手机号仅可认证一个账号，请确认信息是否正确。",
                    showCancel: !1,
                    success: function(e) {
                        e.confirm && console.log("用户点击确定");
                    }
                }), t()) : o() : (wx.showToast({
                    title: "连接失败，请重试",
                    icon: "none",
                    duration: 2e3
                }), t());
            }).catch(function(e) {
                console.log(e);
            });
        }).then(function(o) {
            e.post("/member/why-member/save", a.data.subobj, "加载中...").then(function(e) {
                e.success && (console.log(e), getApp().globalData.member = e.body.member, getApp().globalData.token = e.body.token, 
                wx.setStorageSync("member", e.body.member), wx.setStorageSync("token", e.body.token), 
                wx.switchTab({
                    url: "/pages/mine/mine"
                }));
            }).catch(function(e) {
                console.log(e);
            });
        });
    },
    decode: function(e, a, o) {
        e = atob(e), a = atob(a), console.log(e), console.log(a);
    },
    clickHidden: function() {
        this.setData({
            showModal: 1
        });
    },
    submitorder: function() {
        this.setData({
            subobj: this.data.subobj,
            showModal: 1
        });
    },
    formSubmit: function(a) {
        if (this.data.subobj.nickname.length > 5) wx.showToast({
            title: "昵称不能超过5个字",
            icon: "none",
            duration: 2e3
        }); else {
            console.log("form发生了submit事件，携带数据为：", JSON.stringify(a));
            var o = a.detail.formId, t = wx.getStorageSync("openid");
            e.post("/wxmini/temp/infoFinish", {
                formId: o,
                openid: t,
                keyword1: "进行了用户信息修改操作",
                keyword2: "修改成功"
            }, "加载中...").then(function(e) {
                e.success && console.log(JSON.stringify(e));
            }).catch(function(e) {
                console.log(e);
            });
        }
    },
    formReset: function() {
        console.log("form发生了reset事件");
    }
});
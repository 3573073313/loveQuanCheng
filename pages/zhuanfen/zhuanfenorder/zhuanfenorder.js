var t = getApp(), e = (require("../../../utils/util.js"), require("../../../html-view/index")), a = new (require("../../../utils/qqmap-wx-jssdk.js"))({
    key: "P26BZ-IRUK4-ZW5UP-XPMQL-F54SQ-3HBDW"
});

Page({
    data: {
        login: !1,
        isDefault: !0,
        member: {},
        indicatorDots: !0,
        vertical: !1,
        autoplay: !0,
        interval: 3e3,
        duration: 1200,
        activeColor: "#C31926",
        currentTab: 0,
        swipers: [ {
            url: getApp().globalData.staticurl + "index_swiper01.png",
            type: "演出"
        } ],
        staticurl: getApp().globalData.staticurl,
        imgStar: getApp().globalData.staticurl + "iconCollectNew.png",
        imgStarselect: getApp().globalData.staticurl + "iconCollectFill.png",
        imgCalendar: getApp().globalData.staticurl + "iconDateNN.png",
        imgTime: getApp().globalData.staticurl + "iconActiveTime@3x.png",
        imgAddr: getApp().globalData.staticurl + "iconAddressNN.png",
        imgNum: getApp().globalData.staticurl + "zf_num.png",
        imgTel: getApp().globalData.staticurl + "iconTelNN.png",
        imgRoom: getApp().globalData.staticurl + "iconActiveAddress@3x.png",
        id: "",
        activity: {},
        info: {},
        notice: {},
        isFavourite: !1,
        latitude: 34.22259,
        longitude: 108.94878,
        isSnapAct: !1,
        actTotalVotes: 0,
        showModal: 1,
        modalCode: 0,
        modalSecond: "60秒后...",
        subobj: {}
    },
    clickCode: function(t) {
        var e = this;
        e.setData({
            modalCode: 1
        }), e.sendmsg();
    },
    countTime: function() {
        var t = 60, e = this, a = setInterval(function() {
            if (0 == --t) return e.setData({
                modalCode: 0
            }), t = 60, e.setData({
                modalSecond: t + "秒后..."
            }), void clearInterval(a);
            e.setData({
                modalSecond: t + "秒后..."
            });
        }, 1e3);
    },
    sendmsg: function() {
        var e = this, a = {
            mobile: e.data.phone,
            codeType: "ServerOrder"
        };
        t.post("/msg/confirmOrderSendCode", a, "发送中...").then(function(t) {
            t.success ? wx.showToast({
                title: t.msg,
                icon: "success",
                duration: 2e3
            }) : wx.showToast({
                title: t.msg,
                icon: "none",
                duration: 2e3
            }), e.countTime();
        }).catch(function(t) {
            console.log(t);
        });
    },
    lxrcode: function(t) {
        this.data.subobj.code = t.detail.value, this.setData({
            subobj: this.data.subobj
        });
    },
    gbmodal: function() {
        this.setData({
            showModal: 1
        });
    },
    submitorder: function() {
        var e = this;
        if (e.data.subobj.code) if (6 == e.data.subobj.code.length) {
            var a = {};
            a.activityId = e.data.activity.id, a.smsCode = e.data.subobj.code, a.memberId = e.data.member.id, 
            a.activityType = "2", t.postJSON("JnUnderlineActivityOrder/save", a, "提交订单中...").then(function(t) {
                t.success ? wx.redirectTo({
                    url: "/pages/mine/activityorder/activityorder"
                }) : wx.showToast({
                    title: t.msg,
                    icon: "none",
                    duration: 2e3
                });
            }).catch(function(t) {
                console.log(t);
            });
        } else wx.showToast({
            title: "验证码长度有误！",
            icon: "none",
            duration: 1500
        }); else wx.showToast({
            title: "请输入验证码",
            icon: "none",
            duration: 2e3
        });
    },
    onLoad: function(t) {
        var e = this, a = t.id;
        console.log("options---", t), e.setData({
            id: a,
            isSnapAct: !(!t.type || 2 != t.type),
            contribute: !!t.contribute,
            isType: t.type,
            toQuestion: !!t.toQuestion,
            expireNum: parseInt(t.expireNum)
        });
    },
    onShow: function() {
        var t = this;
        t.watchBack(), 1 !== t.data.isType ? t.getactivity() : t.getMylocation();
    },
    getMylocation: function() {
        var t = this;
        a.reverseGeocoder({
            success: function(e) {
                var e = e.result;
                t.setData({
                    latitude: e.location.lat,
                    longitude: e.location.lng,
                    address: e.address + e.formatted_addresses.recommend
                }), t.getactivity();
            },
            fail: function(t) {
                console.error(t);
            },
            complete: function(t) {}
        });
    },
    getactivity: function() {
        var a = this, i = {
            id: a.data.id
        }, o = "";
        console.log("parseInt(that.data.isType---", parseInt(a.data.isType));
        var n = a.data.isType ? a.data.isType : 1;
        switch (parseInt(n)) {
          case 1:
            o = "/JnActivityManagement", i.latitude = a.data.latitude, i.longitude = a.data.longitude;
            break;

          case 2:
            o = "JnOnlineActivity";
            break;

          case 3:
            o = "JnUnderlineRecruitActivity";
            break;

          case 4:
            o = "JnUnderlineActivity";
        }
        t.post(o + "/get", i, "加载中...").then(function(t) {
            if (t) {
                var i = t.body.data;
                if (i) {
                    if (i.juli) {
                        var o = i.juli;
                        i.juli = 1e3 < o ? parseFloat((parseInt(o) / 1e3).toFixed(2)) + "KM" : o + "M";
                    }
                    var n = i.info ? i.info : i.details ? i.details : i.conditions, s = i.notice ? i.notice : i.activityRule ? i.activityRule : i.note ? i.note : i.notes, c = new e(n).nodes, d = new e(s).nodes, r = (i.listImg ? i.listImg : i.activityImg ? i.activityImg : i.actDetailImg).split(",");
                    console.log("data.activityName---", i.activityName), i.expireNum = a.data.expireNum ? a.data.expireNum : i.expireNum, 
                    a.setData({
                        activity: i,
                        info: c,
                        notice: d,
                        swipers: r
                    }), a.getFavourite(), "1" == a.data.activity.isLimit && a.getByActIdTotalVotes();
                } else wx.showModal({
                    title: "提示",
                    content: "该活动已被删除",
                    showCancel: !1,
                    success: function(t) {
                        t.confirm && wx.navigateBack({
                            delta: 1
                        });
                    }
                });
            }
        }).catch(function(t) {
            console.log(t);
        });
    },
    getSnapAct: function() {
        var a = this, i = {
            id: a.data.id
        };
        t.post("JnOnlineActivity/get", i, "加载中...").then(function(t) {
            if (t) {
                var i = t.body.data;
                if (i) {
                    var o = new e(t.body.data.details).nodes, n = new e(t.body.data.activityRule).nodes, s = (i.listImg ? i.listImg : i.activityImg).split(",");
                    a.setData({
                        activity: i,
                        info: o,
                        notice: n,
                        swipers: s
                    }), a.getFavourite();
                }
            }
        }).catch(function(t) {
            console.log(t);
        });
    },
    watchBack: function() {
        var e = this, a = t.getMember();
        a && "" != a ? (e.data.isDefault = !1, e.setData({
            isDefault: !1,
            member: a
        })) : (e.data.isDefault = !0, e.setData({
            isDefault: !0
        }));
    },
    clickTab: function(t) {
        var e = this, a = t.currentTarget.dataset.current;
        e.setData({
            currentTab: a
        });
    },
    getFavourite: function() {
        var e = this, a = {
            memberId: e.data.member.id,
            contentId: e.data.id
        };
        t.post("/WhyMemberFavourite/getByMemberId", a, "加载中...").then(function(t) {
            t.success && (console.log(t), null != t.body.data && t.body.data.length > 0 ? e.setData({
                isFavourite: !0
            }) : e.setData({
                isFavourite: !1
            }));
        }).catch(function(t) {
            console.log(t);
        });
    },
    doFavourite: function() {
        var e = this, a = e.data.activity, i = {
            memberId: e.data.member.id,
            contentId: e.data.id,
            contentType: 1,
            img: a.activityCover ? a.activityCover : a.activityImg,
            contentName: e.data.isSnapAct ? a.activityName : a.actName
        };
        e.data.isSnapAct && (e.data.contribute ? i.type = 5 : i.type = 2), t.post("/WhyMemberFavourite/save", i, "加载中...").then(function(t) {
            t.success && e.getFavourite();
        }).catch(function(t) {
            console.log(t);
        });
    },
    openmap: function() {
        var t = this;
        wx.openLocation({
            latitude: t.data.activity.latitude / 1e6,
            longitude: t.data.activity.longitude / 1e6,
            name: t.data.activity.actName,
            address: t.data.activity.address
        });
    },
    getcountbydate: function(e) {
        var a = this, i = {
            activityid: a.data.activity.id
        };
        t.post("/activity/why-activity-order/countbydate", i, "获取预订数量中...").then(function(t) {
            var i = e - t.body.data;
            i < 0 && (i = 0), a.setData({
                surplus: i
            });
        }).catch(function(t) {
            console.log(t);
        });
    },
    dateFormat: function(t, e) {
        var a = void 0, i = {
            "Y+": e.getFullYear().toString(),
            "m+": (e.getMonth() + 1).toString(),
            "d+": e.getDate().toString(),
            "H+": e.getHours().toString(),
            "M+": e.getMinutes().toString(),
            "S+": e.getSeconds().toString()
        };
        for (var o in i) (a = new RegExp("(" + o + ")").exec(t)) && (t = t.replace(a[1], 1 == a[1].length ? i[o] : i[o].padStart(a[1].length, "0")));
        return t;
    },
    onConfirm: function(e) {
        var a = this;
        console.log(e), console.log("onConfirm:" + JSON.stringify(e)), t.onGotUserInfo(e.detail.detail, function() {
            var e = wx.getStorageSync("member");
            t.setUseTime(), console.log("callback:" + JSON.stringify(e)), a.setData({
                member: e,
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
    reserveActive: function() {
        var e = this, a = e.data.activity;
        if (e.data.isDefault) e.setData({
            login: !0
        }); else if (e.data.member && "" != e.data.member) if (2 == t.globalData.member.authStatus) {
            var i = e.data.isType, o = "";
            if (2 == i) o = "2" == a.type ? "/" + a.activityLink + "?id=" + a.itemTestId + "&activityId=" + a.id : "3" == a.type ? "/" + a.activityLink + "?activityId=" + a.id : "/pages/index/indexsnap/addsnap/addsnap?infoTitle=" + a.activityName + "&score=" + a.score + "&id=" + a.id + "&typeId=" + a.itemTypeId + "&info=" + JSON.stringify(e.data.info) + (e.data.contribute ? "&contribute=1" : ""); else if (i && 1 != i) {
                if (4 == i) return void e.setData({
                    showModal: 0,
                    phone: e.data.member.phoneNumber
                });
                t.post("/JnUnderlineActivityOrder/getByMemberId", {
                    activityId: a.id,
                    memberId: e.data.member.id
                }).then(function(t) {
                    t.body.data > 0 ? wx.showModal({
                        title: "提示",
                        content: "您已经参加过此招募活动",
                        showCancel: !1
                    }) : o = "/pages/index/indexsnap/recruitForm/recruitForm?id=" + a.id, wx.navigateTo({
                        url: o
                    });
                }).catch(function(t) {
                    console.log(t);
                });
            } else o = "/pages/zhuanfen/zhuanfensuborder/zhuanfensuborder?id=" + a.id + "&isType=" + (i || 1);
            "" != o && wx.navigateTo({
                url: o
            });
        } else e.setData({
            showModalAuth: !0
        });
    },
    confirm: function() {
        wx.navigateTo({
            url: "/pages/mine/woderealname/woderealname"
        });
    },
    lookImgSwiper: function(t) {
        var e = this, a = t.currentTarget.dataset.item, i = e.data.swipers;
        e.lookImgFuc(a, i);
    },
    lookImgFuc: function(t, e) {
        wx.previewImage({
            current: t,
            urls: e
        });
    },
    getByActIdTotalVotes: function() {
        var e = this, a = {
            id: e.data.id
        };
        t.post("/JnActivityManagement/getByActIdTotalVotes", a, "加载中...").then(function(t) {
            if (t) {
                var a = t.body.data;
                e.setData({
                    actTotalVotes: a
                }), e.getcountbydate(a);
            }
        }).catch(function(t) {
            console.log(t);
        });
    }
});
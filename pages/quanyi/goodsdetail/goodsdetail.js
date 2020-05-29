var t = require("../../../html-view/index"), a = getApp();

Page({
    data: {
        isShowModal: !1,
        isShowModal3: !1,
        login: !1,
        isDefault: !0,
        member: {},
        indicatorDots: !0,
        vertical: !1,
        autoplay: !0,
        interval: 3e3,
        duration: 1200,
        activeColor: "#C31926",
        goodsId: "",
        currentTab: 0,
        goods: {},
        swipers: [],
        staticurl: getApp().globalData.staticurl,
        imgStar: getApp().globalData.staticurl + "iconCollectNew.png",
        imgStarselect: getApp().globalData.staticurl + "iconCollectFill.png",
        imgCalendar: getApp().globalData.staticurl + "zf_calendar.png",
        imgTime: getApp().globalData.staticurl + "zf_time.png",
        imgAddr: getApp().globalData.staticurl + "zf_addr.png",
        imgNum: getApp().globalData.staticurl + "zf_num.png",
        imgTel: getApp().globalData.staticurl + "zf_tel.png",
        imgMinus: getApp().globalData.staticurl + "zf_minus.png",
        imgAdd: getApp().globalData.staticurl + "zf_add.png",
        showModal: 1,
        subobj: {
            num: 1
        },
        specs: [],
        spec: {},
        isFavourite: !1,
        isHasDoods: !1
    },
    onConfirm: function(t) {
        var e = this;
        console.log(t), console.log("onConfirm:" + JSON.stringify(t)), a.onGotUserInfo(t.detail.detail, function() {
            var t = wx.getStorageSync("member");
            a.setUseTime(), console.log("callback:" + JSON.stringify(t)), e.setData({
                member: t,
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
    cancleAuth: function() {
        this.setData({
            isShowModal3: !1
        });
    },
    toAuthentication: function() {
        wx.navigateTo({
            url: "/pages/mine/woderealname/woderealname"
        }), this.setData({
            isShowModal3: !1
        });
    },
    isHasMoney: function() {
        var t = this;
        if (t.data.isDefault) t.setData({
            login: !0
        }); else {
            var a = wx.getStorageSync("scoreInfo"), e = t.data.spec;
            a.yue < e.integral ? wx.showToast({
                title: "剩余豆不足",
                icon: "none"
            }) : 1 == t.data.member.authStatus ? t.setData({
                isShowModal3: !0
            }) : t.clickChange();
        }
    },
    commitOrder: function() {
        var t = this;
        console.log("that.data.goods---", t.data.goods);
        var e = {
            goodsId: t.data.goods.id,
            memberId: t.data.member.id,
            deliveryMode: "2",
            specId: t.data.spec.id
        };
        a.postJSON("/goodsOrder/save", e, "加载中...").then(function(a) {
            a.success ? wx.redirectTo({
                url: "/pages/mine/exchangeorder/exchangeorder?current=3"
            }) : (wx.showToast({
                title: a.msg,
                icon: "none",
                duration: 2e3
            }), t.setData({
                isShowModal: !1
            }));
        }).catch(function(t) {
            console.log(t);
        });
    },
    delCancle: function() {
        var t = this, a = t.data.isShowModal;
        t.setData({
            isShowModal: !a
        });
    },
    lookImg: function(t) {
        console.log(t);
        var a = t.currentTarget.dataset.src;
        wx.previewImage({
            current: a,
            urls: [ a ],
            complete: function(t) {}
        });
    },
    lookImgSwiper: function(t) {
        var a = this, e = t.currentTarget.dataset.item, o = a.data.swipers;
        a.lookImgFuc(e, o);
    },
    lookImgFuc: function(t, a) {
        wx.previewImage({
            current: t,
            urls: a
        });
    },
    getCardList: function() {
        var t = this, e = {
            memberId: t.data.member.id
        };
        a.post("/goodsCart/list", e, "加载中...").then(function(a) {
            if (a && a.success) {
                var e = !!a.body.page.records.length;
                t.setData({
                    isHasDoods: e
                });
            }
        }).catch(function(t) {
            console.log(t);
        });
    },
    onLoad: function(t) {
        console.log(t);
        var a = this;
        a.getGoodsDetails(t.id), a.getGoodsspec(t.id);
    },
    onShow: function() {
        this.watchBack();
    },
    watchBack: function() {
        var t = this, e = a.getMember();
        e && "" != e ? (t.data.isDefault = !1, t.setData({
            isDefault: !1,
            member: e
        }), t.getCardList()) : (t.data.isDefault = !0, t.setData({
            isDefault: !0
        }));
    },
    getGoodsDetails: function(e) {
        var o = this;
        a.post("/goods_management/get", {
            id: e
        }, "加载中...").then(function(a) {
            if (a && a.success) {
                var e = a.body.data.listImg, s = [];
                a.body.data.detailsImg && (s = a.body.data.detailsImg.split(",")), s.unshift(e), 
                a.body.data.details = new t(a.body.data.details).nodes, a.body.data.merchantInfo = new t(a.body.data.merchantInfo).nodes, 
                a.body.data.instructions = new t(a.body.data.instructions).nodes, o.setData({
                    goods: a.body.data,
                    swipers: s
                }), console.log("goods.auditStatus--", a.body.data.auditStatus), o.getFavourite();
            }
        }).catch(function(t) {
            console.log(t);
        });
    },
    getGoodsspec: function(t) {
        var e = this, o = {
            goodsId: t,
            pageNo: 1,
            pageSize: 10
        };
        a.post("/JnGoodsSpec/list", o, "加载中...").then(function(t) {
            if (t && t.success) {
                var a = t.body.page.records;
                a.forEach(function(t, a, e) {
                    t.specName = t.specName.replace(/\s*/g, "");
                }), e.setData({
                    specs: a,
                    spec: t.body.page.records[0]
                });
            }
        }).catch(function(t) {
            console.log(t);
        });
    },
    clickSpec: function(t) {
        var a = this;
        console.log(t), a.setData({
            spec: t.currentTarget.dataset.item
        });
    },
    clickTab: function(t) {
        var a = this;
        if (this.data.currentTab === t.target.dataset.current) return !1;
        a.setData({
            currentTab: t.target.dataset.current
        });
    },
    addCart: function() {
        var t = this;
        if (t.data.isDefault) t.setData({
            login: !0
        }); else {
            var e = {
                memberId: t.data.member.id,
                goodsId: t.data.goods.id,
                specId: t.data.spec.id
            };
            a.post("/goodsCart/addCart", e, "加载中...").then(function(a) {
                a && a.success && (t.setData({
                    showModal: 1
                }), wx.navigateTo({
                    url: "../cart/cart"
                }));
            }).catch(function(t) {
                console.log(t);
            });
        }
    },
    clickChange: function() {
        this.setData({
            showModal: 0
        });
    },
    clickClose: function() {
        this.setData({
            showModal: 1
        });
    },
    numjian: function() {
        if (1 == this.data.subobj.num) return !1;
        this.data.subobj.num = this.data.subobj.num - 1, this.setData({
            subobj: this.data.subobj
        });
    },
    numjia: function() {
        var t = this.data.subobj.num;
        if (t == this.data.surplus) return !1;
        this.data.subobj.num = t + 1, this.setData({
            subobj: this.data.subobj
        });
    },
    getFavourite: function() {
        var t = this, e = {
            memberId: t.data.member.id,
            contentId: t.data.goods.id
        };
        a.post("/WhyMemberFavourite/getByMemberId", e, "加载中...").then(function(a) {
            a.success && (console.log(a), null != a.body.data && a.body.data.length > 0 ? t.setData({
                isFavourite: !0
            }) : t.setData({
                isFavourite: !1
            }));
        }).catch(function(t) {
            console.log(t);
        });
    },
    doFavourite: function() {
        var t = this;
        if (t.data.isDefault) t.setData({
            login: !0
        }); else {
            var e = t.data.goods.listImg, o = e.indexOf(",") > 0 ? e.split(",")[0] : e, s = {
                memberId: t.data.member.id,
                contentId: t.data.goods.id,
                contentType: 2,
                img: o,
                contentName: t.data.goods.goodsName
            };
            a.post("/WhyMemberFavourite/save", s, "加载中...").then(function(a) {
                a.success && t.getFavourite();
            }).catch(function(t) {
                console.log(t);
            });
        }
    }
});
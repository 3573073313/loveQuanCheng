function t(t, a, e) {
    return a in t ? Object.defineProperty(t, a, {
        value: e,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[a] = e, t;
}

var a, e = getApp(), r = require("../../../utils/util");

Page({
    data: (a = {
        login: !1,
        isDefault: !0,
        isShowModal3: !1,
        member: {},
        isShowModal: !1,
        wayArray: [ "线下自提" ],
        wayIndex: 0,
        staticurl: getApp().globalData.staticurl,
        imgMinus: getApp().globalData.staticurl + "zf_minus.png",
        imgAdd: getApp().globalData.staticurl + "zf_add.png",
        subobj: {
            num: 1
        }
    }, t(a, "imgMinus", getApp().globalData.staticurl + "zf_minus.png"), t(a, "imgAdd", getApp().globalData.staticurl + "zf_add.png"), 
    t(a, "cartList", []), t(a, "totalScore", 0), t(a, "selectCartList", []), t(a, "allSelect", !0), 
    t(a, "scoreInfo", ""), a),
    bindPickerChange: function(t) {
        console.log(t.detail.value), this.setData({
            wayIndex: t.detail.value
        });
    },
    watchBack: function() {
        var t = this, a = e.getMember();
        console.log("memeber"), a && "" != a ? t.setData({
            isDefault: !1,
            member: a
        }) : (t.data.isDefault = !0, t.setData({
            isDefault: !0
        }));
    },
    onLoad: function() {
        this.getCardList(!0);
    },
    onShow: function() {
        this.watchBack(), this.getScoreInfo();
    },
    numjian: function(t) {
        var a = this, e = t.target.dataset.item;
        a.deleteCart(e.id);
    },
    addCart: function(t, a) {
        var r = this, o = wx.getStorageSync("member");
        console.log(o);
        var s = {
            memberId: o.id,
            goodsId: t,
            specId: a
        };
        e.post("/goodsCart/addCart", s, "加载中...").then(function(t) {
            t && t.success && r.getCardList();
        }).catch(function(t) {
            console.log(t);
        });
    },
    deleteCart: function(t) {
        var a = this, r = {
            memberId: wx.getStorageSync("member").id,
            id: t
        };
        e.post("/goodsCart/deleteCart", r, "加载中...").then(function(t) {
            t && t.success && a.getCardList();
        }).catch(function(t) {
            console.log(t);
        });
    },
    getCardList: function(t) {
        var a = this, o = {
            memberId: wx.getStorageSync("member").id
        };
        e.post("/goodsCart/list", o, "加载中...").then(function(e) {
            if (e && e.success) {
                var o = e.body.page.records;
                if (t) {
                    if (a.data.selectCartList.length <= 0) a.data.selectCartList = r.copy(o); else {
                        var s = !0, l = !1, i = void 0;
                        try {
                            for (var c, n = o[Symbol.iterator](); !(s = (c = n.next()).done); s = !0) {
                                var d = c.value;
                                a.hasSelect(d);
                            }
                        } catch (t) {
                            l = !0, i = t;
                        } finally {
                            try {
                                !s && n.return && n.return();
                            } finally {
                                if (l) throw i;
                            }
                        }
                    }
                    a.setData({
                        selectCartList: a.data.selectCartList,
                        allSelect: !!o.length
                    });
                }
                var u = !0, f = !1, g = void 0;
                try {
                    for (var h, m = o[Symbol.iterator](); !(u = (h = m.next()).done); u = !0) {
                        var S = h.value;
                        S.select = a.hasSelect(S);
                    }
                } catch (t) {
                    f = !0, g = t;
                } finally {
                    try {
                        !u && m.return && m.return();
                    } finally {
                        if (f) throw g;
                    }
                }
                console.log("wayArray   carList---", JSON.stringify(o)), a.setData({
                    cartList: o,
                    totalScore: a.computeScore()
                }), a.removeSelect();
            }
        }).catch(function(t) {
            console.log(t);
        });
    },
    computeScore: function() {
        var t = this, a = 0, e = !0, r = !1, o = void 0;
        try {
            for (var s, l = t.data.selectCartList[Symbol.iterator](); !(e = (s = l.next()).done); e = !0) {
                var i = s.value;
                a += i.integral * i.goodsAmount;
            }
        } catch (t) {
            r = !0, o = t;
        } finally {
            try {
                !e && l.return && l.return();
            } finally {
                if (r) throw o;
            }
        }
        return a;
    },
    numjia: function(t) {
        var a = this, e = t.target.dataset.item;
        a.addCart(e.goodsId, e.specId);
    },
    hasSelect: function(t) {
        for (var a = this, e = !1, o = 0; o < a.data.selectCartList.length; o++) if (a.data.selectCartList[o].id == t.id) {
            a.data.selectCartList[o] = r.copy(t), e = !0;
            break;
        }
        return e;
    },
    selectItem: function(t) {
        var a = this, e = t.currentTarget.dataset.index, r = t.currentTarget.dataset.item;
        if (a.hasSelect(r)) {
            a.data.cartList[e].select = !1;
            for (var o = 0; a.data.selectCartList.length > o; o++) a.data.selectCartList[o].id == r.id && a.data.selectCartList.splice(o, 1);
        } else a.data.cartList[e].select = !0, a.data.selectCartList.push(a.data.cartList[e]);
        var s = a.data.allSelect;
        s = !!a.data.selectCartList.length && a.data.allSelect, s = a.data.selectCartList.length == a.data.cartList.length && 0 !== a.data.cartList.length || s, 
        a.setData({
            cartList: a.data.cartList,
            selectCartList: a.data.selectCartList,
            allSelect: s,
            totalScore: a.computeScore()
        });
    },
    allBtn: function() {
        var t = this;
        t.data.allSelect ? (t.data.allSelect = !1, t.remveAll(), t.setData({
            allSelect: t.data.allSelect
        })) : (t.data.allSelect = !0, t.addAll(), t.setData({
            allSelect: t.data.allSelect
        }));
    },
    addAll: function() {
        var t = this, a = !0, e = !1, o = void 0;
        try {
            for (var s, l = t.data.cartList[Symbol.iterator](); !(a = (s = l.next()).done); a = !0) s.value.select = !0;
        } catch (t) {
            e = !0, o = t;
        } finally {
            try {
                !a && l.return && l.return();
            } finally {
                if (e) throw o;
            }
        }
        t.data.selectCartList = r.copy(t.data.cartList), t.setData({
            cartList: t.data.cartList,
            selectCartList: t.data.selectCartList,
            totalScore: t.computeScore()
        });
    },
    remveAll: function() {
        var t = this, a = !0, e = !1, r = void 0;
        try {
            for (var o, s = t.data.cartList[Symbol.iterator](); !(a = (o = s.next()).done); a = !0) o.value.select = !1;
        } catch (t) {
            e = !0, r = t;
        } finally {
            try {
                !a && s.return && s.return();
            } finally {
                if (e) throw r;
            }
        }
        t.data.selectCartList = [], t.setData({
            cartList: t.data.cartList,
            selectCartList: t.data.selectCartList,
            totalScore: t.computeScore()
        });
    },
    removeSelect: function() {
        for (var t = this, a = 0; t.data.selectCartList.length > a; a++) {
            var e = !0, r = !0, o = !1, s = void 0;
            try {
                for (var l, i = t.data.cartList[Symbol.iterator](); !(r = (l = i.next()).done); r = !0) if (l.value.id == t.data.selectCartList[a].id) {
                    e = !1;
                    break;
                }
            } catch (t) {
                o = !0, s = t;
            } finally {
                try {
                    !r && i.return && i.return();
                } finally {
                    if (o) throw s;
                }
            }
            e && t.data.selectCartList.splice(a, 1);
        }
        t.setData({
            selectCartList: t.data.selectCartList
        }), t.setData({
            totalScore: t.computeScore()
        });
    },
    getScoreInfo: function() {
        var t = this, a = {};
        e.post("/JnInventoryQuery/get", a, "加载中...").then(function(a) {
            a && (a.body.data.yue = parseInt(a.body.data.allScore) - parseInt(a.body.data.allUse), 
            t.data.scoreInfo = a.body.data, t.setData({
                scoreInfo: t.data.scoreInfo
            }));
        }).catch(function(t) {
            console.log(t);
        });
    },
    delCancle: function() {
        this.setData({
            isShowModal: !1
        });
    },
    onConfirm: function(t) {
        var a = this;
        console.log(t), console.log("onConfirm:" + JSON.stringify(t)), e.onGotUserInfo(t.detail.detail, function() {
            var t = wx.getStorageSync("member");
            e.setUseTime(), console.log("callback:" + JSON.stringify(t)), a.setData({
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
    commitOrder: function() {
        var t = this;
        t.data.isDefault ? t.setData({
            login: !0
        }) : (console.log("totalScore---", t.data.totalScore, "-yue--", t.data.scoreInfo.yue), 
        t.data.totalScore > t.data.scoreInfo.yue ? wx.showToast({
            title: "剩余豆不足",
            icon: "none",
            duration: 2e3
        }) : 1 == t.data.member.authStatus ? t.setData({
            isShowModal3: !0
        }) : 0 == parseInt(t.data.wayIndex) ? t.setData({
            isShowModal: !0
        }) : wx.redirectTo({
            url: "/pages/quanyi/fillorder/fillorder?selectCartList=" + JSON.stringify(t.data.selectCartList) + "&totalScore=" + t.data.totalScore
        }));
    },
    commitOrderSure: function() {
        var t = this;
        console.log("that.data.selectCartList---", t.data.selectCartList);
        var a = {
            cartIdList: t.data.selectCartList,
            memberId: wx.getStorageSync("member").id,
            deliveryMode: 2
        };
        console.log("params--", a), e.postJSON("/goodsOrder/save", JSON.stringify(a), "加载中...").then(function(a) {
            a.success ? (console.log("res---", a), wx.redirectTo({
                url: "/pages/mine/exchangeorder/exchangeorder"
            })) : (wx.showToast({
                title: a.msg,
                icon: "none",
                duration: 2e3
            }), t.setData({
                isShowModal: !1
            }));
        }).catch(function(t) {
            console.log(t);
        });
    }
});
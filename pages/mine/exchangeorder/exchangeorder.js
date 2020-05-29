var t = function(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}(require("../../../utils/weapp-qrcode.js")), e = getApp();

Page({
    data: {
        orderstatedict: [],
        currentTab: 0,
        staticurl: getApp().globalData.staticurl,
        obj: {
            pageNo: 1,
            pageSize: 10,
            memberId: wx.getStorageInfoSync("member").id,
            orderStatus: "ALL"
        },
        pages: 1,
        pageNo: 1,
        orderList: [],
        list: [],
        isGetList: !1,
        activesLen: !1,
        hasMore: !0,
        loadMore: !0,
        showModal: 1,
        delobj: {},
        allCount: 0,
        isShowQrCode: !1,
        isBot: !1,
        showItem: {}
    },
    onLoad: function(t) {
        this.setData({
            currentTab: parseInt(t.current)
        }), console.log("currentTab----", parseInt(t.current));
    },
    onShow: function() {
        var t = this;
        if (!this.data.member) {
            var a = "";
            setTimeout(function() {
                (a = e.getMember()) && "" != a ? (t.data.isDefault = !1, t.data.obj.memberId = a.id, 
                t.data.delobj.memberId = a.id, t.setData({
                    isDefault: !1,
                    member: a,
                    obj: t.data.obj,
                    delobj: t.data.delobj
                }), t.getOrderList()) : (t.data.isDefault = !0, t.setData({
                    isDefault: !0
                }));
            }, 500);
        }
        t.getTypeList();
    },
    onPullDownRefresh: function(t) {
        var e = this, a = e.data.obj;
        a.pageNo = 1, e.setData({
            obj: a
        }), console.log("刷新--"), e.getOrderList(), e.getScoreOrderStateNumber();
    },
    onReachBottom: function() {
        var t = this;
        console.log("触底了--");
        var e = t.data.obj;
        t.data.pages > e.pageNo ? (e.pageNo += 1, t.setData({
            obj: e,
            isBot: !0
        }), t.getOrderList()) : wx.showToast({
            title: "没有更多了",
            icon: "none",
            duration: 2e3
        });
    },
    getQrCode: function(e) {
        var a = this, o = e.currentTarget.dataset.item, r = !a.data.isShowQrCode;
        r && new t.default("myQrcode", {
            text: "Q:" + o.id + ":" + o.pickCode,
            width: 200,
            height: 200,
            padding: 12,
            correctLevel: t.default.CorrectLevel.L,
            callback: function(t) {
                console.log(t.path);
            }
        }), a.setData({
            isShowQrCode: r,
            showItem: o
        });
    },
    logisticsDetail: function(t) {
        var e = t.currentTarget.dataset.id;
        wx.navigateTo({
            url: "logisticsDetail/logisticsDetail?id=" + e
        });
    },
    getGoods: function(t) {
        var a = this, o = t.currentTarget.dataset;
        e.post("goodsOrder/update", o).then(function(t) {
            if (t.success) {
                console.log("收货成功--", a.data.obj);
                var e = a.data.obj;
                e.pageNo = 1, a.setData({
                    obj: e
                }), a.getScoreOrderStateNumber(), a.getOrderList();
            }
        }).catch(function(t) {
            console.log(t.errMsg);
        });
    },
    clickTab: function(t) {
        var e = this, a = t.target.dataset.current;
        if (void 0 != a) return parseInt(e.data.currentTab) !== parseInt(a) && (e.data.orderlist = [], 
        e.data.obj.pageNo = 1, e.setData({
            currentTab: parseInt(a)
        }), void e.getOrderList());
    },
    getTypeList: function(t) {
        var e = this;
        wx.getStorageSync("orderdict") ? (e.setData({
            orderstatedict: wx.getStorageSync("orderdict")
        }), e.getScoreOrderStateNumber()) : e.getorderstatedict();
    },
    getorderstatedict: function() {
        var t = this;
        e.post("/dict/sys-dict/list", {
            type: "order_status"
        }, "加载中...").then(function(e) {
            wx.setStorageSync("orderdict", e.body.data), t.setData({
                orderstatedict: e.body.data
            }), t.getScoreOrderStateNumber();
        }).catch(function(t) {});
    },
    getOrderList: function() {
        wx.stopPullDownRefresh();
        var t = this;
        console.log("订单", t.data.orderstatedict);
        var a = parseInt(t.data.currentTab), o = t.data.obj;
        a ? o.orderStatus = t.data.orderstatedict[a - 1].value : (a = 0, o.orderStatus = "0"), 
        console.log("obj.orderStatus---", o.orderStatus), e.post("/goodsOrder/list", o, "加载中...").then(function(e) {
            if (e) {
                console.log(e);
                var o = e.body.page.records, r = t.data.orderstatedict, s = t.data.orderList, d = parseInt(e.body.page.pages);
                if (o.forEach(function(t, e, a) {
                    r.forEach(function(e, a, o) {
                        e.value == t.orderStatus && (t.stateString = e.label, console.log(t.stateString));
                    });
                }), 0 !== a) {
                    var i = [];
                    o.forEach(function(t) {
                        a == parseInt(t.orderStatus) && i.push(t);
                    }), o = i;
                }
                var n = t.data.isBot;
                t.data.isBot && (o.forEach(function(t) {
                    s.push(t);
                }), o = s, n = !1), t.setData({
                    orderList: o,
                    isGetList: !0,
                    pages: d,
                    isBot: n
                });
            }
        }).catch(function(t) {
            console.log(t);
        });
    },
    getScoreOrderStateNumber: function() {
        var t = this;
        e.post("/goodsOrder/getGoodsOrderStateNumber", {
            memberId: wx.getStorageSync("member").id
        }).then(function(e) {
            t.setData({
                orderStatusList: e.body.data
            }), wx.hideLoading();
        }).catch(function(t) {
            wx.hideLoading();
        });
    },
    showModal: function(t) {
        var e = this, a = t.currentTarget.dataset.id;
        e.setData({
            showModal: 0,
            idOrder: a
        });
    },
    gbmodal: function() {
        this.setData({
            showModal: 1
        });
    },
    clickDel: function(t) {
        console.log("删除订单");
        var a = this, o = a.data.idOrder;
        a.data.delobj.id = o, a.setData({
            delobj: a.data.delobj
        }), e.post("/goodsOrder/delete", a.data.delobj, "加载中...").then(function(t) {
            t && (console.log(t), a.data.obj.pageNo = 1, a.setData({
                activesLen: !1,
                hasMore: !0,
                loadMore: !0,
                showModal: 1,
                orderList: [],
                obj: a.data.obj,
                showModalHd: 1
            }), a.getOrderList());
        }).catch(function(t) {
            console.log(t);
        });
    }
});
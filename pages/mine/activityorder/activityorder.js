var t = function(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}(require("../../../utils/weapp-qrcode.js")), e = getApp();

Page({
    data: {
        currentTab: "",
        page: {
            pageSize: 20,
            pageNo: 1
        },
        orderlist: [],
        orderstatedict: [],
        hasMore: !0,
        loadMore: !0,
        showModalHd: 1,
        showModalWF: 1,
        activesLen: !1,
        activityOrderStatusList: [],
        countMemberAllOrderNum: 0
    },
    toOrderDetail: function(t) {
        var e = t.currentTarget.dataset.item, a = e.id, r = e.activityType, o = "";
        1 == r ? JSON.parse(e.orderDetail.filedText).length ? o = "/pages/index/indexsnap/recruitForm/recruitForm?isOrder=1&id=" + a + "&result=" + e.orderDetail.filedText : wx.showToast({
            title: "该订单未填写详细信息",
            icon: "none",
            duration: 2e3
        }) : 2 != r && (o = "/pages/mine/activityorder/actorderdetails/wodeactorder?id=" + a + "&toEvaluate=-1"), 
        o && wx.navigateTo({
            url: o
        });
    },
    getActivityOrderNumber: function() {
        var t = this;
        e.post("/activity/why-activity-order/getActivityOrderNumber", {
            memberId: e.getMember().id
        }, "加载订单状态统计信息..").then(function(e) {
            t.setData({
                activityOrderStatusList: e.body.data
            });
        }).catch(function(t) {});
    },
    clickTab: function(t) {
        var e = this;
        if (console.log("e.target.dataset.current--", t.target.dataset.current), void 0 !== t.target.dataset.current) {
            if (e.data.currentTab === t.target.dataset.current) return;
            e.data.orderlist = [], e.data.page.pageNo = 1, e.setData({
                currentTab: t.target.dataset.current,
                isGetList: !0
            }), e.getorderlist();
        }
    },
    onLoad: function(t) {
        this.setData({
            staticurl: getApp().globalData.staticurl
        }), t.state && this.setData({
            currentTab: t.state
        });
    },
    onShow: function() {
        this.getorderstatedict(), this.getActivityOrderNumber(), wx.getStorageSync("orderState") && (this.setData({
            currentTab: wx.getStorageSync("orderState")
        }), wx.setStorageSync("orderState", ""));
    },
    onPullDownRefresh: function(t) {
        var e = this;
        e.setData({
            page: {
                pageSize: 20,
                pageNo: 1
            },
            loadMore: !0
        }), e.getorderlist();
    },
    onReachBottom: function(t) {
        var e = this;
        e.data.hasMore && !e.data.loadMore ? (e.setData({
            page: {
                pageNo: res.body.page.current + 1,
                pageSize: 20
            },
            loadMore: !0
        }), e.getorderlist()) : e.data.hasMore || wx.showToast({
            title: "没有更多了",
            icon: "none",
            duration: 2e3
        });
    },
    getorderstatedict: function() {
        var t = this;
        e.post("/dict/sys-dict/list", {
            type: "order_state"
        }, "加载中...").then(function(e) {
            t.setData({
                orderstatedict: e.body.data
            }), t.getorderlist();
        }).catch(function(t) {});
    },
    getorderlist: function() {
        var t = this, a = t.data.page;
        a.memberId = e.getMember().id, console.log("-----", t.data.currentTab), a.orderState = t.data.currentTab, 
        e.post("/activity/why-activity-order/list", a, "加载咨询中...").then(function(e) {
            var a = e.body.page.records;
            0 == a.length && (t.data.activesLen = !0, t.setData({
                activesLen: t.data.activesLen
            }));
            var r = t.data.orderstatedict;
            a.forEach(function(t, e, a) {
                r.forEach(function(e, a, r) {
                    e.value == t.order_state && (t.stateString = e.label);
                });
            }), a.forEach(function(t, e, a) {
                "1" == t.orderType && ("1" != t.order_state && "2" != t.order_state && "3" != t.order_state || (t.hdFlag = !0), 
                "-1" == t.order_state && (t.hdFlag = !1)), "2" == t.orderType && ("1" != t.order_state && "2" != t.order_state && "3" != t.order_state || (t.hdsFlag = !0), 
                "-1" == t.order_state && (t.hdsFlag = !1));
            }), 1 == t.data.page.pageNo ? t.setData({
                orderlist: a,
                loadMore: !1
            }) : (e.body.page.records.forEach(function(e, a, r) {
                t.data.orderlist.push(e);
            }), t.setData({
                orderlist: a,
                loadMore: !1
            })), e.body.page.current == e.body.page.pages && t.setData({
                hasMore: !1
            }), wx.hideNavigationBarLoading(), wx.stopPullDownRefresh();
        }).catch(function(t) {
            console.log(t);
        });
    },
    showModalHd: function(t) {
        var e = this, a = t.currentTarget.dataset.item;
        console.log(a), wx.showModal({
            title: "提示",
            content: "尊敬的用户，您即将取消订单，请确认是否继续取消？",
            success: function(t) {
                t.confirm ? e.clickCancleHd(a.id, a.activityType) : t.cancel && console.log("用户点击取消");
            }
        });
    },
    gbmodalHd: function() {
        this.setData({
            showModalWF: 1
        });
    },
    clickCancleHd: function(t, a) {
        console.log("删除活动订单");
        var r = this, o = {
            id: t,
            activityType: a
        };
        e.post("/activity/why-activity-order/cancelOrder", o, "取消中...").then(function(t) {
            t.success && (wx.showToast({
                title: "取消成功",
                icon: "success",
                duration: 2e3
            }), r.setData({
                orderlist: [],
                page: {
                    pageSize: 20,
                    pageNo: 1
                }
            }), r.getorderlist(), r.getorderstatedict(), r.getActivityOrderNumber());
        }).catch(function(t) {
            console.log(t);
        });
    },
    clickUsed: function(e) {
        var a = this, r = e.currentTarget.dataset.orderdetails;
        console.log(r), "2" == r.isLimit ? wx.navigateTo({
            url: "/pages/mine/activityorder/actposition/position",
            events: {
                acceptDataFromOpenedPage: function(t) {
                    console.log(t);
                }
            },
            success: function(t) {
                t.eventChannel.emit("acceptDataFromOpenerPage", {
                    data: r
                });
            }
        }) : (new t.default("myQrcode", {
            text: "O:" + r.id + ":" + r.code,
            width: 200,
            height: 200,
            padding: 12,
            correctLevel: t.default.CorrectLevel.L,
            callback: function(t) {
                console.log(t.path);
            }
        }), a.setData({
            orderDetails: r,
            showModalWF: 0
        }));
    },
    getBase64ImageUrl: function(t) {
        return t ? "data:image/png;base64," + (t = wx.arrayBufferToBase64(wx.base64ToArrayBuffer(t))) : "";
    }
});
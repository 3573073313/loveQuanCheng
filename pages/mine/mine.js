var t = getApp();

Page({
    data: {
        staticurl: t.globalData.staticurl,
        login: !1,
        isDefault: !0,
        member: {},
        statusColor: "",
        statusText: "",
        scoreInfo: {},
        pageNo: 1,
        value: 0,
        orderstatedict: {},
        orderStatusList: {},
        activityOrderStatusList: [],
        orderTotal: 0
    },
    toDetail: function(t) {
        var a = this;
        a.data.isDefault ? a.setData({
            login: !0
        }) : wx.navigateTo({
            url: t.currentTarget.dataset.url
        });
    },
    getTypeList: function(t) {
        var a = this;
        wx.getStorageSync("orderdict") ? (a.setData({
            orderstatedict: wx.getStorageSync("orderdict")
        }), a.getScoreOrderStateNumber()) : a.getorderstatedict();
    },
    getorderstatedict: function() {
        var a = this;
        t.post("/dict/sys-dict/list", {
            type: "order_status"
        }, "加载中...").then(function(t) {
            wx.setStorageSync("orderdict", t.body.data), a.setData({
                orderstatedict: t.body.data
            }), a.getScoreOrderStateNumber();
        }).catch(function(t) {});
    },
    setStatus: function() {
        var t = this, a = t.data.statusColor, e = t.data.statusText, o = t.data.member;
        switch (parseInt(o.authStatus)) {
          case 1:
            a = "#aaaaaa", e = "未认证";
            break;

          case 2:
            a = "#01BA53", e = "已认证";
        }
        t.setData({
            statusColor: a,
            statusText: e
        });
    },
    onLoad: function(t) {
        this.getTypeList();
    },
    onReady: function() {},
    onShow: function() {
        var a = this;
        a.watchBack(), a.getTypeList(), a.getActOrderStateDict(), t.globalData.mineToMygoodthingTab = 0, 
        t.globalData.mineToSnapTab = 0, setTimeout(function() {
            a.data.orderstatedict || a.data.actOrderStateDict || wx.showModal({
                title: "提示",
                content: "加载超时，请重试",
                success: function(t) {
                    t.confirm ? (console.log("用户点击确定"), wx.switchTab({
                        url: "/pages/mine/mine"
                    })) : t.cancel && console.log("用户点击取消");
                }
            });
        }, 3e3);
    },
    watchBack: function() {
        var a = this, e = "";
        (e = t.getMember()) && "" != e ? (a.data.isDefault = !1, a.setData({
            isDefault: !1,
            member: e
        }), a.getActivityOrderNumber(), a.getScoreInfo(), a.setStatus()) : a.setData({
            isDefault: !0
        });
    },
    onConfirm: function(a) {
        var e = this;
        console.log(a),
         console.log("onConfirm:" + JSON.stringify(a)), 
         t.onGotUserInfo(a.detail.detail, function() {
            var a = wx.getStorageSync("member");
            console.log("callback:" + JSON.stringify(a)), t.setUseTime(), e.setData({
                member: a,
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
    handleLogin: function() {
        this.setData({
            login: !0
        });
    },
    getScoreInfo: function() {
        var a = this, e = {};
        t.post("/JnInventoryQuery/get", e, "加载中...").then(function(t) {
            t && (t.body.data.yue = parseInt(t.body.data.allScore) - parseInt(t.body.data.allUse), 
            a.data.scoreInfo = t.body.data, a.setData({
                scoreInfo: a.data.scoreInfo
            }));
        }).catch(function(t) {
            console.log(t);
        });
    },
    getActOrderStateDict: function() {
        var a = this;
        t.post("/dict/sys-dict/list", {
            type: "order_state"
        }, "加载中...").then(function(t) {
            a.setData({
                actOrderStateDict: t.body.data
            }), wx.hideLoading();
        }).catch(function(t) {
            wx.hideLoading();
        });
    },
    clickToMysnap: function() {
        var a = this;
        a.data.isDefault ? a.setData({
            login: !0
        }) : (t.globalData.mineToSnapTab = 2, wx.navigateTo({
            url: "/pages/index/indexsnap/indexsnap"
        }));
    },
    clickToMygoodthing: function() {
        var t = this;
        t.data.isDefault ? t.setData({
            login: !0
        }) : wx.navigateTo({
            url: "/pages/index/indexsnap/indexsnap?type=1&currentTab=2"
        });
    },
    getActivityOrderNumber: function() {
        var a = this;
        t.post("/activity/why-activity-order/getActivityOrderNumber", {
            memberId: t.getMember().id
        }, "加载订单状态统计信息..").then(function(t) {
            a.setData({
                activityOrderStatusList: t.body.data
            }), wx.hideLoading();
        }).catch(function(t) {
            wx.hideLoading();
        });
    },
    getScoreOrderStateNumber: function() {
        var a = this;
        t.post("/goodsOrder/getGoodsOrderStateNumber", {
            memberId: wx.getStorageSync("member").id
        }).then(function(t) {
            a.setData({
                orderStatusList: t.body.data
            }), wx.hideLoading();
        }).catch(function(t) {
            wx.hideLoading();
        });
    }
});
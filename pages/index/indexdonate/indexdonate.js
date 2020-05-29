var t = getApp(), e = require("../../../html-view/index");

Page({
    data: {
        dotList: [ 5, 10, 20, 50, 100 ],
        isShowDotCurrent: null,
        isShowModal3: !1,
        login: !1,
        isDefault: !0,
        value: null,
        dotNum: null,
        member: {},
        showModal: 1,
        currentTab: 0,
        staticurl: getApp().globalData.staticurl,
        bgimg: getApp().globalData.staticurl + "index_donate_bg.png",
        powers: [ {
            face: getApp().globalData.staticurl + "index_tx.jpg"
        }, {
            face: getApp().globalData.staticurl + "index_tx.jpg"
        } ],
        scoreInfo: {},
        allDonate: {},
        orderDonate: {},
        donateByMember: {},
        orderDonateByMember: {},
        allDonateUse: {},
        donateUseList: [],
        scorePool: "",
        rollingList: []
    },
    clickDot: function(t) {
        var e = this, a = this, o = t.currentTarget.dataset.num;
        a.isDotNum(o).then(function() {
            e.setData({
                isShowDotCurrent: t.currentTarget.dataset.index,
                dotNum: t.currentTarget.dataset.num,
                value: null
            });
        });
    },
    isDotNum: function(t) {
        var e = this;
        return new Promise(function(a, o) {
            parseInt(t) > parseInt(e.data.scoreInfo.remainingScore) ? (wx.showToast({
                title: "积分不足",
                icon: "none"
            }), e.setData({
                isShowDotCurrent: null,
                dotNum: null,
                value: null
            }), o()) : a();
        });
    },
    getInputNum: function(t) {
        var e = parseInt(t.detail.value);
        this.setData({
            dotNum: e,
            value: e
        });
    },
    getFocus: function(t) {
        this.setData({
            isShowDotCurrent: null
        });
    },
    onShow: function() {
        var t = this;
        t.watchBack(), t.sumAllDonate(), t.getOrderDonate(), t.getDonateUseList(), t.getRollingList(), 
        t.getScoreInfo();
    },
    watchBack: function() {
        var e = this, a = t.getMember();
        a && "" != a ? (e.data.isDefault = !1, e.setData({
            isDefault: !1,
            member: a
        }), e.getOrderDonateByMember(), e.sumAllDonateByMember()) : (e.data.isDefault = !0, 
        e.setData({
            isDefault: !0
        }));
    },
    clickTab: function(t) {
        var e = this;
        if (this.data.currentTab === t.target.dataset.current) return !1;
        e.setData({
            currentTab: t.target.dataset.current
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
    clickDonate: function() {
        var t = this, e = this;
        console.log("dotNum---", e.data.dotNum), 1 == e.data.member.authStatus ? e.setData({
            isShowModal3: !0
        }) : e.data.dotNum && 0 !== parseInt(e.data.dotNum) ? e.data.dotNum > e.data.scoreInfo.yue ? wx.showToast({
            title: "积分不足",
            icon: "none"
        }) : e.isDotNum(parseInt(e.data.dotNum)).then(function() {
            t.setData({
                showModal: 0
            });
        }) : wx.showToast({
            title: "请设置豆数",
            icon: "none"
        });
    },
    clickSure: function() {
        this.setData({
            showModal: 1
        }), this.goSave();
    },
    clickCancle: function() {
        this.setData({
            showModal: 1
        });
    },
    sumAllDonate: function() {
        var e = this, a = {};
        t.post("/JnInventoryDonate/sumAllDonate", a, "加载中...").then(function(t) {
            t && (e.setData({
                allDonate: t.body.data
            }), e.sumAllDonateUse());
        }).catch(function(t) {
            console.log(t);
        });
    },
    goSave: function() {
        var e = this, a = {
            memberId: e.data.member.id,
            integral: e.data.dotNum
        };
        t.post("/JnInventoryDonate/save", a, "加载中...").then(function(t) {
            t.success && (console.log("捐分成功---", t), wx.showModal({
                title: "亲爱的用户",
                content: "感谢您为文明豆池捐赠" + e.data.dotNum + "豆！",
                showCancel: !1,
                success: function(t) {
                    t.confirm && (e.onShow(), e.setData({
                        isShowDotCurrent: null,
                        value: null,
                        dotNum: null
                    }), wx.pageScrollTo({
                        scrollTop: 0
                    }));
                }
            }));
        }).catch(function(t) {
            console.log(t);
        });
    },
    getOrderDonate: function() {
        var e = this, a = {};
        t.post("/JnInventoryDonate/getOrderDonate", a, "加载中...").then(function(t) {
            t && e.setData({
                orderDonate: t.body.data
            });
        }).catch(function(t) {
            console.log(t);
        });
    },
    getScoreInfo: function() {
        console.log("99999999999");
        var e = this;
        t.getScoreInfo(function() {
            var t = wx.getStorageSync("scoreInfo");
            console.log("积分---", t), e.setData({
                scoreInfo: t
            });
        });
    },
    getOrderDonateByMember: function() {
        var e = this, a = {
            memberId: e.data.member.id
        };
        t.post("/JnInventoryDonate/getOrderDonateByMember", a, "加载中...").then(function(t) {
            t && e.setData({
                orderDonateByMember: t.body.data
            });
        }).catch(function(t) {
            console.log(t);
        });
    },
    sumAllDonateByMember: function() {
        var e = this, a = {
            memberId: e.data.member.id
        };
        t.post("/JnInventoryDonate/sumAllDonateByMember", a, "加载中...").then(function(t) {
            t && e.setData({
                donateByMember: t.body.data
            });
        }).catch(function(t) {
            console.log(t);
        });
    },
    sumAllDonateUse: function() {
        var e = this;
        t.post("/JnInventoryDonateUse/sumAllDonateUse", {}, "加载中...").then(function(t) {
            if (t) {
                e.setData({
                    allDonateUse: t.body.data
                });
                var a = "", o = 8 - (a = parseInt(e.data.allDonate.integral) < parseInt(e.data.allDonateUse.integral) ? parseInt(e.data.allDonateUse.integral) + "" : parseInt(e.data.allDonate.integral) - parseInt(e.data.allDonateUse.integral) + "").length;
                for (o; o > 0; o--) a = "*" + a;
                e.setData({
                    scorePool: a
                });
            }
        }).catch(function(t) {
            console.log(t);
        });
    },
    getDonateUseList: function() {
        var a = this, o = {
            pageNo: 1,
            pageSize: 10
        };
        t.post("/JnInventoryDonateUse/list", o, "加载中...").then(function(t) {
            t && (t.body.page.records.forEach(function(t, a) {
                var o = new e(t.projectInstruction).nodes;
                t.projectInstruction = o, t.createDate = t.createDate.slice(0, 10);
            }), a.setData({
                donateUseList: t.body.page.records
            }));
        }).catch(function(t) {
            console.log(t);
        });
    },
    getRollingList: function() {
        var e = this;
        t.post("/JnInventoryDonate/list", {}, "加载中...").then(function(t) {
            if (t) {
                console.log(t);
                var a = t.body.page.records;
                e.setData({
                    rollingList: a
                });
            }
        }).catch(function(t) {
            console.log(t);
        });
    }
});
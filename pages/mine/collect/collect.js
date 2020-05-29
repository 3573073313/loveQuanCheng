var a = getApp();

Page({
    data: {
        staticurl: getApp().globalData.staticurl,
        login: !1,
        isDefault: !0,
        member: {},
        list: [],
        activesLen: !1,
        hasMore: !0,
        loadMore: !0,
        params: {
            pageNo: 1,
            pageSize: 10
        },
        tabList: [ {
            color: "#FEAB17",
            name: "活动"
        }, {
            color: "#ED3C44",
            name: "商品"
        }, {
            color: "#3CA0ED",
            name: "文章"
        } ],
        currentTab: 0,
        startX: 0,
        startY: 0
    },
    clickTab: function(a) {
        var t = a.currentTarget.dataset.index;
        this.setData({
            currentTab: t
        });
    },
    onLoad: function() {},
    onShow: function() {
        this.watchBack();
    },
    watchBack: function() {
        var t = this, e = "";
        (e = a.getMember()) && "" != e ? (t.data.isDefault = !1, t.setData({
            isDefault: !1,
            member: e
        }), t.getList()) : (t.data.isDefault = !0, t.setData({
            isDefault: !0
        }));
    },
    onReachBottom: function() {
        var a = this;
        a.data.hasMore && !a.data.loadMore ? (a.data.loadMore = !0, a.getList()) : a.data.hasMore || wx.showToast({
            title: "没有更多了",
            icon: "none",
            duration: 2e3
        });
    },
    getList: function(t) {
        var e = this;
        e.data.params.memberId = e.data.member.id, e.setData({
            params: e.data.params
        }), a.post("/WhyMemberFavourite/list", e.data.params, "加载中...").then(function(a) {
            if (a.success) {
                console.log(a), t && e.setData({
                    list: []
                });
                var o = a.body.page.records;
                0 == o.length && (e.data.activesLen = !0, e.setData({
                    activesLen: e.data.activesLen
                })), e.data.params.pageNo = a.body.page.current + 1;
                var s = e.data.list;
                o.forEach(function(a, t, o) {
                    a.isTouchMove = !1, e.data.params.pageNo > 1 && s.push(a);
                }), e.data.params.pageNo > 1 && (o = s), e.setData({
                    params: e.data.params,
                    list: o,
                    loadMore: !1
                }), a.body.page.current == a.body.page.pages && e.setData({
                    hasMore: !1
                });
            }
        }).catch(function(a) {
            console.log(a);
        });
    },
    deleteItem: function(t) {
        var e = this, o = {
            id: t.currentTarget.dataset.id
        };
        a.post("/WhyMemberFavourite/delete", o, "加载中...").then(function(a) {
            a.success && (console.log(a), e.data.params.pageNo = 1, e.setData({
                params: e.data.params,
                activesLen: !1,
                hasMore: !0,
                loadMore: !0
            }), e.getList(!0));
        }).catch(function(a) {
            console.log(a);
        });
    },
    goto: function(a) {
        var t = a.currentTarget.dataset.item, e = "";
        if (1 == t.contentType && (e = "/pages/zhuanfen/zhuanfenorder/zhuanfenorder?id=" + t.contentId, 
        t.type && (e += "&type=2"), 5 == t.type && (e += "&contribute=1")), 2 == t.contentType) e = "/pages/quanyi/goodsdetail/goodsdetail?id=" + t.contentId;
        if (3 == t.contentType) e = "/pages/news/detail/detail?id=" + t.contentId;
        wx.navigateTo({
            url: e
        });
    },
    touchstart: function(a) {
        var t = this;
        t.data.list.forEach(function(a, t) {
            a.isTouchMove && (a.isTouchMove = !1);
        }), console.log(a), t.setData({
            startX: a.changedTouches[0].clientX,
            startY: a.changedTouches[0].clientY,
            list: t.data.list
        });
    },
    touchmove: function(a) {
        var t = this, e = a.currentTarget.dataset.index, o = t.data.startX, s = t.data.startY, n = a.changedTouches[0].clientX, i = a.changedTouches[0].clientY, r = t.angle({
            X: o,
            Y: s
        }, {
            X: n,
            Y: i
        });
        t.data.list.forEach(function(a, t) {
            a.isTouchMove = !1, Math.abs(r) > 30 || t == e && (a.isTouchMove = !(n > o));
        }), t.setData({
            list: t.data.list
        });
    },
    angle: function(a, t) {
        var e = t.X - a.X, o = t.Y - a.Y;
        return 360 * Math.atan(o / e) / (2 * Math.PI);
    }
});
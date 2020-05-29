var a = getApp();

Page({
    data: {
        staticurl: getApp().globalData.staticurl,
        obj: {
            pageNo: 1,
            pageSize: 10
        },
        jyList: [],
        activesLen: !1,
        hasMore: !0,
        loadMore: !0
    },
    onLoad: function(a) {
        var t = this;
        t.setData({
            isNav: !!a.data
        }), t.getList();
    },
    onReachBottom: function() {
        var a = this;
        a.data.hasMore && !a.data.loadMore ? (a.data.loadMore = !0, a.getMySnapList()) : a.data.hasMore || wx.showToast({
            title: "没有更多了",
            icon: "success",
            duration: 2e3
        });
    },
    getList: function() {
        var t = this;
        a.post("/JnContentProposal/list", t.data.obj, "加载中...").then(function(a) {
            if (console.log(a), a.success) {
                var e = a.body.page.records;
                e.forEach(function(a, t, e) {
                    if (null != a.pictures) {
                        var o = a.pictures.split(",");
                        a.pictures = o;
                    }
                    if (null != a.videos) {
                        var s = a.videos.split(",");
                        a.videos = s;
                    }
                }), t.data.sssplistBoolean = !0, t.setData({
                    sssplistBoolean: t.data.sssplistBoolean
                }), 0 == e.length && (t.data.activesLen = !0, t.setData({
                    activesLen: t.data.activesLen
                })), console.log("jyList--", JSON.stringify(e)), 1 == t.data.obj.pageNo ? (t.data.obj.pageNo = a.body.page.current + 1, 
                t.setData({
                    obj: t.data.obj,
                    jyList: e,
                    loadMore: !1
                })) : (console.log("哈哈哈哈"), e.forEach(function(a, e, o) {
                    t.data.jyList.push(a);
                }), console.log(t.data.jyList), t.data.obj.pageNo = a.body.page.current + 1, t.setData({
                    obj: t.data.obj,
                    jyList: t.data.jyList,
                    loadMore: !1
                })), a.body.page.current == a.body.page.pages && t.setData({
                    hasMore: !1
                });
            }
        }).catch(function(a) {
            console.log(a);
        });
    },
    previewImg: function(a) {
        console.log(a);
        var t = this, e = a.currentTarget.dataset.number, o = a.currentTarget.dataset.index, s = t.data.jyList;
        wx.previewImage({
            current: s[e].pictures[o],
            urls: s[e].pictures
        });
    },
    onUnload: function() {
        this.data.isNav && wx.switchTab({
            url: "/pages/mine/mine"
        });
    }
});
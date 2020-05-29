var a = getApp();

Page({
    data: {
        obj: {
            type: 1,
            pageNo: 1,
            pageSize: 10
        },
        member: {},
        allScore: "",
        list: [],
        listLen: !1,
        hasMore: !0,
        loadMore: !0
    },
    onLoad: function() {},
    onShow: function() {
        var t = "", e = this;
        setTimeout(function() {
            (t = a.getMember()) && "" != t ? (e.data.isDefault = !1, e.data.obj.memberId = t.id, 
            e.setData({
                isDefault: !1,
                member: t,
                obj: e.data.obj
            }), e.getList()) : (e.data.isDefault = !0, e.setData({
                isDefault: !0
            }));
        }, 500);
    },
    onReachBottom: function() {
        var a = this;
        a.data.hasMore && !a.data.loadMore ? (a.data.loadMore = !0, a.getList()) : a.data.hasMore || wx.showToast({
            title: "没有更多了",
            icon: "none",
            duration: 2e3
        });
    },
    getList: function() {
        var t = this;
        a.post("/JnInventoryQueryRecord/listCurMonth", t.data.obj, "加载中...").then(function(a) {
            if (a.success) {
                console.log(a);
                var e = a.body.page.records;
                0 == e.length && (t.data.listLen = !0, t.setData({
                    listLen: t.data.listLen
                })), t.setData({
                    allScore: a.body.allScore
                }), 1 == t.data.obj.pageNo ? (t.data.obj.pageNo = a.body.page.current + 1, t.setData({
                    obj: t.data.obj,
                    list: e,
                    loadMore: !1
                })) : (e.forEach(function(a, e, o) {
                    t.data.list.push(a);
                }), t.data.obj.pageNo = a.body.page.current + 1, t.setData({
                    obj: t.data.obj,
                    list: t.data.list,
                    loadMore: !1
                })), a.body.page.current == a.body.page.pages && t.setData({
                    hasMore: !1
                });
            }
        }).catch(function(a) {
            console.log(a);
        });
    }
});
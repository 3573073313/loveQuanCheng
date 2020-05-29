var a = getApp();

Page({
    data: {
        obj: {
            type: 2,
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
        var t = "", o = this;
        setTimeout(function() {
            (t = a.getMember()) && "" != t ? (o.data.isDefault = !1, o.data.obj.memberId = t.id, 
            o.setData({
                isDefault: !1,
                member: t,
                obj: o.data.obj
            }), o.getList()) : (o.data.isDefault = !0, o.setData({
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
        console.log(t.data.obj), a.post("/JnInventoryQueryRecord/list", t.data.obj, "加载中...").then(function(a) {
            if (a.success) {
                console.log(a);
                var o = a.body.page.records;
                0 == o.length && (t.data.listLen = !0, t.setData({
                    listLen: t.data.listLen
                })), t.setData({
                    allScore: a.body.allScore
                }), 1 == t.data.obj.pageNo ? (t.data.obj.pageNo = a.body.page.current + 1, t.setData({
                    obj: t.data.obj,
                    list: o,
                    loadMore: !1
                })) : (o.forEach(function(a, o, e) {
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
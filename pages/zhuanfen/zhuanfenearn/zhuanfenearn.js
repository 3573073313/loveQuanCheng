var t = getApp();

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
        var a = "", o = this;
        setTimeout(function() {
            (a = t.getMember()) && "" != a ? (o.data.isDefault = !1, o.data.obj.memberId = a.id, 
            o.setData({
                isDefault: !1,
                member: a,
                obj: o.data.obj
            }), o.getList()) : (o.data.isDefault = !0, o.setData({
                isDefault: !0
            }));
        }, 500);
    },
    onReachBottom: function() {
        var t = this, a = t.data.obj;
        t.data.total > a.pageSize * a.pageNo ? (a.pageNo++, t.setData({
            obj: a
        }), t.getList()) : wx.showToast({
            title: "没有更多了",
            icon: "none",
            duration: 2e3
        });
    },
    getList: function() {
        var a = this;
        console.log(a.data.obj), t.post("/JnInventoryQueryRecord/list", a.data.obj, "加载中...").then(function(t) {
            if (t.success) {
                console.log(t);
                var o = t.body.page.records, e = t.body.page.total, s = t.body.allScore;
                if (a.data.obj.pageNo > 1) {
                    var i = a.data.list;
                    o.forEach(function(t) {
                        i.push(t);
                    }), o = i;
                }
                a.setData({
                    list: o,
                    allScore: s,
                    total: e
                });
            }
        }).catch(function(t) {
            console.log(t);
        });
    }
});
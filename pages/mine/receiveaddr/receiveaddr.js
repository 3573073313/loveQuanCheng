var a = getApp();

Page({
    data: {
        staticurl: getApp().globalData.staticurl,
        isDefault: !1,
        member: {},
        addrList: [],
        obj: {
            pageNo: 1,
            pageSize: 10
        },
        activesLen: !1,
        hasMore: !0,
        loadMore: !0,
        delobj: {},
        showModal: 1,
        isFromMine: !1
    },
    onLoad: function(t) {
        console.log(t);
        var o = t.isFromMine, e = "", d = this;
        setTimeout(function() {
            (e = a.getMember()) && "" != e ? (d.data.isDefault = !1, d.data.obj.memberId = e.id, 
            d.data.delobj.memberId = e.id, d.setData({
                isDefault: !1,
                member: e,
                obj: d.data.obj,
                delobj: d.data.delobj,
                isFromMine: o
            }), d.getList(e.id)) : (d.data.isDefault = !0, d.setData({
                isDefault: !0
            }));
        }, 500);
    },
    onShow: function(a) {},
    onReachBottom: function() {
        var a = this;
        a.data.hasMore && !a.data.loadMore ? (a.data.loadMore = !0, a.getList()) : a.data.hasMore || wx.showToast({
            title: "没有更多了",
            icon: "success",
            duration: 2e3
        });
    },
    getList: function(t) {
        var o = this;
        a.post("/JnMemberAddress/list", o.data.obj, "加载中...").then(function(a) {
            if (console.log(a), a) {
                var t = a.body.page.records;
                0 == t.length && (o.data.activesLen = !0, o.setData({
                    activesLen: o.data.activesLen
                })), 1 == o.data.obj.pageNo ? (o.data.obj.pageNo = a.body.page.current + 1, o.setData({
                    obj: o.data.obj,
                    addrList: t,
                    loadMore: !1
                })) : (t.forEach(function(a, t, e) {
                    o.data.addrList.push(a);
                }), console.log(o.data.addrList), o.data.obj.pageNo = a.body.page.current + 1, o.setData({
                    obj: o.data.obj,
                    addrList: o.data.addrList,
                    loadMore: !1
                })), a.body.page.current == a.body.page.pages && o.setData({
                    hasMore: !1
                });
            }
        }).catch(function(a) {
            console.log(a);
        });
    },
    showModal: function(a) {
        console.log(a);
        var t = this, o = a.currentTarget.dataset.itemid;
        t.data.delobj.id = o, t.data.showModal = 0, t.setData({
            delobj: t.data.delobj,
            showModal: t.data.showModal
        });
    },
    delAddr: function() {
        var t = this;
        t.data.showModal = 1, t.setData({
            showModal: t.data.showModal
        }), a.post("/JnMemberAddress/delete", t.data.delobj, "加载中...").then(function(a) {
            console.log(a), a && (t.data.obj.pageNo = 1, t.data.delobj.id = "", t.setData({
                obj: t.data.obj,
                addrList: [],
                activesLen: !1,
                hasMore: !0,
                loadMore: !0,
                delobj: t.data.delobj
            }), t.getList());
        }).catch(function(a) {
            console.log(a);
        });
    },
    delCancle: function() {
        var a = this;
        a.data.showModal = 1, a.setData({
            showModal: a.data.showModal
        });
    },
    selectAddress: function(a) {
        var t = a.currentTarget.dataset.itemid, o = getCurrentPages();
        o[o.length - 2].setData({
            addressId: t,
            isFromAdd: !0
        }), wx.navigateBack({
            delta: 1
        });
    },
    clickAddAddr: function() {
        console.log("添加");
        var a = this;
        a.data.obj.pageNo = 1, a.setData({
            obj: a.data.obj
        }), console.log(a.data.obj), setTimeout(function() {
            wx.navigateTo({
                url: "/pages/mine/addaddr/addaddr"
            });
        }, 500);
    },
    changeData: function() {
        var a = this;
        a.data.obj.pageNo = 1, a.setData({
            obj: a.data.obj,
            activesLen: !1,
            hasMore: !0,
            loadMore: !0,
            addrList: []
        }), a.getList();
    }
});
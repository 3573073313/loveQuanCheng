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
        }
    },
    onLoad: function(a) {
        this.getSearchList(a.searchText);
    },
    onShow: function(a) {},
    onReachBottom: function() {
        var a = this;
        a.data.hasMore && !a.data.loadMore ? (a.data.loadMore = !0, a.getSearchList()) : a.data.hasMore || wx.showToast({
            title: "没有更多了",
            icon: "success",
            duration: 2e3
        });
    },
    goto: function(a) {
        console.log(a);
        var e = a.currentTarget.dataset.item.type, t = a.currentTarget.dataset.item.id;
        1 == e ? wx.navigateTo({
            url: "../../quanyi/goodsdetail/goodsdetail?id=" + t
        }) : 2 == e ? wx.navigateTo({
            url: "../../news/detail/detail?id=" + t
        }) : wx.navigateTo({
            url: "../../zhuanfen/zhuanfenorder/zhuanfenorder?id=" + t
        });
    },
    getSearchList: function(e) {
        var t = this;
        console.log(e), a.post("/Home/searchList", {
            searchText: e
        }, "加载中...").then(function(a) {
            if (a.success) {
                var e = a.body.data.records;
                0 == e.length && (t.data.activesLen = !0, t.setData({
                    activesLen: t.data.activesLen
                })), e.forEach(function(a, e, t) {
                    a.name = a.name.replace(/&ldquo;/g, "''").replace(/&rdquo;/g, "''").replace(/&mdash;&mdash;/g, "——");
                }), t.setData({
                    list: e
                });
            }
        }).catch(function(a) {
            console.log(a);
        });
    }
});
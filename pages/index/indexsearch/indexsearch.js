var t = getApp();

Page({
    data: {
        searchText: "",
        latelySearchList: [],
        hotkeywordlist: [ {
            cont: "志愿活动1"
        }, {
            cont: "志愿活动2"
        }, {
            cont: "关爱留守儿童"
        }, {
            cont: "孤巢老人"
        } ],
        seaHistoryList: []
    },
    onLoad: function() {
        this.getKeyWords();
    },
    onShow: function() {
        console.log("重新显示了");
        var t = this;
        wx.getStorage({
            key: "searchHistoryList",
            success: function(a) {
                console.log(a.data), t.data.latelySearchList = a.data, t.setData({
                    latelySearchList: t.data.latelySearchList
                });
            }
        });
    },
    bindvalue: function(t) {
        this.setData({
            searchText: t.detail.value
        });
    },
    getSearchList: function(a) {
        var e = this;
        console.log(a), t.post("/Home/searchList", {
            searchText: a
        }, "加载中...").then(function(t) {
            t.success && (console.log(t.body.data), e.setData({
                list: t.body.data.records
            }));
        }).catch(function(t) {
            console.log(t);
        });
    },
    searchContent: function() {
        var t = this;
        if (t.data.searchText) {
            var a = t.data.seaHistoryList;
            a.push(t.data.searchText);
            var e = Array.from(new Set(a));
            wx.setStorage({
                key: "searchHistoryList",
                data: e
            }), wx.navigateTo({
                url: "/pages/index/indexsearch/searchresult?searchText=" + t.data.searchText
            });
        } else wx.showToast({
            title: "内容不能为空",
            icon: "none"
        });
    },
    getKeyWords: function() {
        var a = this;
        t.post("/hotkeyword/why-hot-keyword/list", {}, "加载中...").then(function(t) {
            if (t.success) {
                console.log(t);
                var e = t.body.page.records;
                a.setData({
                    hotkeywordlist: e
                });
            }
        }).catch(function(t) {
            console.log(t);
        });
    },
    clickDelHistory: function() {
        var t = this;
        wx.removeStorage({
            key: "searchHistoryList",
            success: function(a) {
                t.data.latelySearchList = [], t.data.seaHistoryList = [], t.setData({
                    latelySearchList: t.data.latelySearchList,
                    seaHistoryList: t.data.seaHistoryList
                });
            }
        });
    },
    searchHotTitle: function(t) {
        console.log(t.currentTarget.dataset.searchhottit);
        var a = this;
        a.data.searchText = t.currentTarget.dataset.searchhottit, a.setData({
            searchText: a.data.searchText
        }), a.searchContent();
    },
    searchLatelyTitle: function(t) {
        console.log(t.currentTarget.dataset.searchhottit);
        var a = this, e = t.currentTarget.dataset.searchlatetit;
        a.data.searchText = a.data.latelySearchList[e], a.setData({
            searchText: a.data.searchText
        }), a.searchContent();
    }
});
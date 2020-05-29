var t = getApp();

Page({
    data: {
        staticUrl: getApp().globalData.staticurl,
        activityList: [],
        isplay: !1
    },
    getList: function(a) {
        var e = this;
        t.post("JnQuestionnaire/list", {
            pageNo: a
        }).then(function(t) {
            if (t.success) {
                var i = t.body.page.records, n = e.data.activityList;
                i.forEach(function(t) {
                    if (t.activityName = t.name, t.startDate) {
                        var e = t.startDate.split("-");
                        e.splice(0, 1), t.startDate = e.join("-");
                        var i = t.endDate.split("-");
                        i.splice(0, 1), t.endDate = i.join("-");
                    }
                    t.orgId = t.orgName, t.expireNum = t.expire, a > 1 && n.push(t);
                }), a > 1 && (i = n), e.setData({
                    activityList: i,
                    page: {
                        current: t.body.page.current,
                        pages: t.body.page.pages
                    }
                });
            }
        }).catch(function(t) {});
    },
    onLoad: function(t) {
        this.getList(1);
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {
        var t = this, a = this.data.page;
        a.current < a.pages ? t.getList(a.current + 1) : wx.showToast({
            title: "没有更多了!",
            icon: "none"
        });
    }
});
var a = getApp();

Page({
    data: {
        advList: [ {
            url: "https://hm.ytain.com/cultural-cdn/adv/attachment/2019/09/02/1567408302754.png"
        } ],
        hrList: [ {
            img: "https://jn.zhuwentec.com/jn-cultural-cdn/wxapp/good_people.png",
            surname: "0张三",
            sexName: "男",
            age: "29",
            cityName: "济南市人",
            brief: "见义勇为的好人",
            type_name: "感动济南十大好人"
        } ],
        obj: {
            pageNo: 1,
            pageSize: 10
        },
        sssplistBoolean: !1,
        activesLen: !1,
        hasMore: !0,
        loadMore: !0
    },
    onLoad: function() {
        this.getList();
    },
    onReachBottom: function() {
        var a = this;
        a.data.hasMore && !a.data.loadMore ? (a.data.loadMore = !0, a.getList()) : a.data.hasMore || wx.showToast({
            title: "没有更多了",
            icon: "success",
            duration: 2e3
        });
    },
    getList: function() {
        var t = this;
        a.post("/WhyExampleReleaseManagement/list", t.data.obj, "加载中...").then(function(a) {
            if (a) {
                console.log(a), t.data.sssplistBoolean = !0, t.setData({
                    sssplistBoolean: t.data.sssplistBoolean
                });
                var e = a.body.page.records;
                0 == e.length && (t.data.activesLen = !0, t.setData({
                    activesLen: t.data.activesLen
                })), 1 == t.data.obj.pageNo ? (t.data.obj.pageNo = a.body.page.current + 1, t.setData({
                    obj: t.data.obj,
                    hrList: e,
                    loadMore: !1
                })) : (e.forEach(function(a, e, o) {
                    t.data.hrList.push(a);
                }), console.log(t.data.hrList), t.data.obj.pageNo = a.body.page.current + 1, t.setData({
                    obj: t.data.obj,
                    hrList: t.data.hrList,
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
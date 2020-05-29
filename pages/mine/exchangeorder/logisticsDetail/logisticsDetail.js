var t = getApp();

Page({
    data: {
        order: null,
        id: ""
    },
    getLogisticsDetail: function() {
        var n = this, o = {
            id: ""
        };
        n.data.id && (o.id = n.data.id), t.post("goodsOrder/queryExpressData", o, "", "GET").then(function(t) {
            console.log("获取物流信息--", t), t.success && n.setData({
                order: t.data.result
            });
        }).catch(function(t) {});
    },
    onLoad: function(t) {
        this.setData({
            id: t.id
        });
    },
    onReady: function() {},
    onShow: function() {
        this.getLogisticsDetail();
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});
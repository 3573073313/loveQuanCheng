getApp();

Page({
    data: {
        staticurl: "",
        show: !1
    },
    onLoad: function(t) {
        var o = decodeURIComponent(t.url);
        this.setData({
            staticurl: o,
            show: !0
        });
    },
    onShow: function() {}
});
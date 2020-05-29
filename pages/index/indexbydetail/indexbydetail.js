var t = require("../../../html-view/index"), e = getApp();

Page({
    data: {
        staticurl: getApp().globalData.staticurl
    },
    lookImg: function(t) {
        console.log(t);
        var e = t.currentTarget.dataset.src;
        wx.previewImage({
            current: e,
            urls: [ e ],
            complete: function(t) {}
        });
    },
    onLoad: function(t) {
        console.log(t), this.setData({
            staticurl: getApp().globalData.staticurl,
            id: t.id
        }), wx.setNavigationBarTitle({
            title: t.title
        }), this.getInfo(t.id);
    },
    onShow: function() {},
    getInfo: function(a) {
        var o = this;
        e.post("/WhyExampleReleaseManagement/get?id=" + a, {}, "加载中...").then(function(e) {
            if (e.success) {
                console.log(e);
                var a = e.body.data.details.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, "'").replace(/&quot;/g, "'").replace(/..\/cultural-cdn/g, "https://hm.ytain.com/cultural-cdn");
                console.log(a);
                var l = new t(a).nodes;
                e.body.data.list_img = e.body.data.list_img.split(","), o.setData({
                    info: e.body.data,
                    html: l
                });
            }
        }).catch(function(t) {
            console.log(t);
        });
    }
});
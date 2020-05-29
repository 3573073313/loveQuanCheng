getApp();

Page({
    data: {
        staticurl: getApp().globalData.staticurl,
        imgMinus: getApp().globalData.staticurl + "zf_minus.png",
        imgAdd: getApp().globalData.staticurl + "zf_add.png",
        subobj: {
            num: 1
        }
    },
    onLoad: function() {},
    onShow: function() {},
    numjian: function() {
        if (1 == this.data.subobj.num) return !1;
        this.data.subobj.num = this.data.subobj.num - 1, this.setData({
            subobj: this.data.subobj
        });
    },
    numjia: function() {
        var t = this.data.subobj.num;
        if (t == this.data.surplus) return !1;
        this.data.subobj.num = t + 1, this.setData({
            subobj: this.data.subobj
        });
    }
});
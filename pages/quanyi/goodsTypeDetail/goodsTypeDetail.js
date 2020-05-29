var o = getApp();

Page({
    data: {
        id: "",
        goodsList: [],
        array: [ "价格", "销量" ],
        sortIndex: 0
    },
    bindPickerChange: function(o) {
        console.log("picker发送选择改变，携带值为", o.detail.value), this.setData({
            sortIndex: o.detail.value
        });
    },
    getGoodsDetails: function() {
        var t = this, n = {}, e = t.data.isFloor, s = "";
        console.log("isFloor---", e), e ? (s = "JnGoodsFloorContent", n.floorId = t.data.id) : (s = "goods_management", 
        n.goodsTypeId = t.data.id), o.post(s + "/list", n, "加载中...").then(function(o) {
            o.success && (console.log("goodsList--", JSON.stringify(o.body.page.records)), t.setData({
                goodsList: o.body.page.records
            }));
        }).catch(function(o) {
            console.log(o);
        });
    },
    onLoad: function(o) {
        console.log("options---", o), this.setData({
            id: o.id,
            isFloor: JSON.parse(o.isFloor)
        }), wx.setNavigationBarTitle({
            title: o.name
        });
    },
    onReady: function() {},
    onShow: function() {
        this.getGoodsDetails();
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});
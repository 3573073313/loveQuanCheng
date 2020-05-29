function a(a, t, e) {
    return t in a ? Object.defineProperty(a, t, {
        value: e,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : a[t] = e, a;
}

var t, e = getApp();

Page({
    data: (t = {
        login: !1,
        isDefault: !0,
        member: {},
        showModal: 1,
        staticurl: getApp().globalData.staticurl,
        imgMinus: getApp().globalData.staticurl + "zf_minus.png",
        imgAdd: getApp().globalData.staticurl + "zf_add.png",
        subobj: {
            num: 1
        }
    }, a(t, "imgMinus", getApp().globalData.staticurl + "zf_minus.png"), a(t, "imgAdd", getApp().globalData.staticurl + "zf_add.png"), 
    a(t, "totalScore", 0), a(t, "addressId", ""), a(t, "selectCartList", []), a(t, "addressInfo", null), 
    a(t, "isGetAddressInfo", !1), a(t, "addressList", []), a(t, "showModal1", 1), a(t, "totalPrice", 0), 
    a(t, "isFromAdd", !1), t),
    onLoad: function(a) {
        var t = this, e = JSON.parse(a.selectCartList), s = 0, d = 0;
        e.forEach(function(a) {
            s += a.postage;
        }), d = parseInt(s) + parseInt(a.totalScore), t.setData({
            selectCartList: e,
            totalPostage: s,
            totalPrice: d,
            totalScore: a.totalScore
        });
    },
    onShow: function() {
        var a = this;
        a.watchBack();
        var t = getCurrentPages(), e = t[t.length - 1], s = e.data.addressId;
        void 0 !== s && "" != s && (a.getAddressList(), a.setData({
            showModal: 1,
            showModal1: 1,
            isFromAdd: e.data.isFromAdd
        }));
    },
    watchBack: function() {
        var a = this, t = e.getMember();
        t && "" != t ? (a.data.isDefault = !1, a.setData({
            isDefault: !1,
            member: t
        }), a.data.isFromAdd || a.getDefaultAddress()) : (a.data.isDefault = !0, a.setData({
            isDefault: !0
        }));
    },
    getAddressList: function() {
        var a = this, t = {
            memberId: a.data.member.id,
            id: a.data.addressId
        };
        e.post("/JnMemberAddress/get", t, "加载中...").then(function(t) {
            t && t.success && a.setData({
                addressInfo: t.body.data,
                isGetAddressInfo: !0
            });
        }).catch(function(a) {
            console.log(a);
        });
    },
    getDefaultAddress: function() {
        var a = this;
        e.post("/JnMemberAddress/list", {
            memberId: a.data.member.id
        }).then(function(t) {
            if (t.success) {
                console.log("默认地址---", t);
                var e = t.body.page.records[0];
                a.setData({
                    addressInfo: e,
                    isGetAddressInfo: !0
                });
            }
        }).catch(function(a) {});
    },
    commitOrder: function() {
        console.log("commitOrder");
        var a = this;
        null == a.data.addressInfo && a.setData({
            showModal: 0
        });
        var t = {
            cartIdList: a.data.selectCartList,
            memberId: a.data.member.id,
            shippingUser: a.data.addressInfo.name,
            consigneeTel: a.data.addressInfo.linkManMobile,
            addres: a.data.addressInfo.address,
            deliveryMode: 1
        };
        e.postJSON("/goodsOrder/save", JSON.stringify(t), "加载中...").then(function(t) {
            t.success ? wx.redirectTo({
                url: "/pages/mine/exchangeorder/exchangeorder"
            }) : (wx.showToast({
                title: t.msg,
                icon: "none",
                duration: 2e3
            }), a.setData({
                showModal1: 1
            }));
        }).catch(function(a) {
            console.log(a);
        });
    },
    bindPickerChange: function(a) {
        wx.navigateTo({
            url: "../../mine/receiveaddr/receiveaddr"
        });
    },
    delCancle: function() {
        var a = this;
        a.data.showModal1 = 1, a.setData({
            showModal1: a.data.showModal1
        });
    },
    confrim: function(a) {
        var t = this, e = wx.getStorageSync("scoreInfo");
        t.data.totalPrice > e.yue ? wx.showToast({
            title: "积分不足",
            icon: "none"
        }) : (t.data.showModal1 = 0, t.setData({
            showModal1: t.data.showModal1
        }));
    }
});
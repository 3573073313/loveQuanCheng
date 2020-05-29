var t = getApp();

Page({
    data: {
        login: !1,
        isDefault: !0,
        member: {},
        staticurl: t.globalData.staticurl,
        indicatorDots: !0,
        vertical: !1,
        autoplay: !0,
        interval: 3e3,
        typeList: [],
        duration: 1200,
        type: {},
        activeColor: "#D01728",
        isHasDoods: !1,
        current: "",
        swipers: [],
        currentTab: 0,
        goodsList: [],
        scoreInfo: {},
        floorList: [],
        isQrCode: !1,
        isShowTab: !1
    },
    onLoad: function() {
        var t = wx.getSystemInfoSync().windowHeight, e = wx.getSystemInfoSync().windowWidth;
        this.setData({
            windowHeight: t,
            windowWidth: e
        });
    },
    tabSetTop: function() {
        var t = this, e = wx.createSelectorQuery();
        e.select(".index-tasks").boundingClientRect(), e.exec(function(o) {
            o && o[0] && o[0].height && o[0].height > t.data.windowHeight && (e.select(".swiper-tab").boundingClientRect(), 
            e.exec(function(e) {
                t.setData({
                    topDistance: e[0].height
                });
            }));
        });
    },
    onPageScroll: function(t) {
        var e = this;
        t.scrollTop >= e.data.topDistance + 150 ? e.setData({
            isShowTab: !0
        }) : e.setData({
            isShowTab: !1
        });
    },
    openQrCode: function() {
        var t = this;
        t.setData({
            isQrCode: !0
        }), wx.scanCode({
            success: function(e) {
                t.setData({
                    isQrCode: !1
                });
                var o = JSON.parse(e.result);
                o.goodsId ? wx.navigateTo({
                    url: "/pages/quanyi/goodsdetail/goodsdetail?id=" + o.goodsId
                }) : wx.showToast({
                    title: "未识别到商品",
                    icon: "none",
                    duration: 2e3
                });
            }
        });
    },
    toTypeDetail: function(t) {
        var e = t.currentTarget.dataset.id, o = t.currentTarget.dataset.name, a = t.currentTarget.dataset.isFloor;
        wx.navigateTo({
            url: "goodsTypeDetail/goodsTypeDetail?id=" + e + "&name=" + o + "&isFloor=" + a
        });
    },
    onShow: function() {
        if (!this.data.isQrCode) {
            console.log("current---", this.data.currentTab);
            var t = this;
            t.watchBack(), t.getWheelPlantingList();
            var e = "";
            null != wx.getStorageSync("goodsTypeId") && "" != wx.getStorageSync("goodsTypeId") && (e = wx.getStorageSync("goodsTypeId")), 
            t.getGoodsTypeList(e), t.getFloorType(), t.getCardList();
        }
    },
    getScoreInfo: function() {
        var e = this;
        t.getScoreInfo(function() {
            var t = wx.getStorageSync("scoreInfo");
            e.setData({
                scoreInfo: t,
                finish: !0
            });
        });
    },
    watchBack: function() {
        var e = this, o = t.getMember();
        o && "" != o ? (e.data.isDefault = !1, e.setData({
            isDefault: !1,
            member: o
        }), e.getScoreInfo()) : (e.data.isDefault = !0, e.setData({
            isDefault: !0
        }));
    },
    gotoIndex: function() {
        this.setData({
            currentTab: -1
        });
    },
    gotoCart: function() {
        wx.navigateTo({
            url: "./cart/cart"
        });
    },
    getFloorType: function() {
        var e = this;
        t.post("JnGoodsFloor/listData", {}, "加载中...").then(function(t) {
            t.success && (console.log("楼层---", JSON.stringify(t.body.jnGoodsFloors)), e.setData({
                floorList: t.body.jnGoodsFloors
            }), e.tabSetTop());
        }).catch(function(t) {
            console.log(t);
        });
    },
    clickTab: function(t) {
        var e = this, o = t.target.dataset.current;
        this.data.currentTab !== o && (0 === o ? (e.setData({
            currentTab: o
        }), e.getGoodsDetails()) : (wx.setStorageSync("goodsTypeId", t.target.dataset.item.id), 
        wx.setStorageSync("currentTab", o), e.setData({
            type: t.target.dataset.item,
            currentTab: o
        }), e.getGoodsDetails(t.target.dataset.item.id)));
    },
    getGoodsDetails: function(e) {
        var o = this, a = {};
        0 === o.data.currentTab ? a.ifHome = "1" : a.goodsTypeId = e, console.log("that.data.currentTab----", o.data.currentTab), 
        console.log("参数codeobj----", a), t.post("/goods_management/list", a, "加载中...").then(function(t) {
            t.success && (console.log(t.body.page.records), o.setData({
                goodsList: t.body.page.records
            }));
        }).catch(function(t) {
            console.log(t);
        });
    },
    getWheelPlantingList: function() {
        var e = this, o = this, a = {
            acid: "dbf26f74d61144718271c312fb17ef14"
        };
        t.post("/adv/why-cms-adv/list", a, "加载中...").then(function(t) {
            t && (o.setData({
                swipers: t.body.page.records
            }), 1 == e.data.swipers.length && e.setData({
                indicatorDots: !1
            }));
        }).catch(function(t) {
            console.log(t);
        });
    },
    getGoodsTypeList: function(e) {
        var o = this;
        t.post("/goodsType/list", {}, "加载中...").then(function(t) {
            if (t && t.success) {
                var a = 0;
                o.data.currentTab > 0 && (a = o.data.currentTab - 1), o.setData({
                    typeList: t.body.page.records,
                    type: t.body.page.records[a]
                }), o.getGoodsDetails(e);
            }
        }).catch(function(t) {
            console.log(t);
        });
    },
    getCardList: function() {
        var e = this, o = {
            memberId: wx.getStorageSync("member").id
        };
        t.post("/goodsCart/list", o, "加载中...").then(function(t) {
            if (t && t.success) {
                var o = !!t.body.page.records.length;
                e.setData({
                    isHasDoods: o
                });
            }
        }).catch(function(t) {
            console.log(t);
        });
    },
    linkExternal: function(t) {
        var e = t.currentTarget.dataset.url;
        -1 != e.indexOf("http") || -1 != e.indexOf("https") ? wx.navigateTo({
            url: "/pages/index/jumpExternalLinks?url=" + e,
            success: function(t) {},
            fail: function(t) {},
            complete: function(t) {}
        }) : wx.navigateTo({
            url: e,
            success: function(t) {},
            fail: function(t) {},
            complete: function(t) {}
        });
    }
});
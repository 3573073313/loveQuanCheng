var t = getApp(), e = void 0;

Page({
    data: {
        staticurl: t.globalData.staticurl,
        animWaterCan: {},
        animWaterFall: {},
        animTreeSwingData: {},
        showOrHidden: !1,
        text: "当前经验值：",
        avatarUrl: t.globalData.staticurl + "/tree/user-unlogin.png",
        treePng: t.globalData.staticurl + "/tree/tree_1.png",
        userInfo: {
            nickName: "123",
            gender: 1,
            language: "zh_CN",
            city: "Baoji",
            province: "Shaanxi",
            country: "China",
            avatarUrl: "https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83erGVgQezOcApibHLGWPBeEEz4Nv8uqpkJajdPOVW91cNfhicCpI62SBsuJH5aPyicsjyfmMCHEfw0KiaA/132"
        },
        logged: !1,
        takeSession: !1,
        requestResult: "",
        localwater: 0,
        localExperence: "0g",
        usedWater: 0,
        treesCoount: "trees: 0",
        lastanswertime: "2016/6/10 00:00:00"
    },
    onLoad: function(t) {},
    onReady: function() {
        console.log("用户信息", t.globalData.userInfo);
    },
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {},
    getOpenid: function() {},
    animationstart: function(t) {
        console.log("Tree:", t);
    },
    animationend: function(t) {
        console.log("Tree:", t);
    },
    touchTree: function() {
        null == e && (e = wx.createAnimation({
            duration: 200,
            timingFunction: "linear"
        })), e.rotate(10).step(), e.rotate(-10).step(), e.rotate(0).step(), this.setData({
            animTreeSwingData: e.export()
        });
    },
    onWaterCanTouched: function() {
        this.refreshList();
    },
    refreshList: function() {
        var t = this, e = wx.createAnimation({
            duration: 800,
            timingFunction: "linear"
        });
        e.translate(50, -300).rotate(-45).step(), e.rotate(44).step(), e.translate(0, 0).rotate(0).step(), 
        this.setData({
            animWaterCan: e.export()
        });
        setTimeout(function() {
            t.setData({
                showOrHidden: !0
            }), t.waterFullAnim();
        }, 1e3), setTimeout(function() {
            t.setData({
                showOrHidden: !1
            });
        }, 2e3);
    },
    waterFullAnim: function() {
        var t = wx.createAnimation({
            duration: 800,
            timingFunction: "linear"
        });
        t.translate(0, 40).rotate(0).step(), this.setData({
            animWaterFall: t.export()
        });
        var e = this;
        setTimeout(function() {
            t.translate(0, -40).step({
                duration: 0,
                transformOrigin: "50%,50%",
                timingFunction: "linear"
            }), e.setData({
                animWaterFall: t.export()
            });
        }, 2e3);
    }
});
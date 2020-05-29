var e = getApp();

Page({
    data: {
        isModal: !1,
        top: 0,
        windowHeight: 0,
        statusBarHeight: 0,
        staticurl: e.globalData.staticurl + "newTree/",
        isChoose: !1,
        isSeeding: !1,
        isTring: !1,
        isShowBtn: !0,
        treeUrl: "",
        treeType: "",
        treeGrowStart: !1,
        isWateringStart: !1,
        isWaterMore: !1,
        isHasTreeOver: !1,
        isFinish: !1,
        isTextShow: !1,
        isLogin: !1,
        usersTreesNum: 0,
        wateringMp3Src: e.globalData.staticurl + "mp3/watering.mp3",
        successMp3Src: e.globalData.staticurl + "mp3/getSuccess.mp3",
        treeList: [],
        activityId: ""
    },
    getMember: function() {
        var e = this;
        e.setData({
            member: wx.getStorageSync("member")
        }), console.log("是否登录", e.data.member);
    },
    seeding: function() {
        var e = this;
        e.setData({
            isChoose: !1,
            isSeeding: !0
        }), setTimeout(function() {
            e.setData({
                isSeeding: !1
            }), e.chooseTreeItem();
        }, 2500);
    },
    getHeight: function() {
        this.setData({
            windowHeight: wx.getSystemInfoSync().windowHeight,
            statusBarHeight: wx.getSystemInfoSync().statusBarHeight,
            top: wx.getMenuButtonBoundingClientRect().top
        });
    },
    chooseTree: function() {
        var e = this;
        e.setData({
            isChoose: !e.data.isChoose,
            isShowBtn: !e.data.isShowBtn
        });
    },
    chooseTreeItem: function(e) {
        var t = this;
        t.setData({
            isChoose: !1,
            isShowBtn: !1,
            treeGrowStart: !0,
            treeUrl: t.data.staticurl + "tree1.png",
            treeType: "文明"
        }), setTimeout(function() {
            t.setData({
                isHasTreeOver: !0
            });
        }, 3500);
    },
    wateringStart: function() {
        var t = this, s = this;
        e.globalData.isHasTree = 1, s.setData({
            isWateringStart: !0
        }), setTimeout(function() {
            s.setData({
                isWaterMore: !0
            }), t.wateringCtx.play();
        }, 1e3), console.log("开始浇水"), setTimeout(function() {
            console.log("浇水完成"), t.successCtx.play(), s.data.isLogin && (console.log("浇水完成登录调接口"), 
            s.isUserHasTree()), s.setData({
                isFinish: !0
            }), setTimeout(function() {
                s.setData({
                    isTextShow: !0
                });
            }, 1e3), setTimeout(function() {
                s.setData({
                    isModal: !0
                });
            }, 6e3);
        }, 4500);
    },
    toIndx: function() {
        wx.switchTab({
            url: "/pages/index/index"
        });
    },
    getTreeType: function() {
        var t = this;
        e.post("WhyMemberTree/getTreeList", {}).then(function(e) {
            e.success && t.setData({
                treeList: e.body.mapList
            });
        }).catch(function(e) {
            console.log(e);
        });
    },
    isReceiveTreePoints: function() {
        var t = {
            memberId: e.globalData.member.id,
            points: 10
        };
        e.post("WhyMemberTree/receiveTreePoints", t).then(function(e) {
            e.success;
        }).catch(function(e) {
            console.log(e);
        });
    },
    isUsersTreesNum: function() {
        var t = this;
        e.post("WhyMemberTree/currentUsersTreesNum", {}).then(function(e) {
            e.success && t.setData({
                usersTreesNum: e.body.count
            });
        }).catch(function(e) {
            console.log(e);
        });
    },
    isUserHasTree: function() {
        var t = this;
        console.log("浇水完成登录调接口----更新用户种树状态");
        var s = {
            memberId: e.globalData.member.id,
            treeType: t.data.treeType,
            activityId: t.data.activityId
        };
        e.post("WhyMemberTree/save", s).then(function(e) {
            e.success && (t.isUsersTreesNum(), t.isReceiveTreePoints());
        }).catch(function(e) {
            console.log(e);
        });
    },
    onLoad: function(t) {
        var s = e.globalData.member, i = !(!s || "" == s), o = t.activityId;
        this.setData({
            isLogin: i,
            activityId: o
        });
    },
    onReady: function() {
        this.wateringCtx = wx.createAudioContext("wateringMp3"), this.successCtx = wx.createAudioContext("successMp3");
    },
    onShow: function() {
        this.getHeight(), this.getTreeType(), this.getMember();
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});
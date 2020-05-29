var t = getApp();

Page({
    data: {
        height: 0,
        top: 0,
        staticurl: t.globalData.staticurl + "newTree/",
        isShowDetail: !1,
        toTreeing: 1,
        usersTreesNum: 0,
        activityId: ""
    },
    getHeight: function() {
        this.setData({
            height: wx.getSystemInfoSync().windowHeight,
            top: wx.getMenuButtonBoundingClientRect().top
        });
    },
    isShowModal: function() {
        var t = this;
        t.setData({
            isShowDetail: !t.data.isShowDetail
        });
    },
    toTreePlant: function() {
        var t = this;
        t.setData({
            toTreeing: .8
        }), setTimeout(function() {
            t.setData({
                toTreeing: 1
            });
            var e = "";
            e = t.data.activityId ? "../treeing/treeing?activityId=" + t.data.activityId : "../treeing/treeing?activityId", 
            wx.navigateTo({
                url: e
            });
        }, 500);
    },
    isUserHasTree: function() {
        var e = this;
        if (t.globalData.member) {
            var i = {
                memberId: t.globalData.member.id
            };
            t.post("WhyMemberTree/isTrees", i).then(function(i) {
                i && (console.log("app.globalData.isHasTree-----", t.globalData.isHasTree), i.body.isTrees || t.globalData.isHasTree ? e.isHasFinish() : e.toTreePlant());
            }).catch(function(t) {
                console.log(t);
            });
        } else e.toTreePlant();
    },
    isUsersTreesNum: function() {
        var e = this;
        t.post("WhyMemberTree/currentUsersTreesNum", {}).then(function(t) {
            t && e.setData({
                usersTreesNum: t.body.count
            });
        }).catch(function(t) {
            console.log(t);
        });
    },
    isHasFinish: function() {
        wx.showModal({
            title: "亲爱的" + t.globalData.member.nickname,
            content: "您已经参与过本次植树活动喽！",
            showCancel: !1
        });
    },
    onLoad: function(t) {
        var e = t.activityId;
        this.setData({
            activityId: e
        }), this.getHeight();
    },
    onReady: function() {},
    onShow: function() {
        this.isUsersTreesNum();
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});
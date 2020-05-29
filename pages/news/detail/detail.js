function t(t, e, a) {
    return e in t ? Object.defineProperty(t, e, {
        value: a,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[e] = a, t;
}

var e, a = require("../../../html-view/index"), o = getApp();

Page((e = {
    data: {
        imgStar: getApp().globalData.staticurl + "iconCollect.png",
        imgStarselect: getApp().globalData.staticurl + "iconCollectFill.png",
        isFavourite: !1,
        isDefault: !0,
        isSnapClick: !1,
        member: {},
        news: {},
        timer: null,
        html: "",
        readTime: 0,
        staticurl: getApp().globalData.staticurl,
        upContentNum: "",
        readingNum: "",
        contId: "",
        isLikeStatus: "",
        optionId: "",
        shareContentNum: ""
    },
    getFavourite: function() {
        var t = this, e = {
            memberId: t.data.member.id,
            contentId: t.data.optionId
        };
        o.post("/WhyMemberFavourite/getByMemberId", e, "加载中...").then(function(e) {
            e.success && (console.log(e), null != e.body.data && e.body.data.length > 0 ? t.setData({
                isFavourite: !0
            }) : t.setData({
                isFavourite: !1
            }));
        }).catch(function(t) {
            console.log(t);
        });
    },
    doFavourite: function() {
        var t = this;
        if (t.data.isDefault) t.setData({
            login: !0
        }); else {
            var e = t.data.news.listImg, a = e.indexOf(",") > 0 ? e.split(",")[0] : e, n = {
                memberId: t.data.member.id,
                contentId: t.data.news.id,
                contentType: 3,
                img: a,
                contentName: t.data.news.contentName
            };
            o.post("/WhyMemberFavourite/save", n, "加载中...").then(function(e) {
                e.success && t.getFavourite();
            }).catch(function(t) {
                console.log(t);
            });
        }
    },
    onLoad: function(t) {
        var e = this, a = t.id;
        e.data.optionId = a, console.log("option---", t);
        e.setData({
            optionId: e.data.optionId,
            videoSrc: t.video ? t.video : ""
        }), e.getContent(a), e.getDetail();
    },
    onUnload: function() {
        var t = this;
        wx.setStorageSync("read_time", t.data.readTime), clearInterval(t.data.timer);
    },
    onShow: function() {
        var t = this, e = wx.getStorageSync("read_time");
        void 0 !== e && "" != e || (e = 0);
        var a = setInterval(function() {
            e++, t.setData({
                readTime: e
            }), e >= 60 && (t.autoFinishTask(), clearInterval(a));
        }, 1e3);
        t.setData({
            timer: a
        }), t.watchBack();
    }
}, t(e, "onUnload", function() {
    this.saveRead();
}), t(e, "getNum", function() {
    var t = this, e = {
        contentId: t.data.contId
    };
    o.post("/JnContentClickBrowse/countNum", e, "加载中...").then(function(e) {
        e && (console.log(e), t.data.readingNum = e.body.readingNum, t.data.upContentNum = e.body.upContentNum, 
        t.data.shareContentNum = e.body.shareContentNum, t.setData({
            isSnapClick: !1,
            readingNum: t.data.readingNum,
            upContentNum: t.data.upContentNum,
            shareContentNum: t.data.shareContentNum
        }));
    }).catch(function(t) {
        console.log(t);
    });
}), t(e, "getContent", function(t) {
    console.log("阅读id", t);
    var e = this, n = {
        id: t
    };
    o.post("/JnContentManagement/get", n, "加载中...").then(function(t) {
        if (t) {
            console.log(t), e.data.contId = t.body.data.id, e.setData({
                contId: e.data.contId
            });
            var o = new a(t.body.data.content).nodes;
            console.log("html", o), t.body.data.listImg = t.body.data.listImg.split(","), t.body.data.releaseDate = t.body.data.releaseDate.split(" ")[0], 
            e.setData({
                videoSrc: t.body.data.video ? t.body.data.video : ""
            }), e.setData({
                news: t.body.data,
                html: o
            }), wx.setNavigationBarTitle({
                title: t.body.data.contentName
            }), e.getNum(), e.isLike();
        }
    }).catch(function(t) {
        console.log(t);
    });
}), t(e, "lookImg", function(t) {
    console.log(t);
    var e = t.currentTarget.dataset.src;
    wx.previewImage({
        current: e,
        urls: [ e ],
        complete: function(t) {}
    });
}), t(e, "watchBack", function() {
    var t = this, e = o.getMember();
    e && "" != e ? (t.data.isDefault = !1, t.setData({
        isDefault: !1,
        member: e,
        memberId: e.id
    }), t.getFavourite()) : (t.data.isDefault = !0, t.setData({
        isDefault: !0
    }));
}), t(e, "autoFinishTask", function() {
    var t = {
        taskType: "2",
        platformTaskType: "3",
        memberId: wx.getStorageSync("member").id
    };
    o.post("/JnTask/autoFinishTask", t).then(function(t) {
        t.success && wx.setStorageSync("read_time", "");
    }).catch(function(t) {
        console.log(t);
    });
}), t(e, "isLike", function() {
    var t = this, e = {
        memberId: t.data.memberId,
        contentId: t.data.contId,
        type: "1"
    };
    o.post("/JnContentClickBrowse/getMemberUp", e, "加载中...").then(function(e) {
        if (e) {
            var a = e.body.count;
            console.log("是否点赞", e), t.data.isLikeStatus = a, t.setData({
                isLikeStatus: t.data.isLikeStatus
            });
        }
    }).catch(function(t) {
        console.log(t);
    });
}), t(e, "clickLike", function() {
    console.log("点击点击点击0000");
    var t = this;
    if (t.data.isSnapClick) wx.showToast({
        title: "哎呀！点的太快了",
        icon: "none"
    }); else {
        var e = t.data.upContentNum, a = t.data.isLikeStatus;
        e = (a = a > 0 ? 0 : 1) > 0 ? e + 1 : e - 1, t.setData({
            upContentNum: e,
            isLikeStatus: a,
            isSnapClick: !0
        });
        var n = {
            memberId: t.data.memberId,
            contentId: t.data.contId,
            type: "1"
        };
        o.post("/JnContentClickBrowse/saveContent", n, "加载中...").then(function(e) {
            e && ("0" == e.errorCode && (console.log("点赞"), t.saveTaskScore("2")), "-1" == e.errorCode && console.log("取消赞"), 
            t.isLike(), t.getNum());
        }).catch(function(t) {
            console.log(t);
        });
    }
}), t(e, "saveRead", function() {
    var t = this, e = {
        memberId: t.data.memberId,
        contentId: t.data.contId,
        type: "2"
    };
    console.log("阅读量对象", e), o.post("/JnContentClickBrowse/saveContent", e, "加载中...").then(function(e) {
        e && "0" == e.errorCode && (console.log("阅读量"), t.getNum());
    }).catch(function(t) {
        console.log(t);
    });
}), t(e, "onShareAppMessage", function(t) {
    console.log(t);
    var e = this, a = t.target.dataset.item;
    return console.log("转发00000"), e.saveTaskScore("1"), e.saveShare(), {
        title: a.contentName,
        path: "/pages/news/detail/detail?id=" + e.data.optionId,
        success: function(t) {
            console.log("转发成功");
        },
        fail: function(t) {
            console.log("转发失败", t);
        }
    };
}), t(e, "saveShare", function() {
    console.log("存转发次数");
    var t = this, e = {
        memberId: t.data.memberId,
        contentId: t.data.contId,
        type: "3"
    };
    o.post("/JnContentClickBrowse/saveShareContent", e, "加载中...").then(function(e) {
        e && t.getNum();
    }).catch(function(t) {
        console.log(t);
    });
}), t(e, "saveTaskScore", function(t) {
    var e = {
        memberId: this.data.memberId,
        type: t
    };
    o.post("/JnShareLog/save", e, "加载中...").then(function(t) {}).catch(function(t) {
        console.log(t);
    });
}), t(e, "getDetail", function() {}), e));
var e = getApp(), t = require("../../utils/qqmap-wx-jssdk.js"), i = require("../../utils/util.js");

new t({
    key: "P26BZ-IRUK4-ZW5UP-XPMQL-F54SQ-3HBDW"
});

Component({
    properties: {
        staticurl: {
            type: String
        },
        navToType: {
            type: String
        },
        noIsType: {
            type: String
        },
        activityList: {
            type: Array
        },
        show: {
            type: Boolean,
            value: !0
        }
    },
    data: {},
    methods: {
        toDetail: function(e) {
            var t = this, i = e.currentTarget.dataset.item, n = t.data.noIsType, a = "";
            1 != t.data.navToType ? (a = "/pages/zhuanfen/zhuanfenorder/zhuanfenorder?id=" + i.id + "&type=" + (i.type ? i.type : n) + "&expireNum=" + i.expireNum + ((i.typeName ? "-1" == i.typeName.indexOf("投稿") : !i.activityTypeName || "-1" == i.activityTypeName.indexOf("投稿")) || 2 != i.type ? "" : "&contribute=1"), 
            wx.navigateTo({
                url: a
            })) : t.isHasFinish(i);
        },
        isHasFinish: i.throttle(function(t) {
            var i = this, n = e.getMember();
            if (2 == n.authStatus) if (t.expire > 0) wx.showToast({
                title: "该问卷已过期！",
                icon: "none"
            }); else {
                var a = {
                    memberId: n.id,
                    questionnaireId: t.id
                };
                e.post("JnQuestionBaseInfo/getByMemberId", {
                    memberId: n.id
                }).then(function(n) {
                    n.success && (n.body.count > 0 ? e.post("JnQuestionRecord/getJnQuestionRecordByMemberId", a).then(function(e) {
                        e.success && (e.body.count > 0 ? t.isRepeat && 1 == t.isRepeat ? wx.navigateTo({
                            url: "/pages/index/questionnaire/questionnaire?id=" + t.id + "&isRepeat=1"
                        }) : wx.showToast({
                            title: "您已参与过本次活动了哦！",
                            icon: "none"
                        }) : wx.navigateTo({
                            url: "/pages/index/questionnaire/questionnaire?id=" + t.id
                        }));
                    }) : i.setData({
                        showModal1: !0
                    }));
                });
            } else i.setData({
                showModal: !0
            });
        }, 1e3),
        confirm: function() {
            wx.navigateTo({
                url: "/pages/mine/woderealname/woderealname"
            });
        },
        confirm1: function() {
            wx.navigateTo({
                url: "/pages/index/questionnaire/questionnaire"
            });
        },
        setIsShow: function() {
            var e = this, t = this, i = t.data.activityList;
            console.log("activityList---", i), i.forEach(function(n, a) {
                var o = wx.createSelectorQuery().in(e);
                console.log("index---", a), o.select("#contentText" + a).boundingClientRect(function(e) {
                    console.log("rect---", e), e.height > 40 ? n.exceedTwo = !0 : n.exceedTwo = !1, 
                    a == i.length - 1 && t.setData({
                        activityList: i
                    });
                }).exec();
            });
        }
    },
    pageLifetimes: {
        show: function() {}
    }
});
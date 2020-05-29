var t = getApp(), e = new (require("../../utils/qqmap-wx-jssdk.js"))({
    key: "P26BZ-IRUK4-ZW5UP-XPMQL-F54SQ-3HBDW"
});

Component({
    properties: {
        staticurl: {
            type: String
        },
        memberId: {
            type: String
        },
        itemList: {
            type: Array
        },
        currentTab: {
            type: Number,
            value: 0
        },
        show: {
            type: Boolean
        },
        isAddGoodthings: {
            type: Boolean
        },
        isNoFromShare: {
            type: Boolean
        },
        isList: {
            type: Boolean
        },
        showKeyBoard: {
            type: Boolean
        }
    },
    data: {
        show: !0
    },
    methods: {
        toIndexModal: function() {
            wx.showModal({
                title: "温馨提示",
                content: "登录后才可以点赞、分享、查看活动详情哦！快去首页登录了解更多吧！",
                cancelText: "我再看看",
                confirmText: "去首页",
                success: function(t) {
                    t.confirm ? (console.log("用户点击确定"), wx.switchTab({
                        url: "/pages/index/index"
                    })) : t.cancel && console.log("用户点击取消");
                }
            });
        },
        delType: function(e) {
            var a = this, n = e.currentTarget.dataset.id;
            console.log("delete:" + n);
            var o = "";
            o = a.data.isAddGoodthings ? "/JnGoodManagement/delete" : "/JnHandyManagement/delete", 
            wx.showModal({
                title: "提示",
                content: "确认要删除吗?",
                success: function(e) {
                    e.confirm ? t.post(o, {
                        id: n
                    }, "加载中...").then(function(t) {
                        t.success && (a.data.itemList.length > 1 && a.setFuc(), a.data.isAddGoodthings && a.getGoodthingNumber());
                    }).catch(function(t) {
                        console.log(t);
                    }) : e.cancel && console.log("用户点击取消");
                }
            });
        },
        goodMysSnap: function(e) {
            var a = this, n = e.currentTarget.dataset.id, o = e.currentTarget.dataset.type;
            if ("2" == o) {
                var i = e.currentTarget.dataset.index;
                if (a.data.isSnapClick) return void wx.showToast({
                    title: "哎呀！点的太快了",
                    icon: "none"
                });
                var s = a.data.itemList;
                s[i].number = s[i].number > 0 ? 0 : 1, s[i].dianZanNum = s[i].number > 0 ? s[i].dianZanNum + 1 : s[i].dianZanNum - 1, 
                a.setData({
                    itemList: s,
                    isScrollTop: !0,
                    isSnapClick: !0
                });
            }
            var r = {
                handyId: n,
                memberId: a.data.memberId,
                type: o
            };
            t.post("JnHandyManagementLog/save", r).then(function(t) {
                console.log(t), t.success && (a.data.itemList.length > 1 && a.setFuc(), a.goodShare(o));
            }).catch(function(t) {
                console.log(t);
            });
        },
        goodShare: function(e) {
            var a = {
                memberId: this.data.memberId,
                type: e
            };
            t.post("JnShareLog/save", a).then(function(t) {
                t.success;
            }).catch(function(t) {
                console.log(t);
            });
        },
        setFuc: function(e) {
            var a = this, n = {};
            2 != a.data.currentTab || (n.memberId = t.getMember().id), e ? n.pageNo = e : a.data.pageCurrent && (n.pageNo = a.data.pageCurrent), 
            a.getList(n);
        },
        getList: function(e) {
            var a = this, n = "", o = a.data.currentTab;
            console.log("currentTab---", o), a.data.isAddGoodthings ? (n = "/JnGoodManagement/list", 
            a.data.isOldGoodthing || 0 != o || (e.memberId = "")) : n = "/JnHandyManagement/list", 
            t.post(n, e, "加载中...").then(function(t) {
                if (t.success) {
                    var n = a.data.itemList, i = t.body.page.records;
                    i.forEach(function(t) {
                        t.pictures && (console.log("pictures---", t.pictures), t.picturesList = t.pictures), 
                        e.pageNo > 1 && n.push(t), t.createDate = t.createDate.substring(5, t.createDate.length);
                    }), e.pageNo > 1 && (i = n), a.data.isScrollTop, console.log("itemList-----", i), 
                    a.setData({
                        itemList: i,
                        currentTab: o,
                        pages: t.body.page.pages,
                        pageCurrent: t.body.page.current,
                        isSnapClick: !1,
                        isScrollTop: !1
                    }), a.getTypeList();
                }
            }).catch(function(t) {});
        },
        commentList: function(t) {
            var e = this, a = JSON.stringify(t.currentTarget.dataset.item);
            wx.navigateTo({
                url: "/pages/index/indexsnap/indexsnapDetail/indexsnapDetail?memberId=" + e.data.memberId + "&item=" + a + "&isNoFromShare=1"
            });
        },
        getGoodthingNumber: function() {
            var e = this;
            t.post("JnGoodManagement/getGoodThingCount", {
                memberId: e.data.memberId
            }).then(function(t) {
                if (t.success) {
                    var a = e.data.myGoodthingIconList, n = t.body.data;
                    a[0].count = n.goodThingNum + "件", a[1].count = n.scoreCount + "分", a[2].count = n.rank + "名", 
                    e.setData({
                        myGoodthingIconList: a
                    });
                }
            }).catch(function(t) {});
        },
        openMap: function(t) {
            var a = this, n = t.currentTarget.dataset.item.address;
            e.geocoder({
                address: n,
                success: function(t) {
                    console.log(t), a.setData({
                        latitude: t.result.location.lat,
                        longitude: t.result.location.lng
                    }), wx.openLocation({
                        latitude: a.data.latitude,
                        longitude: a.data.longitude,
                        name: n
                    });
                },
                fail: function(t) {
                    console.log(t);
                }
            });
        },
        toActDetail: function(t) {
            wx.navigateTo({
                url: "/pages/zhuanfen/zhuanfenorder/zhuanfenorder?id=" + t.currentTarget.dataset.id + "&type=2"
            });
        },
        lookImg: function(t) {
            var e = t.currentTarget.dataset.img, a = t.currentTarget.dataset.list;
            console.log("list---", a), console.log("img---", e), this.setData({
                isShowImg: !0
            }), wx.previewImage({
                current: e,
                urls: a
            });
        }
    }
});
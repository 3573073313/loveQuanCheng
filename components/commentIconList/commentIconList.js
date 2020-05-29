var t = getApp();

new (require("../../utils/qqmap-wx-jssdk.js"))({
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
        item: {
            type: Object
        },
        itemList: {
            type: Array
        },
        currentTab: {
            type: Number,
            value: 0
        },
        show: {
            type: Boolean,
            value: !0
        },
        isAddGoodthings: {
            type: Boolean
        },
        isList: {
            type: Boolean
        },
        isFromComment: {
            type: Boolean
        }
    },
    data: {},
    methods: {
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
                        t.success && (a.data.isList ? (a.data.itemList.length > 1 && a.setFuc(), a.data.isAddGoodthings && a.getGoodthingNumber()) : wx.navigateBack({
                            delta: 1
                        }));
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
                        t.pictures && (t.picturesList = [], t.picturesList = t.pictures.split(",")), e.pageNo > 1 && n.push(t), 
                        t.createDate = t.createDate.substring(5, t.createDate.length);
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
        writeComment: function(t) {
            var e = this, a = t.currentTarget.dataset.item, n = t.currentTarget.dataset.submit;
            console.log("item--", a), console.log("item.showKeyBoard--", a.showKeyBoard), void 0 == a.showKeyBoard ? a.showKeyBoard = !0 : a.showKeyBoard = !a.showKeyBoard, 
            e.data.isList && !n ? wx.navigateTo({
                url: "/pages/index/indexsnap/indexsnapDetail/indexsnapDetail?memberId=" + e.data.memberId + "&item=" + JSON.stringify(a) + "&isNoFromShare=1"
            }) : e.setData({
                item: a,
                show: !e.data.isFromComment
            });
        }
    }
});
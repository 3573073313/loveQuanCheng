var t = getApp(), e = new (require("../../utils/qqmap-wx-jssdk.js"))({
    key: "P26BZ-IRUK4-ZW5UP-XPMQL-F54SQ-3HBDW"
});

Page({
    data: {
        login: !1,
        isDefault: !0,
        member: {},
        currentTab: "0",
        staticurl: getApp().globalData.staticurl,
        culturelists: [],
        obj0: {
            pageNo: 1,
            pageSize: 10
        },
        isSuccess: !1,
        hasMore0: !0,
        loadMore0: !0,
        articlelistLen0: !1,
        powerList: [],
        obj1: {
            pageNo: 1,
            pageSize: 10,
            typeId: "935ae107c3a8476cb1a3bd8b5fe13486"
        },
        isSnapClick: !1,
        hasMore1: !0,
        loadMore1: !0,
        articlelistLen1: !1,
        noculList: [],
        obj2: {
            pageNo: 1,
            pageSize: 10,
            typeId: "a4d0961a1f9b43e79b4e979859278171"
        },
        newsTypeList: [],
        hasMore2: !0,
        loadMore2: !0,
        articlelistLen2: !1,
        isShowImg: !1,
        newCurrentTab: null,
        scrollLeft: 0
    },
    toDetail: function(t) {
        var e = this;
        if (e.data.isDefault) e.setData({
            login: !0
        }); else {
            var a = t.currentTarget.dataset.type, o = t.currentTarget.dataset.url;
            "navigate" == a && wx.navigateTo({
                url: o
            }), "switchTab" == a && wx.switchTab({
                url: o
            });
        }
    },
    getTypeList: function() {
        var e = this;
        t.post("WhyContentTopic/list", {}).then(function(t) {
            console.log("res----类型", t), t.success && e.setData({
                newsTypeList: t.body.page.records,
                isSuccess: !0
            });
        }).catch(function(t) {});
    },
    openMap: function(t) {
        var a = this, o = t.currentTarget.dataset.item.address;
        e.geocoder({
            address: o,
            success: function(t) {
                console.log(t), a.setData({
                    latitude: t.result.location.lat,
                    longitude: t.result.location.lng
                }), wx.openLocation({
                    latitude: a.data.latitude,
                    longitude: a.data.longitude,
                    name: o
                });
            },
            fail: function(t) {
                console.log(t);
            }
        });
    },
    onHide: function() {},
    onLoad: function(t) {
        console.log("加载 ", t);
        var e = this;
        t.scrollTop && (wx.pageScrollTo({
            scrollTop: parseInt(t.scrollTop)
        }), this.setData({
            currentTab: parseInt(t.currentTab)
        }));
        var a = e.data.obj0;
        wx.getStorageSync("newCurrentTab") && "" != wx.getStorageSync("newCurrentTab") ? a.contentType = wx.getStorageSync("newCurrentTab") : a.contentType = "", 
        e.data.obj1.pageNo = 1, a.pageNo = 1, e.data.obj2.pageNo = 1, e.setData({
            currentTab: e.data.currentTab,
            obj1: e.data.obj1,
            obj0: a,
            obj2: e.data.obj2
        }), e.watchBack(), e.getContentList();
    },
    onShow: function() {
        console.log("显示显示");
        var t = this;
        t.setData({
            isShowImg: !1
        }), t.watchBack(), t.getTypeList(), wx.pageScrollTo({
            scrollTop: 0
        });
        var e = t.data.obj0;
        wx.getStorageSync("newCurrentTab") && "" != wx.getStorageSync("newCurrentTab") ? e.contentType = wx.getStorageSync("newCurrentTab") : e.contentType = "", 
        console.log("obj0---", e), e.pageNo = 1, t.setData({
            obj0: e
        }), t.getContentList();
    },
    clickNewTab: function(t) {
        var e = this, a = t.currentTarget.dataset.current, o = e.data.obj0;
        o.pageNo = 1, o.contentType = t.currentTarget.dataset.id, e.setData({
            newCurrentTab: a,
            culturelists: [],
            powerList: [],
            obj0: o,
            hasMore0: !0,
            loadMore0: !0,
            currentTab: null
        }), e.getContentList();
    },
    clickTab: function(t) {
        var e = this;
        e.setData({
            currentTab: t.currentTarget.dataset.current,
            culturelists: [],
            powerList: [],
            newCurrentTab: null
        }), e.data.obj0.pageNo = 1, e.data.obj0.contentType = "", e.setData({
            obj0: e.data.obj0,
            hasMore0: !0,
            loadMore0: !0,
            articlelistLen0: !1
        }), e.getContentList();
    },
    clickDetail: function(t) {
        var e = this;
        console.log(t);
        var a = t.currentTarget.dataset.item;
        console.log(a), e.data.obj0.pageNo = 1, wx.navigateTo({
            url: "/pages/news/detail/detail?id=" + a.id
        }), e.setData({
            obj0: e.data.obj0,
            culturelists: [],
            hasMore0: !0,
            loadMore0: !0,
            articlelistLen0: !1
        });
    },
    watchBack: function() {
        var e = this, a = "";
        (a = t.getMember()) && "" != a ? (e.data.isDefault = !1, e.setData({
            isDefault: !1,
            member: a
        })) : (e.data.isDefault = !0, e.setData({
            isDefault: !0
        }));
    },
    onConfirm: function(e) {
        var a = this;
        console.log(e), console.log("onConfirm:" + JSON.stringify(e)), t.onGotUserInfo(e.detail.detail, function() {
            var e = wx.getStorageSync("member");
            t.setUseTime(), console.log("callback:" + JSON.stringify(e)), a.setData({
                member: e,
                login: !1,
                isDefault: !1
            });
        });
    },
    onCancel: function() {
        this.setData({
            login: !1
        });
    },
    handleLogin: function() {
        this.setData({
            login: !0
        });
    },
    onReachBottom: function() {
        var t = this;
        console.log("到底了"), console.log("到底了hasMore0", t.data.hasMore0), console.log("到底了loadMore0", t.data.loadMore0), 
        t.data.hasMore0 && !t.data.loadMore0 ? (t.data.loadMore0 = !0, t.getContentList()) : t.data.hasMore0 || wx.showToast({
            title: "没有更多了",
            icon: "none",
            duration: 2e3
        });
    },
    onPullDownRefresh: function() {
        var t = this;
        t.data.obj0.pageNo = 1, t.setData({
            obj0: t.data.obj0,
            culturelists: [],
            hasMore0: !0,
            loadMore0: !0,
            articlelistLen0: !1
        }), t.getContentList(), wx.stopPullDownRefresh();
    },
    getContentList: function() {
        var e = this;
        t.post("/JnContentManagement/list", e.data.obj0, "加载中...").then(function(t) {
            if (t) {
                var a = t.body.page.records;
                0 == a.length && (e.data.articlelistLen0 = !0, e.setData({
                    articlelistLen0: e.data.articlelistLen0
                })), a.forEach(function(t, a) {
                    var o = t.listImg;
                    if ("-1" == o) {
                        if (t.listImg = "", t.video && t.content) if (t.content.indexOf("<img") > -1) {
                            var n = t.content.indexOf("<img"), s = t.content.indexOf("/>");
                            console.log("item.content---", t.content);
                            var r = t.content.substring(n, s + 2), i = r.indexOf('src="'), c = r.indexOf('g"');
                            t.videoImg = r.substring(i + 5, c + 1);
                        } else t.videoImg = e.data.staticurl + "logo_qx.jpg";
                    } else t.listImg = o.split(",");
                    t.releaseDate = t.releaseDate.split(" ")[0];
                }), 1 == e.data.obj0.pageNo ? (e.data.obj0.pageNo = t.body.page.current + 1, e.setData({
                    obj0: e.data.obj0,
                    culturelists: a,
                    loadMore0: !1
                })) : (a.forEach(function(t, a, o) {
                    e.data.culturelists.push(t);
                }), e.data.obj0.pageNo = t.body.page.current + 1, e.setData({
                    obj0: e.data.obj0,
                    culturelists: e.data.culturelists,
                    loadMore0: !1
                })), t.body.page.current == t.body.page.pages && e.setData({
                    hasMore0: !1,
                    loadMore0: !1
                }), wx.getStorageSync("newCurrentTab") && wx.setStorageSync("newCurrentTab", "");
            }
        }).catch(function(t) {
            console.log(t);
        });
    },
    getPowerList: function() {
        var e = this;
        t.post("/JnHandyManagement/list", e.data.obj1, "加载中...").then(function(t) {
            if (console.log(t), t) {
                e.setData({
                    isSnapClick: !1
                });
                var a = t.body.page.records;
                0 == a.length && (e.data.articlelistLen1 = !0, e.setData({
                    articlelistLen1: e.data.articlelistLen1
                })), a.forEach(function(t, e) {
                    t.pictures = t.pictures.split(","), t.member && (t.fromName = t.member.nickname), 
                    t.address && (t.address = t.address.slice(3, t.address.length)), t.createDate = t.createDate.substring(5, t.createDate.length);
                }), 1 == e.data.obj1.pageNo ? (e.data.obj1.pageNo = t.body.page.current + 1, e.setData({
                    obj1: e.data.obj1,
                    powerList: a,
                    loadMore1: !1
                })) : (a.forEach(function(t, a, o) {
                    e.data.powerList.push(t);
                }), console.log(e.data.powerList), e.data.obj1.pageNo = t.body.page.current + 1, 
                e.setData({
                    obj1: e.data.obj1,
                    powerList: e.data.powerList,
                    loadMore1: !1
                })), t.body.page.current == t.body.page.pages && e.setData({
                    hasMore1: !1
                });
            }
        }).catch(function(t) {
            console.log(t);
        });
    },
    getNocultureList: function() {
        var e = this;
        t.post("/JnHandyManagement/list", e.data.obj2, "加载中...").then(function(t) {
            if (console.log(t), t) {
                var a = t.body.page.records;
                0 == a.length && (e.data.articlelistLen2 = !0, e.setData({
                    articlelistLen2: e.data.articlelistLen2
                })), a.forEach(function(t, e) {
                    t.pictures = t.pictures.split(","), t.member && (t.fromName = t.member.nickname);
                }), 1 == e.data.obj2.pageNo ? (e.data.obj2.pageNo = t.body.page.current + 1, e.setData({
                    obj2: e.data.obj2,
                    noculList: a,
                    loadMore2: !1
                })) : (a.forEach(function(t, a, o) {
                    e.data.noculList.push(t);
                }), e.data.obj2.pageNo = t.body.page.current + 1, e.setData({
                    obj2: e.data.obj2,
                    noculList: e.data.noculList,
                    loadMore2: !1
                })), t.body.page.current == t.body.page.pages && e.setData({
                    hasMore2: !1
                });
            }
        }).catch(function(t) {
            console.log(t);
        });
    },
    goodMysSnap: function(e) {
        var a = this, o = e.currentTarget.dataset.id, n = e.currentTarget.dataset.type;
        if ("2" == n) {
            var s = e.currentTarget.dataset.index;
            if (a.data.isSnapClick) return void wx.showToast({
                title: "哎呀！点的太快了",
                icon: "none"
            });
            var r = a.data.powerList;
            r[s].number = r[s].number > 0 ? 0 : 1, r[s].dianZanNum = r[s].number > 0 ? r[s].dianZanNum + 1 : r[s].dianZanNum - 1, 
            a.setData({
                powerList: r,
                isSnapClick: !0
            });
        }
        var i = {
            handyId: o,
            memberId: a.data.member.id,
            type: n
        };
        t.post("JnHandyManagementLog/save", i).then(function(t) {
            if (console.log(t), t.success) {
                var e = a.data.obj1;
                e.pageNo -= 1, a.setData({
                    obj1: e
                }), a.getPowerList(), a.goodShare(n);
            }
        }).catch(function(t) {
            console.log(t);
        });
    },
    goodShare: function(e) {
        var a = {
            memberId: this.data.member.id,
            type: e
        };
        t.post("JnShareLog/save", a).then(function(t) {
            t.success;
        }).catch(function(t) {
            console.log(t);
        });
    },
    onPageScroll: function(t) {
        this.data.isShowImg || this.setData({
            scrollTop: t.scrollTop
        });
    },
    onShareAppMessage: function(t) {
        var e = this, a = t.target.dataset.item;
        t.target.dataset.type;
        return t.currentTarget = t.target, e.goodMysSnap(t), e.setData({
            isShare: !0
        }), {
            title: a.content,
            path: "/pages/index/indexsnap/indexsnapDetail/indexsnapDetail?item=" + JSON.stringify(a),
            imageUrl: a.pictures ? a.pictures[0] : "",
            desc: a.name
        };
    },
    imgPreview: function(t) {
        console.log(t), this.setData({
            isShowImg: !0
        });
        var e = t.target.dataset.index, a = t.target.dataset.item.pictures;
        wx.previewImage({
            current: a[e],
            urls: a,
            complete: function(t) {}
        });
    }
});
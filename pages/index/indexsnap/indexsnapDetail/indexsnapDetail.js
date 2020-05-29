getApp();

var t = new (require("../../../../utils/qqmap-wx-jssdk.js"))({
    key: "P26BZ-IRUK4-ZW5UP-XPMQL-F54SQ-3HBDW"
});

Page({
    data: {
        itemList: [],
        staticurl: getApp().globalData.staticurl,
        commentList: [ {
            member: {
                nickname: "米花",
                face: "https://wx.qlogo.cn/mmopen/vi_32/gWU8st51rk71hmZ2AowCZeGnSVMZUh0fBaWeuGibrWXltnvTbDUe2HI6PnKwFWw0FTsOc0SVlriakSmKekDC1pbQ/132",
                sign: "永远相信美好的事情即将发生"
            },
            content: "为中国人民智慧点赞，加油！中国人是最棒的，威武！为中国人民智慧点赞，加油！中国人是最棒的，威武！为中国人民智慧点赞，加油！中国人是最棒的，威武！为中国人民智慧点赞，加油！中国人是最棒的，威武！为中国人民智慧点赞",
            num: 0,
            dianzanNum: 1954,
            creatDate: "2020-04-03 08:41",
            authComment: {
                content: "同为中国人民加油！",
                creatDate: "2020-04-03 12:45"
            }
        }, {
            member: {
                nickname: "悦过这片海",
                face: "https://wx.qlogo.cn/mmopen/vi_32/HF9JMKW89ibEWGVbpqUP1hC7xtwMia6Zeich0MOCFDWA4d6eicqedTAeZicicKJqrUMvemWNW48DpXrBeokCwmuiaE94Q/132",
                sign: ""
            },
            content: "你好 加油！中国人是最棒的，威武！为中国人民智慧点赞",
            num: 1,
            dianzanNum: 1254,
            creatDate: "2020-04-03 08:41"
        }, {
            member: {
                nickname: "乐一乐",
                face: "http://jn.zhuwentec.com/jn-cultural-cdn/statics///ssp/photo/20200415/f22d872039f64cdb83ee5a9e937f2b2b.jpg",
                sign: "人生若只如初见 何事悲风秋画扇"
            },
            content: "投稿记录！为中国人民智慧点赞，加油！中国人是最棒的，威武！为中国人民智慧点赞",
            num: 1,
            dianzanNum: 254,
            creatDate: "2020-04-03 08:41",
            authComment: {
                content: "中国人民加油！",
                creatDate: "2020-04-03 12:45"
            }
        }, {
            member: {
                nickname: "米花",
                face: "https://wx.qlogo.cn/mmopen/vi_32/gWU8st51rk71hmZ2AowCZeGnSVMZUh0fBaWeuGibrWXltnvTbDUe2HI6PnKwFWw0FTsOc0SVlriakSmKekDC1pbQ/132",
                sign: "永远相信美好的事情即将发生"
            },
            content: "为中国人民智慧点赞，加油！中国人是最棒的，威武！为中国人民智慧点赞，加油！中国人是最棒的，威武！为中国人民智慧点赞，加油！中国人是最棒的，威武！为中国人民智慧点赞，加油！中国人是最棒的，威武！为中国人民智慧点赞",
            num: 0,
            dianzanNum: 124,
            creatDate: "2020-04-03 08:41",
            authComment: {
                content: "同为中国人民加油！",
                creatDate: "2020-04-03 12:45"
            }
        } ],
        showKeyBoard: !0
    },
    getCommentList: function() {
        var t = this, e = t.data.commentList;
        e.forEach(function(t) {
            t.creatDate = t.creatDate.substring(5, t.creatDate.length), t.authComment && (t.authComment.creatDate = t.authComment.creatDate.substring(5, t.authComment.creatDate.length));
        }), t.setData({
            commentList: e
        });
    },
    goIndex: function() {
        wx.switchTab({
            url: "/pages/index/index"
        });
    },
    onLoad: function(t) {
        console.log("options----", t);
        var e = JSON.parse(t.item);
        console.log("item----", e), console.log("item.pict---ures----", e.pictures), e.pictures && ("string" == typeof e.pictures ? e.picturesList = e.pictures.indexOf(",") > 0 ? e.pictures.split(",") : [ e.pictures ] : e.picturesList = e.pictures), 
        this.setData({
            itemList: [ e ],
            isNoFromShare: !!t.isNoFromShare,
            memberId: t.memberId ? t.memberId : ""
        }), this.getCommentList();
    },
    lookImg: function(t) {
        var e = t.currentTarget.dataset.img, n = t.currentTarget.dataset.list;
        this.setData({
            isShowImg: !0
        }), wx.previewImage({
            current: e,
            urls: n
        });
    },
    openMap: function(e) {
        var n = this, a = e.currentTarget.dataset.item.address;
        t.geocoder({
            address: a,
            success: function(t) {
                console.log(t), n.setData({
                    latitude: t.result.location.lat,
                    longitude: t.result.location.lng
                }), wx.openLocation({
                    latitude: n.data.latitude,
                    longitude: n.data.longitude,
                    name: a
                });
            },
            fail: function(t) {
                console.log(t);
            }
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {}
});
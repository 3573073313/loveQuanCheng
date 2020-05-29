getApp(), new (require("../../utils/qqmap-wx-jssdk.js"))({
    key: "P26BZ-IRUK4-ZW5UP-XPMQL-F54SQ-3HBDW"
});

Component({
    properties: {
        staticurl: {
            type: String
        },
        commentList: {
            type: Array
        },
        show: {
            type: Boolean
        }
    },
    data: {
        show: !0
    },
    methods: {
        writeComment: function(t) {
            var e = this, s = e.data.commentList;
            s[t.currentTarget.dataset.index].showKeyBoard = !0, e.setData({
                commentList: s
            });
        },
        showAll: function(t) {
            var e = this, s = e.data.commentList, i = t.currentTarget.dataset.index;
            void 0 != s[i].isShowAll ? s[i].isShowAll = !s[i].isShowAll : s[i].isShowAll = !0, 
            e.setData({
                commentList: s
            });
        },
        setIsShow: function() {
            var t = this, e = this, s = e.data.commentList;
            s.forEach(function(i, o) {
                wx.createSelectorQuery().in(t).select("#contentText" + o).boundingClientRect(function(t) {
                    t.height > 100 ? i.exceedFive = !0 : i.exceedFive = !1, o == s.length - 1 && e.setData({
                        commentList: s
                    });
                }).exec();
            });
        }
    },
    pageLifetimes: {
        show: function() {
            this.setIsShow();
        }
    }
});
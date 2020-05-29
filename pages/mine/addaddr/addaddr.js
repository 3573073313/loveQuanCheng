var a = getApp();

Page({
    data: {
        staticurl: getApp().globalData.staticurl,
        isDefault: !1,
        member: {},
        subobj: {
            address: ""
        },
        inputValueName: "",
        inputValueTel: ""
    },
    onLoad: function() {},
    onShow: function() {
        var t = this, e = a.getMember();
        console.log(e), e && "" != e && (t.data.subobj.memberId = e.id, t.setData({
            member: e,
            subobj: t.data.subobj
        }));
    },
    qsrname: function(a) {
        var t = this;
        t.data.subobj.name = a.detail.value, t.setData({
            subobj: t.data.subobj
        });
    },
    qsrtel: function(a) {
        var t = this;
        t.data.subobj.linkManMobile = a.detail.value, t.setData({
            subobj: t.data.subobj
        });
    },
    chooseLoc: function() {
        console.log("呵呵呵");
        var a = this;
        wx.chooseLocation({
            success: function(t) {
                if ("" !== t.address && "" !== t.name) {
                    console.log("成功", t);
                    var e = t.address + t.name;
                    a.data.subobj.address = e, a.setData({
                        subobj: a.data.subobj
                    });
                }
            },
            fail: function(a) {
                console.log("失败", a);
            }
        });
    },
    clickSub: function() {
        var t = this;
        if (t.data.subobj.name) if (t.data.subobj.linkManMobile) {
            var e = /^((13[0-9])|(17[0-1,6-8])|(15[^4,\\D])|(18[0-9]))\d{8}$/.test(t.data.subobj.linkManMobile);
            console.log(e), e ? t.data.subobj.address ? a.post("/JnMemberAddress/save", t.data.subobj, "加载中...").then(function(a) {
                a && (wx.showToast({
                    title: "添加成功",
                    icon: "none",
                    duration: 2e3
                }), t.data.subobj.name = "", t.data.subobj.linkManMobile = "", t.data.subobj.address = "", 
                t.data.subobj.memberId = "", t.setData({
                    subobj: t.data.subobj,
                    inputValueName: "",
                    inputValueTel: ""
                }), t.changeParentData());
            }).catch(function(a) {
                console.log(a);
            }) : wx.showToast({
                title: "请选地址",
                icon: "none",
                duration: 2e3
            }) : wx.showToast({
                title: "请输入正确手机号",
                icon: "none",
                duration: 2e3
            });
        } else wx.showToast({
            title: "请填电话",
            icon: "none",
            duration: 2e3
        }); else wx.showToast({
            title: "请填收货人",
            icon: "none",
            duration: 2e3
        });
    },
    changeParentData: function() {
        var a = getCurrentPages();
        a.length > 1 && a[a.length - 2].changeData(), wx.navigateBack({
            delta: 1
        });
    }
});
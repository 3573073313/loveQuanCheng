var t, e = getApp();

Page({
    data: {
        isShow: !1,
        staticUrl: e.globalData.staticurl,
        timeText: "00:00",
        time: 0,
        current: 0,
        totalTime: .1,
        totalResult: 0,
        percent: 0,
        isShowHint: !1,
        activityId: ""
    },
    chooseOptions: function(t) {
        var e = this, s = t.currentTarget.dataset.index, o = e.data.testList, a = e.data.current, i = o[a].optionsList;
        if (2 !== parseInt(o[a].titleType)) o[a].chooseList = [], i.forEach(function(t, s) {
            t.isShow = !1, e.setColor(s, 3);
        }), i[s].isShow = !0, e.setColor(s, 1), o[a].chooseList.push(i[s]); else if (o[a].chooseList) if (i[s].isShow = !i[s].isShow, 
        1 == i[s].isShow) o[a].chooseList.push(i[s]), e.setColor(s, 1); else {
            var n = o[a].chooseList.indexOf(i[s]);
            o[a].chooseList.splice(n, 1), e.setColor(s, 3);
        } else o[a].chooseList = [], i[s].isShow = !0, e.setColor(s, 1), o[a].chooseList.push(i[s]);
        e.setData({
            testList: o
        });
    },
    chooseRadios: function(t) {
        var e = this, s = t.currentTarget.dataset.index, o = e.data.testList;
        o[e.data.current].isChoose = s, e.setData({
            testList: o
        });
    },
    setColor: function(t, e) {
        var s = this, o = s.data.testList, a = o[s.data.current].optionsList;
        switch (e) {
          case 1:
            a[t].color = "#3275FF", a[t].borderColor = "#3275FF", a[t].backGround = "#D8E5FF";
            break;

          case 2:
            a[t].color = "#FF3232", a[t].borderColor = "#FF3232", a[t].backGround = "#FFD8D8";
            break;

          case 3:
            a[t].color = "#666666", a[t].borderColor = "#F0F0F0", a[t].backGround = "#F7F7F7";
        }
        s.setData({
            testList: o
        });
    },
    setTotalResult: function(t) {
        var e = this, s = e.data.totalResult, o = e.data.testData;
        switch (t = parseInt(t)) {
          case 1:
            s += o.sselectScore, console.log("加分totalResult + score", s), this.setData({
                totalResult: s
            });
            break;

          case 2:
            s += o.mselectScore, console.log("加分totalResult + score", s), this.setData({
                totalResult: s
            });
            break;

          case 3:
            s += o.pselectScore, console.log("加分totalResult + score", s), this.setData({
                totalResult: s
            });
        }
    },
    finishClick: function() {
        var t = this, e = t.data.testList, s = t.data.current, o = e[s].optionsList, a = e[s].chooseList, i = e[s].correctOptions;
        if (a && a.length) {
            a.forEach(function(t) {
                t.backGround && delete t.backGround, t.borderColor && delete t.borderColor, t.color && delete t.color;
            });
            var n = !0;
            i.length == a.length ? i.forEach(function(t) {
                a.indexOf(t) < 0 && (n = !1);
            }) : n = !1, o.forEach(function(e, s) {
                e.isShow && (n ? t.setColor(s, 1) : t.setColor(s, 2));
            }), e[s].isFinish = !0, n && (t.setTotalResult(e[s].titleType), 2 !== e[s].titleType && s !== e.length - 1 && (e[s].isFinish = !1, 
            t.nextClick())), t.setData({
                testList: e,
                isTrue: n
            });
        } else wx.showToast({
            title: "请先选择答案",
            icon: "none"
        });
    },
    lookHint: function() {
        var t = this;
        t.setData({
            isShowHint: !t.data.isShowHint
        });
    },
    nextClick: function() {
        var t = this, e = t.data.current;
        e < t.data.testList.length - 1 && (e += 1), t.setData({
            current: e,
            isTrue: null
        });
    },
    toFinish: function() {
        var s = this, o = s.data.testData;
        clearInterval(t);
        var a = {
            paperId: o.id,
            memberId: e.getMember().id,
            score: s.data.totalResult,
            examinationDuration: s.data.time,
            activityId: s.data.activityId
        };
        wx.showLoading({
            title: "成绩核算中"
        }), e.post("JnItemTestPaperResult/save", a).then(function(t) {
            t.success && (wx.hideLoading(), wx.redirectTo({
                url: "answerFinish/answerFinish?totalResult=" + s.data.totalResult + "&testData=" + JSON.stringify(o) + "&taskId=" + s.data.taskId
            }));
        }).catch(function(t) {});
    },
    getList: function(t) {
        var s = this;
        e.post("JnItemTestPaper/get", {
            id: t
        }).then(function(t) {
            if (t.success) {
                var e = t.body.paper;
                e.forEach(function(t) {
                    t.optionsList.forEach(function(t, e) {
                        switch (t.isShow = !1, e) {
                          case 0:
                            t.options = "A";
                            break;

                          case 1:
                            t.options = "B";
                            break;

                          case 2:
                            t.options = "C";
                            break;

                          case 3:
                            t.options = "D";
                            break;

                          case 4:
                            t.options = "E";
                            break;

                          case 5:
                            t.options = "F";
                            break;

                          case 6:
                            t.options = "G";
                            break;

                          case 7:
                            t.options = "H";
                        }
                    });
                }), s.setData({
                    testData: t.body.data,
                    testList: e
                }), wx.setNavigationBarTitle({
                    title: t.body.data.detail
                }), s.timeInterval(), s.getTestList();
            }
        }).catch(function(t) {});
    },
    onLoad: function(t) {
        var s = this;
        if (e.getMember()) {
            var o = t.activityId;
            s.getList(t.id), s.setData({
                isShow: !0,
                taskId: t.taskId,
                activityId: o
            });
        } else s.setData({
            isShow: !1
        }), wx.showModal({
            title: "温馨提示",
            content: "您还没有登录，请登录后再进行答题!",
            showCancel: !1,
            success: function(t) {
                t.confirm && wx.navigateBack({
                    delta: 1
                });
            }
        });
    },
    isAnswer: function(t) {
        var s = {
            subjectId: t,
            memberId: e.getMember().id
        };
        e.post("JnItemTestPaperResult/isAnswer", s).then(function(t) {
            t.success;
        }).catch(function(t) {});
    },
    onReady: function() {},
    onShow: function() {},
    getTestList: function() {
        var t = this, e = t.data.testList;
        e.forEach(function(t) {
            t.correctOptions = [], t.optionsList.forEach(function(e) {
                1 == e.isok && t.correctOptions.push(e);
            });
        }), t.setData({
            testList: e
        });
    },
    timeInterval: function() {
        var e = this, s = e.data.testData;
        s.times = 60 * s.times;
        e.data.percent;
        t = setInterval(function(o) {
            var a = e.data.time + 1;
            a == s.times && (clearInterval(t), e.toFinish());
            var i = 0, n = 0;
            60 == (n = a > 60 ? a - 60 * (i = parseInt(a / 60)) : a) && (n = 0, i += 1), i < 10 && (i = "0" + i), 
            n < 10 && (n = "0" + n), e.setData({
                time: a,
                timeText: i + ":" + n,
                percent: a / s.times * 100
            });
        }, 1e3);
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});
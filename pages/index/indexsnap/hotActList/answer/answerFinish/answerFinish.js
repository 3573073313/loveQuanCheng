var t = getApp();

Page({
    data: {
        staticUrl: t.globalData.staticurl,
        resultNum: 0,
        resultPersonNum: 0,
        remark: "",
        hearten: "",
        canvasHidden: !0,
        bgUrl: "",
        topBg: "",
        qrCode: "",
        isImgSuccess: !1,
        isSaveShare: !1,
        isFromShare: !1
    },
    toIndex: function() {
        wx.switchTab({
            url: "/pages/index/index"
        });
    },
    onLoad: function(e) {
        var a = this, s = "";
        if (e.data) {
            var n = JSON.parse(e.data);
            console.log("分享进来的---", n), a.setData({
                member: n.member,
                testData: n.testData,
                resultNum: n.resultNum,
                remark: n.remark,
                hearten: n.hearten,
                resultPersonNum: n.resultPersonNum,
                isFromShare: !0
            }), s = n.testData.detail;
        } else a.setData({
            totalResult: e.totalResult,
            testData: JSON.parse(e.testData),
            member: t.getMember(),
            taskId: e.taskId
        }), a.getRankingPercentage(), a.getAnswerFinishTask(), s = JSON.parse(e.testData).detail, 
        wx.getSystemInfo({
            success: function(t) {
                a.setData({
                    windowHeight: t.windowHeight,
                    windowWidth: t.windowWidth
                }), a.setImgUrl();
            }
        });
        wx.setNavigationBarTitle({
            title: s
        });
    },
    numberSrcoll: function() {
        var t = this, e = t.data.totalResult, a = t.data.percentage, s = setInterval(function(n) {
            var o = t.data.resultNum, i = t.data.resultPersonNum;
            o == e && i == a ? (t.setRemark(), clearInterval(s)) : (o < e ? o += 1 : o = e, 
            i < a ? i += 1 : i = a), t.setData({
                resultNum: o,
                resultPersonNum: i
            });
        }, 30);
    },
    setRemark: function() {
        var t = this, e = t.data.resultNum, a = t.data.remark, s = t.data.hearten;
        e < 60 && (a = "继续加油", s = "革命尚未成功，同志仍需努力"), e >= 60 && e < 80 && (a = "合格", s = "恭喜达标，望更上一层楼"), 
        e >= 80 && e < 90 && (a = "良好", s = "成绩良好，望百尺竿头更进一步"), e >= 90 && e < 100 && (a = "优秀", 
        s = "成绩优秀，望精益求精，锲而不舍"), 100 == e && (a = "满分", s = "恭喜获得满分，望戒骄戒躁，砥砺前行"), t.setData({
            remark: a,
            hearten: s
        });
    },
    getAnswerFinishTask: function() {
        var e = this, a = (e.data.testData, e.data.taskId);
        if (console.log("that.data.resultNum---", e.data.resultNum), a) {
            var s = {
                taskId: a,
                memberId: t.getMember().id,
                score: e.data.totalResult
            };
            t.post("JnTask/answerFinishTask", s).then(function(t) {}).catch(function(t) {});
        }
    },
    getRankingPercentage: function() {
        var e = this, a = (e.data.testData, {
            subjectId: e.data.testData.id,
            memberId: t.getMember().id
        });
        t.post("JnItemTestPaperResult/getRankingPercentage", a).then(function(t) {
            t.success && (e.setData({
                percentage: t.body.data
            }), e.numberSrcoll());
        }).catch(function(t) {});
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {
        var t = this, e = {
            member: t.data.member,
            testData: t.data.testData,
            resultNum: t.data.resultNum,
            remark: t.data.remark,
            hearten: t.data.hearten,
            resultPersonNum: t.data.resultPersonNum
        };
        return {
            title: e.testData.detail,
            path: "/pages/index/indexsnap/hotActList/answer/answerFinish/answerFinish?data=" + JSON.stringify(e),
            desc: e.hearten
        };
    },
    setImgUrl: function() {
        var t = this;
        wx.downloadFile({
            url: t.data.staticUrl + "qrCodeWx.jpg",
            success: function(e) {
                200 == e.statusCode && wx.downloadFile({
                    url: t.data.staticUrl + "answerBg.png",
                    success: function(a) {
                        200 == a.statusCode && wx.downloadFile({
                            url: t.data.staticUrl + "answerTopName.png",
                            success: function(s) {
                                200 == s.statusCode && wx.downloadFile({
                                    url: t.data.member.face,
                                    success: function(n) {
                                        200 == n.statusCode && t.setData({
                                            face: n.tempFilePath,
                                            topBg: s.tempFilePath,
                                            bgUrl: a.tempFilePath,
                                            qrCode: e.tempFilePath,
                                            isImgSuccess: !0
                                        });
                                    }
                                });
                            }
                        });
                    }
                });
            }
        });
    },
    saveImg: function() {
        var t = this;
        t.setData({
            canvasHidden: !1
        }), wx.showLoading({
            title: "保存中..."
        }), setTimeout(function() {
            wx.saveImageToPhotosAlbum({
                filePath: t.data.shareImgPath,
                success: function(e) {
                    console.log(e), t.setData({
                        canvasHidden: !0,
                        isSaveShare: !0
                    }), wx.hideLoading(), wx.showToast({
                        title: "保存成功，赶快将成绩分享给好友吧!",
                        icon: "none",
                        duration: 2e3
                    });
                },
                fail: function(e) {
                    console.log(e), t.setData({
                        isSaveShare: !0,
                        canvasHidden: !0
                    }), wx.hideLoading(), "saveImageToPhotosAlbum:fail:auth denied" !== e.errMsg && "saveImageToPhotosAlbum:fail auth deny" !== e.errMsg || wx.showModal({
                        title: "提示",
                        content: "需要您授权保存相册",
                        showCancel: !1,
                        success: function(t) {
                            wx.openSetting({
                                success: function(t) {
                                    console.log("settingdata", t), t.authSetting["scope.writePhotosAlbum"] ? wx.showModal({
                                        title: "提示",
                                        content: "获取权限成功,再次点击分享即可保存",
                                        showCancel: !1
                                    }) : wx.showModal({
                                        title: "提示",
                                        content: "获取权限失败，将无法保存到相册哦~",
                                        showCancel: !1
                                    });
                                },
                                fail: function(t) {
                                    console.log("failData", t);
                                },
                                complete: function(t) {
                                    console.log("finishData", t);
                                }
                            });
                        }
                    });
                }
            });
        }, 500);
    },
    saveImageToPhotosAlbum: function() {
        var t = this;
        wx.showLoading({
            title: "保存中..."
        }), t.setData({
            canvasHidden: !1
        });
        var e = .8 * t.data.windowWidth, a = .75 * t.data.windowHeight, s = t.data.member, n = t.data.resultNum, o = t.data.remark, i = t.data.hearten, l = t.data.resultPersonNum, r = t.data.bgUrl, d = t.data.face, c = t.data.topBg, f = t.data.qrCode, u = wx.createCanvasContext("shareCanvas");
        u.rect(0, 0, e, .9 * t.data.windowHeight);
        var h = u.createLinearGradient(0, 0, 0, t.data.windowHeight);
        h.addColorStop(0, "#3275ff"), h.addColorStop(1, "#3dbdff"), u.fillStyle = h, u.fill(), 
        u.drawImage(r, .05 * e, .05 * a, .9 * e, .9 * a), u.save(), u.beginPath(), u.strokeStyle = "#e3e3e3", 
        u.arc(.1 * e + .05 * a, .15 * a, .05 * a, 0, 2 * Math.PI), u.stroke(), u.clip(), 
        u.drawImage(d, .1 * e, .1 * a, .1 * a, .1 * a), u.restore(), u.setFillStyle("#333"), 
        u.font = "normal bold 15px sans-serif", u.fillText(s.nickname, .1 * e + .1 * a + 10, .15 * a), 
        u.setTextAlign("center");
        var m = "您已完成“" + t.data.testData.detail + "”答题活动", g = 0;
        if (m.length > 15) for (var w = 0; w < Math.ceil(m.length / 15); w++) g += 20 * w, 
        w !== Math.ceil(m.length / 15) - 1 ? u.fillText(m.substring(15 * w, 15 * (w + 1)), .5 * e, .25 * a + 20 * w, .9 * e) : u.fillText(m.substring(15 * w, m.length), .5 * e, .25 * a + 20 * w, .9 * e); else u.fillText(m, .5 * e, .25 * a, .9 * e);
        u.save();
        var x = .1 * e + .05 * a, v = .29 * a + g, T = e - 2 * (.1 * e + .05 * a), p = .3 * a;
        u.beginPath(), u.strokeStyle = "#FFD05C", u.setLineWidth(6), u.moveTo(x + 8, v), 
        u.arcTo(x + T, v, x + T, v + 8, 8), u.arcTo(x + T, v + .33 * p, x + T - 8, v + p, 8), 
        u.lineTo(x, v + .33 * p), u.arcTo(x, v, x + 8, v, 8), u.setFillStyle("#FF525C"), 
        u.fill(), u.arcTo(x + T, v, x + T, v + 8, 8), u.arcTo(x + T, v + p, x + T - 8, v + p, 8), 
        u.arcTo(x, v + p, x, v + p - 8, 8), u.arcTo(x, v, x + 8, v, 8), u.stroke(), u.setFillStyle("#ffffff"), 
        u.font = "normal bold 18px sans-serif", u.fillText("您 的 成 绩", .5 * e, v + .33 * p / 2 + 6), 
        u.setFillStyle("#FF525C"), u.font = "normal bold 75px sans-serif", n.toString(), 
        u.fillText(n, .5 * e, v + .33 * p + 12 + .44 * p), u.restore(), u.drawImage(c, x, v + p + 10, T, .07 * a), 
        u.setFillStyle("#ffffff"), u.font = "normal bold 14px sans-serif", u.fillText(o, .5 * e, v + p + 10 + .04 * a), 
        u.setFillStyle("#FE3F40"), u.font = "normal normal 12px sans-serif", u.fillText(i, .5 * e, v + p + 10 + .04 * a + 35), 
        u.setFillStyle("#D1652A"), u.fillText("您打败了" + l + "%的参与者", .5 * e, v + p + 10 + .04 * a + 60);
        var S = x + 5, b = v + p + 10 + .04 * a + 70, F = T - 10;
        u.save(), u.beginPath(), u.moveTo(S + 5, b), u.lineTo(S + 5 + F, b), u.lineTo(S + F, b + 20), 
        u.lineTo(S, b + 20), u.lineTo(S + 5, b), u.setFillStyle("#DBDBDB"), u.fill(), u.restore(), 
        u.save(), u.beginPath(), u.moveTo(S + 5, b);
        var P = l > 0 ? F * l / 100 : 0;
        u.lineTo(S + P + 5, b), u.lineTo(S + P, b + 20), u.lineTo(S, b + 20), u.lineTo(S + 5, b);
        var D = u.createLinearGradient(0, 0, .5 * e, 0);
        D.addColorStop(0, "#3dbdff"), D.addColorStop(1, "#3275ff"), u.fillStyle = D, u.fill(), 
        u.setFillStyle("#ffffff"), u.setTextAlign("left");
        var I = l < 20 ? S + P + 40 : P + S;
        I = l > 80 ? S + .8 * F : I, u.fillText(l + "%", I, b + 15), u.setTextAlign("center"), 
        u.restore(), u.save(), u.beginPath(), u.rect(.05 * e, .05 * a + .9 * a + 10, .9 * e, .2 * a), 
        u.setFillStyle("#ffffff"), u.fill(), u.drawImage(f, .05 * e + 10, a, .2 * a * .8, .2 * a * .8), 
        u.setFillStyle("#aaaaaa"), u.font = "normal normal 14px sans-serif", u.setTextAlign("left"), 
        u.fillText("长按识别小程序", .05 * e + 20 + .2 * a * .8, 1.06 * a), u.fillText("来「 我爱泉城 」参与答题", .05 * e + 20 + .2 * a * .8, 1.12 * a), 
        u.restore(), u.draw(!1, function() {
            wx.canvasToTempFilePath({
                x: 0,
                y: 0,
                width: e,
                height: .9 * t.data.windowHeight,
                destWidth: e * wx.getSystemInfoSync().pixelRatio,
                destHeight: .9 * t.data.windowHeight * wx.getSystemInfoSync().pixelRatio,
                canvasId: "shareCanvas",
                success: function(t) {},
                complete: function(e) {
                    wx.hideLoading(), e.tempFilePath ? (t.setData({
                        shareImgPath: e.tempFilePath
                    }), t.saveImg()) : wx.showModal({
                        title: "提示",
                        content: "图片绘制中，请稍后重试",
                        showCancel: !1
                    });
                }
            });
        });
    }
});
var a = getApp(), e = require("../../../html-view/index");

Page({
    data: {
        staticUrl: getApp().globalData.staticurl,
        topicData: {},
        isSubmit: !1,
        scrollTop: 0,
        basicInfo: [ {
            isRequired: "1",
            updateDate: "2020-05-13 14:42",
            isBasicInfo: "2",
            optionList: [ {
                createBy: "4028ea815a3d2a8c015a3d2f8d2a0002",
                updateDate: "2020-05-14 15:51",
                questionId: "e5366ef2c6e049d9b21cac33bc72ad5e",
                updateBy: "4028ea815a3d2a8c015a3d2f8d2a0002",
                id: "cf0057500d394eb4a5eb4aa5bc622e84",
                sort: 1,
                delFlag: "0",
                optionName: "男",
                createDate: "2020-05-14 15:52"
            }, {
                createBy: "4028ea815a3d2a8c015a3d2f8d2a0002",
                updateDate: "2020-05-14 15:51",
                questionId: "e5366ef2c6e049d9b21cac33bc72ad5e",
                updateBy: "4028ea815a3d2a8c015a3d2f8d2a0002",
                id: "8669d8920bb342d287535c4c3fc58fd4",
                sort: 2,
                delFlag: "0",
                optionName: "女",
                createDate: "2020-05-14 15:52"
            } ],
            questionnaireId: "cfc80f1b521748cdb53a5094ad8b3468",
            questionName: "您的性别",
            sort: 1,
            delFlag: "0",
            createBy: "4028ea815a3d2a8c015a3d2f8d2a0002",
            questionRemark: "",
            updateBy: "4028ea815a3d2a8c015a3d2f8d2a0002",
            id: "e5366ef2c6e049d9b21cac33bc72ad5e",
            state: "1",
            problemCategories: "为了保证信息的真实准确，请您如实填写信息。我们保证您的个人信息只被用于本次民意征集，且不被泄露或不正当地使用。",
            questionType: "1",
            createDate: "2020-05-17 23:05"
        }, {
            isRequired: "1",
            updateDate: "2020-05-14 15:24",
            isBasicInfo: "2",
            optionList: [ {
                createBy: "4028ea815a3d2a8c015a3d2f8d2a0002",
                updateDate: "2020-05-14 15:50",
                questionId: "ea42ddfcedef44ce90cc9a8b389a6b0a",
                updateBy: "4028ea815a3d2a8c015a3d2f8d2a0002",
                id: "a97ac4165ed3439090299238b16934d2",
                sort: 1,
                delFlag: "0",
                optionName: "16～35岁",
                createDate: "2020-05-14 15:52"
            }, {
                createBy: "4028ea815a3d2a8c015a3d2f8d2a0002",
                updateDate: "2020-05-14 15:50",
                questionId: "ea42ddfcedef44ce90cc9a8b389a6b0a",
                updateBy: "4028ea815a3d2a8c015a3d2f8d2a0002",
                id: "4799402505f040e68e20c50bbab4367b",
                sort: 2,
                delFlag: "0",
                optionName: "36～55岁",
                createDate: "2020-05-14 15:52"
            }, {
                createBy: "4028ea815a3d2a8c015a3d2f8d2a0002",
                updateDate: "2020-05-14 15:52",
                questionId: "ea42ddfcedef44ce90cc9a8b389a6b0a",
                updateBy: "4028ea815a3d2a8c015a3d2f8d2a0002",
                id: "dc2696393c2447c5a4c2ea96b6e59672",
                sort: 3,
                delFlag: "0",
                optionName: "56岁以上",
                createDate: "2020-05-14 15:52"
            } ],
            questionnaireId: "cfc80f1b521748cdb53a5094ad8b3468",
            questionName: "您的年龄：",
            sort: 2,
            delFlag: "0",
            createBy: "4028ea815a3d2a8c015a3d2f8d2a0002",
            updateBy: "4028ea815a3d2a8c015a3d2f8d2a0002",
            id: "ea42ddfcedef44ce90cc9a8b389a6b0a",
            state: "1",
            questionType: "1",
            createDate: "2020-05-14 15:27"
        }, {
            isRequired: "1",
            updateDate: "2020-05-14 15:54",
            isBasicInfo: "2",
            optionList: [ {
                createBy: "4028ea815a3d2a8c015a3d2f8d2a0002",
                updateDate: "2020-05-14 15:54",
                questionId: "f006414063474b2b8254b91cb236130c",
                updateBy: "4028ea815a3d2a8c015a3d2f8d2a0002",
                id: "924816ee3a544e8181ec9506ef9f96f8",
                sort: 1,
                delFlag: "0",
                optionName: "本市居民",
                createDate: "2020-05-14 15:54"
            }, {
                createBy: "4028ea815a3d2a8c015a3d2f8d2a0002",
                updateDate: "2020-05-14 15:54",
                questionId: "f006414063474b2b8254b91cb236130c",
                updateBy: "4028ea815a3d2a8c015a3d2f8d2a0002",
                id: "1c5d9ed7886d4076816d0d55f4dcf2a0",
                sort: 2,
                delFlag: "0",
                optionName: "外地户籍在本市工作",
                createDate: "2020-05-14 15:54"
            }, {
                createBy: "4028ea815a3d2a8c015a3d2f8d2a0002",
                updateDate: "2020-05-14 15:55",
                questionId: "f006414063474b2b8254b91cb236130c",
                updateBy: "4028ea815a3d2a8c015a3d2f8d2a0002",
                id: "b02295e317094df1ad5dc775c146a01b",
                sort: 3,
                delFlag: "0",
                optionName: "外地临时来此地 ",
                createDate: "2020-05-14 15:55"
            } ],
            questionnaireId: "cfc80f1b521748cdb53a5094ad8b3468",
            questionName: "您      是：",
            sort: 3,
            delFlag: "0",
            createBy: "4028ea815a3d2a8c015a3d2f8d2a0002",
            updateBy: "4028ea815a3d2a8c015a3d2f8d2a0002",
            id: "f006414063474b2b8254b91cb236130c",
            state: "1",
            questionType: "1",
            createDate: "2020-05-14 15:56"
        }, {
            isRequired: "1",
            updateDate: "2020-05-13 14:46",
            isBasicInfo: "2",
            optionList: [ {
                createBy: "4028ea815a3d2a8c015a3d2f8d2a0002",
                updateDate: "2020-05-13 14:52",
                questionId: "f75b4090bbf64642b6a9f3f35fe8e12b",
                updateBy: "4028ea815a3d2a8c015a3d2f8d2a0002",
                id: "4c7bc6bf3b2b4f40bf49be17a8d4993f",
                sort: 1,
                delFlag: "0",
                optionName: "党政机关人员",
                createDate: "2020-05-13 14:52"
            }, {
                createBy: "4028ea815a3d2a8c015a3d2f8d2a0002",
                updateDate: "2020-05-13 14:52",
                questionId: "f75b4090bbf64642b6a9f3f35fe8e12b",
                updateBy: "4028ea815a3d2a8c015a3d2f8d2a0002",
                id: "e0d0f9b6b4e94c6b804b03c0dc9fdea0",
                sort: 2,
                delFlag: "0",
                optionName: "事业单位人员",
                createDate: "2020-05-13 14:52"
            }, {
                createBy: "4028ea815a3d2a8c015a3d2f8d2a0002",
                updateDate: "2020-05-13 14:52",
                questionId: "f75b4090bbf64642b6a9f3f35fe8e12b",
                updateBy: "4028ea815a3d2a8c015a3d2f8d2a0002",
                id: "e28cf7ef4e364cb1aa76e45d126d698e",
                sort: 3,
                delFlag: "0",
                optionName: "军事武警人员",
                createDate: "2020-05-13 14:52"
            }, {
                createBy: "4028ea815a3d2a8c015a3d2f8d2a0002",
                updateDate: "2020-05-13 14:52",
                questionId: "f75b4090bbf64642b6a9f3f35fe8e12b",
                updateBy: "4028ea815a3d2a8c015a3d2f8d2a0002",
                id: "9170985e9ffd472e8b9a4f36d5e6c558",
                sort: 4,
                delFlag: "0",
                optionName: "企业单位人员",
                createDate: "2020-05-13 14:52"
            }, {
                createBy: "4028ea815a3d2a8c015a3d2f8d2a0002",
                updateDate: "2020-05-13 14:53",
                questionId: "f75b4090bbf64642b6a9f3f35fe8e12b",
                updateBy: "4028ea815a3d2a8c015a3d2f8d2a0002",
                id: "eb26f2b706164bd2a2b47332ad9ddfd6",
                sort: 5,
                delFlag: "0",
                optionName: "专业技术人员",
                createDate: "2020-05-13 14:53"
            }, {
                createBy: "4028ea815a3d2a8c015a3d2f8d2a0002",
                updateDate: "2020-05-13 14:53",
                questionId: "f75b4090bbf64642b6a9f3f35fe8e12b",
                updateBy: "4028ea815a3d2a8c015a3d2f8d2a0002",
                id: "3c4fb34e426e45bd8e523260c222110a",
                sort: 6,
                delFlag: "0",
                optionName: "进城务工人员",
                createDate: "2020-05-13 14:53"
            }, {
                createBy: "4028ea815a3d2a8c015a3d2f8d2a0002",
                updateDate: "2020-05-13 14:53",
                questionId: "f75b4090bbf64642b6a9f3f35fe8e12b",
                updateBy: "4028ea815a3d2a8c015a3d2f8d2a0002",
                id: "d3e1b79bc2d74ee787f1c612becf83b5",
                sort: 7,
                delFlag: "0",
                optionName: "下岗失业人员",
                createDate: "2020-05-13 14:53"
            }, {
                createBy: "4028ea815a3d2a8c015a3d2f8d2a0002",
                updateDate: "2020-05-13 14:53",
                questionId: "f75b4090bbf64642b6a9f3f35fe8e12b",
                updateBy: "4028ea815a3d2a8c015a3d2f8d2a0002",
                id: "f3ca8332f6a8408e92d1454f58358e2c",
                sort: 8,
                delFlag: "0",
                optionName: "离退休人员",
                createDate: "2020-05-13 14:53"
            }, {
                createBy: "4028ea815a3d2a8c015a3d2f8d2a0002",
                updateDate: "2020-05-13 14:54",
                questionId: "f75b4090bbf64642b6a9f3f35fe8e12b",
                updateBy: "4028ea815a3d2a8c015a3d2f8d2a0002",
                id: "910f5c946167442ca39bd8eb60f17251",
                sort: 9,
                delFlag: "0",
                optionName: "在校学生",
                createDate: "2020-05-13 14:54"
            }, {
                createBy: "4028ea815a3d2a8c015a3d2f8d2a0002",
                updateDate: "2020-05-13 14:54",
                questionId: "f75b4090bbf64642b6a9f3f35fe8e12b",
                updateBy: "4028ea815a3d2a8c015a3d2f8d2a0002",
                id: "5ba34758cc4546b68ab2127be1306db1",
                sort: 10,
                delFlag: "0",
                optionName: "其他",
                createDate: "2020-05-13 14:54"
            } ],
            questionnaireId: "cfc80f1b521748cdb53a5094ad8b3468",
            questionName: "您的职业",
            sort: 4,
            delFlag: "0",
            createBy: "4028ea815a3d2a8c015a3d2f8d2a0002",
            updateBy: "4028ea815a3d2a8c015a3d2f8d2a0002",
            id: "f75b4090bbf64642b6a9f3f35fe8e12b",
            state: "1",
            questionType: "1",
            createDate: "2020-05-13 14:46"
        }, {
            isRequired: "1",
            updateDate: "2020-05-13 14:46",
            isBasicInfo: "2",
            optionList: [ {
                createBy: "4028ea815a3d2a8c015a3d2f8d2a0002",
                updateDate: "2020-05-13 14:52",
                questionId: "f75b4090bbf64642b6a9f3f35fe8e12b",
                updateBy: "4028ea815a3d2a8c015a3d2f8d2a0002",
                id: "4c7bc6bf3b2b4f40bf49be17a8d4993f",
                sort: 1,
                delFlag: "0",
                optionName: "市中区",
                createDate: "2020-05-13 14:52"
            }, {
                createBy: "4028ea815a3d2a8c015a3d2f8d2a0002",
                updateDate: "2020-05-13 14:52",
                questionId: "f75b4090bbf64642b6a9f3f35fe8e12b",
                updateBy: "4028ea815a3d2a8c015a3d2f8d2a0002",
                id: "e0d0f9b6b4e94c6b804b03c0dc9fdea0",
                sort: 2,
                delFlag: "0",
                optionName: "历下区",
                createDate: "2020-05-13 14:52"
            }, {
                createBy: "4028ea815a3d2a8c015a3d2f8d2a0002",
                updateDate: "2020-05-13 14:52",
                questionId: "f75b4090bbf64642b6a9f3f35fe8e12b",
                updateBy: "4028ea815a3d2a8c015a3d2f8d2a0002",
                id: "e28cf7ef4e364cb1aa76e45d126d698e",
                sort: 3,
                delFlag: "0",
                optionName: "天桥区",
                createDate: "2020-05-13 14:52"
            }, {
                createBy: "4028ea815a3d2a8c015a3d2f8d2a0002",
                updateDate: "2020-05-13 14:52",
                questionId: "f75b4090bbf64642b6a9f3f35fe8e12b",
                updateBy: "4028ea815a3d2a8c015a3d2f8d2a0002",
                id: "9170985e9ffd472e8b9a4f36d5e6c558",
                sort: 4,
                delFlag: "0",
                optionName: "槐荫区",
                createDate: "2020-05-13 14:52"
            }, {
                createBy: "4028ea815a3d2a8c015a3d2f8d2a0002",
                updateDate: "2020-05-13 14:53",
                questionId: "f75b4090bbf64642b6a9f3f35fe8e12b",
                updateBy: "4028ea815a3d2a8c015a3d2f8d2a0002",
                id: "eb26f2b706164bd2a2b47332ad9ddfd6",
                sort: 5,
                delFlag: "0",
                optionName: "历城区",
                createDate: "2020-05-13 14:53"
            }, {
                createBy: "4028ea815a3d2a8c015a3d2f8d2a0002",
                updateDate: "2020-05-13 14:53",
                questionId: "f75b4090bbf64642b6a9f3f35fe8e12b",
                updateBy: "4028ea815a3d2a8c015a3d2f8d2a0002",
                id: "3c4fb34e426e45bd8e523260c222110a",
                sort: 6,
                delFlag: "0",
                optionName: "长清区",
                createDate: "2020-05-13 14:53"
            }, {
                createBy: "4028ea815a3d2a8c015a3d2f8d2a0002",
                updateDate: "2020-05-13 14:53",
                questionId: "f75b4090bbf64642b6a9f3f35fe8e12b",
                updateBy: "4028ea815a3d2a8c015a3d2f8d2a0002",
                id: "d3e1b79bc2d74ee787f1c612becf83b5",
                sort: 7,
                delFlag: "0",
                optionName: "章丘区",
                createDate: "2020-05-13 14:53"
            }, {
                createBy: "4028ea815a3d2a8c015a3d2f8d2a0002",
                updateDate: "2020-05-13 14:53",
                questionId: "f75b4090bbf64642b6a9f3f35fe8e12b",
                updateBy: "4028ea815a3d2a8c015a3d2f8d2a0002",
                id: "f3ca8332f6a8408e92d1454f58358e2c",
                sort: 8,
                delFlag: "0",
                optionName: "济阳区",
                createDate: "2020-05-13 14:53"
            }, {
                createBy: "4028ea815a3d2a8c015a3d2f8d2a0002",
                updateDate: "2020-05-13 14:54",
                questionId: "f75b4090bbf64642b6a9f3f35fe8e12b",
                updateBy: "4028ea815a3d2a8c015a3d2f8d2a0002",
                id: "910f5c946167442ca39bd8eb60f17251",
                sort: 9,
                delFlag: "0",
                optionName: "莱芜区",
                createDate: "2020-05-13 14:54"
            }, {
                createBy: "4028ea815a3d2a8c015a3d2f8d2a0002",
                updateDate: "2020-05-13 14:54",
                questionId: "f75b4090bbf64642b6a9f3f35fe8e12b",
                updateBy: "4028ea815a3d2a8c015a3d2f8d2a0002",
                id: "5ba34758cc4546b68ab2127be1306db1",
                sort: 10,
                delFlag: "0",
                optionName: "钢城区",
                createDate: "2020-05-13 14:54"
            }, {
                createBy: "4028ea815a3d2a8c015a3d2f8d2a0002",
                updateDate: "2020-05-13 14:54",
                questionId: "f75b4090bbf64642b6a9f3f35fe8e12b",
                updateBy: "4028ea815a3d2a8c015a3d2f8d2a0002",
                id: "5ba34758cc4546b68ab2127be1306db1",
                sort: 11,
                delFlag: "0",
                optionName: "平阴县",
                createDate: "2020-05-13 14:54"
            }, {
                createBy: "4028ea815a3d2a8c015a3d2f8d2a0002",
                updateDate: "2020-05-13 14:54",
                questionId: "f75b4090bbf64642b6a9f3f35fe8e12b",
                updateBy: "4028ea815a3d2a8c015a3d2f8d2a0002",
                id: "5ba34758cc4546b68ab2127be1306db1",
                sort: 12,
                delFlag: "0",
                optionName: "商河县",
                createDate: "2020-05-13 14:54"
            } ],
            questionnaireId: "cfc80f1b521748cdb53a5094ad8b3468",
            questionName: "住址所在区县",
            sort: 5,
            delFlag: "0",
            createBy: "4028ea815a3d2a8c015a3d2f8d2a0002",
            updateBy: "4028ea815a3d2a8c015a3d2f8d2a0002",
            id: "f75b4090bbf64642b6a9f3f35fe8e12b",
            state: "1",
            questionType: "1",
            createDate: "2020-05-13 14:46"
        } ]
    },
    onLoad: function(a) {
        this.setData({
            id: a.id ? a.id : "",
            isRepeat: !!a.isRepeat
        });
        var e = this.data.topicData;
        e.questionList = this.data.basicInfo, this.setData({
            topicData: e
        }), this.getType();
    },
    confirm: function(a) {
        var e = this;
        e.data.isSubmit ? wx.navigateBack({
            delta: 1
        }) : e.scrollTo();
    },
    scrollTo: function() {
        var a = this;
        a.data.current;
        wx.createSelectorQuery().select("#topicItem" + a.data.current).boundingClientRect(function(e) {
            console.log("scrollTop: rect.top", e.top);
            var t = parseInt(e.top);
            t = (t = a.data.scrollTop + t) > 180 ? t - 180 : t, wx.pageScrollTo({
                scrollTop: t
            });
        }).exec();
    },
    getType: function(e) {
        var t = this;
        a.post("dict/sys-dict/list", {
            type: "question_type"
        }).then(function(a) {
            if (a.success) {
                console.log("res---", a);
                var e = a.body.data;
                if (t.setData({
                    typeList: e
                }), t.data.id) t.getData(); else {
                    var d = t.data.topicData;
                    d.questionList.forEach(function(a) {
                        a.questionTypeName = t.data.typeList.find(function(e) {
                            return e.value == a.questionType;
                        }).label;
                    }), t.setData({
                        topicData: d
                    });
                }
            }
        }).catch(function(a) {});
    },
    getData: function() {
        var t = this;
        wx.showLoading({
            title: "数据加载中..."
        });
        var d = {
            id: t.data.id
        }, o = "";
        t.data.isRepeat ? (o = "JnQuestionnaire/getJnQuestionnaireByMemberId", d.memberId = a.getMember().id) : o = "JnQuestionnaire/get", 
        a.post(o, d).then(function(a) {
            if (wx.hideLoading(), a.success) {
                console.log("res---", a), console.log("recdsafcds fds---", JSON.stringify(a.body.data));
                var d = a.body.data;
                d.questionList.forEach(function(a) {
                    a.questionTypeName = t.data.typeList.find(function(e) {
                        return e.value == a.questionType;
                    }).label, a.questionRemarkInfo = new e(a.questionRemark).nodes;
                });
                var o = new e(d.remarks).nodes;
                console.log("info----", o), d.name = d.name.replace(/↵/g, "\n"), t.setData({
                    topicData: d,
                    info: o
                }), wx.setNavigationBarTitle({
                    title: d.name ? d.name : "问卷调查"
                }), t.setIsShow(), t.data.isRepeat && t.returnData();
            } else wx.showToast({
                title: a.msg,
                icon: "none"
            });
        }).catch(function(a) {
            wx.hideLoading(), wx.showToast({
                title: a.error,
                icon: "none"
            });
        });
    },
    setIsShow: function() {
        var a = this, e = a.data.topicData;
        e.questionList.forEach(function(t, d) {
            t.questionRemark && wx.createSelectorQuery().select("#contentText" + d).boundingClientRect(function(o) {
                console.log(d + 1, o.height), o.height > 100 ? t.flod = !0 : t.flod = !1, a.setData({
                    topicData: e
                });
            }).exec();
        });
    },
    returnData: function() {
        console.log("--666666666666666-");
        var a = this, e = a.data.topicData;
        e.questionList.forEach(function(a, e) {
            if (1 == a.questionType || 2 == a.questionType) {
                var t = "-1" != a.rightKeyId.indexOf(",") ? a.rightKeyId.split(",") : [ a.rightKeyId ];
                a.optionList.forEach(function(e) {
                    "-1" != t.indexOf(e.id) && (e.show = !0, 1 == a.questionType ? a.value = e.optionName : void 0 == a.value ? a.value = 1 : a.value += 1);
                });
            } else a.value = a.rightKeyValue;
        }), console.log("topicData---", e), a.setData({
            topicData: e
        });
    },
    showAll: function(a) {
        var e = this, t = e.data.topicData, d = a.currentTarget.dataset.index;
        void 0 != t.questionList[d].isShowAll ? t.questionList[d].isShowAll = !t.questionList[d].isShowAll : t.questionList[d].isShowAll = !0, 
        e.setData({
            topicData: t
        });
    },
    chooseRadio: function(a) {
        var e = this, t = e.data.topicData, d = t.questionList, o = a.currentTarget.dataset.index, i = a.currentTarget.dataset.i;
        d[o].optionList.forEach(function(a) {
            a.show = !1;
        }), d[o].optionList[i].show = !0, d[o].value = d[o].optionList[i].optionName, e.setData({
            topicData: t,
            current: o + 1
        }), e.submit(!0);
    },
    chooseCheckBox: function(a) {
        var e = this, t = e.data.topicData, d = t.questionList, o = a.currentTarget.dataset.index, i = a.currentTarget.dataset.i;
        void 0 != d[o].optionList[i].show ? d[o].optionList[i].show = !d[o].optionList[i].show : d[o].optionList[i].show = !0, 
        d[o].value ? d[o].value = d[o].optionList[i].show ? d[o].value + 1 : d[o].value - 1 : d[o].value = 1, 
        console.log("topicList[index].value---", d[o].value), e.setData({
            topicData: t
        });
    },
    bindinput: function(a) {
        var e = this, t = e.data.topicData, d = t.questionList, o = a.currentTarget.dataset.index, i = a.detail.value.replace(/[^\u4E00-\u9FA5A-Za-z0-9_，,.。？?!！<>《》#+-:；\/、（）@【】""'']+$/g, "");
        d[o].value = i, e.setData({
            topicData: t
        });
    },
    submit: function(e) {
        for (var t = this, d = t.data.topicData, o = d.questionList, i = {
            questionnaireId: d.id,
            memberId: a.getMember().id,
            optionRecordList: []
        }, c = 0; c < o.length; c++) {
            var s = o[c];
            if (console.log("item---", s), 1 == s.isRequired && (2 == s.questionType ? !s.value || 0 == s.value : !s.value)) return t.setData({
                content: '亲爱的市民，您好！"' + s.questionName + '" 是必填项哦，请填写后提交！',
                showModal: !!e.currentTarget,
                current: c
            }), void (1 == e && t.scrollTo());
            var n = {};
            if (n.questionId = s.id, n.optionId = "", 1 == s.questionType || 2 == s.questionType) {
                var f = [];
                s.optionList.forEach(function(a) {
                    a.show && f.push(a.id);
                }), n.optionId = f.join(",");
            } else n.optionValue = s.value;
            i.optionRecordList.push(n);
        }
        e.currentTarget && (t.data.id ? t.saveData(i) : t.submitInfo());
    },
    saveData: function(e) {
        var t = this;
        t.setData({
            isSubmit: !0
        }), wx.showLoading({
            title: "正在提交..."
        }), console.log(JSON.stringify(e)), a.postJSON("/JnQuestionRecord/save", e).then(function(a) {
            wx.hideLoading(), a.success ? t.setData({
                content: "亲爱的市民，您好！您的宝贵建议和意见我们已经收到啦，感谢您参与本次调研活动！" + (t.data.isRepeat ? "" : "赠送您" + t.data.topicData.score + "个文明积分"),
                showModal: !0
            }) : (wx.showToast({
                title: a.msg,
                icon: "none"
            }), t.setData({
                isSubmit: !1
            }));
        }).catch(function(a) {
            wx.showToast({
                title: a.error,
                icon: "none"
            }), wx.hideLoading(), t.setData({
                isSubmit: !1
            });
        });
    },
    submitInfo: function() {
        var e = this;
        e.setData({
            isSubmit: !0
        });
        var t = {
            memberId: a.getMember().id
        }, d = [ "sex", "age", "habitation", "profession", "address" ], o = e.data.topicData;
        console.log("topicData---", o.questionList), o.questionList.forEach(function(a, e) {
            t[d[e]] = a.value;
        }), console.log("iData---", t), a.post("JnQuestionBaseInfo/save", t).then(function(a) {
            a.success ? e.setData({
                content: "个人信息已提交成功，请继续参与民意征集活动！",
                showModal: !0
            }) : (wx.showToast({
                title: a.msg,
                icon: "none"
            }), e.setData({
                isSubmit: !1
            }));
        }).catch(function(a) {});
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onPageScroll: function(a) {
        this.setData({
            scrollTop: a.scrollTop
        });
    },
    onReachBottom: function() {}
});
var t = getApp();

Page({
    data: {
        staticurl: getApp().globalData.staticurl,
        currentTab: "1",
        taskList: [],
        showModal: 1,
        item: {},
        taskTypeList: []
    },
    toLook: function(t) {
        var a = this, e = t.currentTarget.dataset.item;
        if (e.link) {
            var s = "/" + e.link;
            console.log(e), "4" == e.taskType && "1" == e.isAnswer && (s += "?id=" + e.itemTestId + "&taskId=" + e.id), 
            console.log(s), wx.reLaunch({
                url: s
            });
        } else "1" == e.platformTaskType && a.setData({
            login: !0
        });
    },
    onLoad: function(t) {
        console.log(t), this.setData({
            currentTab: t.currentTabTask
        });
    },
    onShow: function() {
        var a = this;
        console.log(a.data.currentTab), 2 == a.data.currentTab ? t.login().then(function(t) {
            a.getTaskList(a.data.currentTab);
        }).catch(function(t) {}) : a.getTaskList(a.data.currentTab), a.getTaskType();
    },
    getTaskType: function() {
        var a = this;
        t.post("/dict/sys-dict/list", {
            type: "task_type"
        }, "加载中...").then(function(t) {
            if (t) {
                var e = t.body.data;
                console.log("任务类型", e), a.data.taskTypeList = e, a.setData({
                    taskTypeList: a.data.taskTypeList
                });
            }
        }).catch(function(t) {
            console.log(t);
        });
    },
    clickTab: function(a) {
        var e = this;
        if (this.data.currentTab === a.target.dataset.current) return !1;
        e.setData({
            currentTab: a.target.dataset.current
        }), t.login().then(function(t) {
            e.getTaskList(e.data.currentTab);
        }).catch(function(t) {}), e.getTaskList(e.data.currentTab);
    },
    showModal: function(t) {
        var a = this, e = t.currentTarget.dataset.item;
        "1" == e.ifRun && (wx.getStorageSync("steps") || wx.setStorageSync("steps", 1), 
        e.step < e.steps) ? wx.showToast({
            title: "步数超过" + e.steps + "才能打卡哦",
            icon: "none",
            duration: 3e3
        }) : a.finishTask(e);
    },
    clickCancle: function() {
        var t = this;
        t.setData({
            showModal: 1
        }), t.getTaskList(t.data.currentTab);
    },
    getTaskList: function(a) {
        var e = this, s = wx.getStorageSync("member").id;
        console.log("currentTab---", a);
        var n = {
            taskType: a,
            pageNo: 1,
            pageSize: 10,
            memberId: s
        };
        t.post("/JnTask/list", n, "加载中...").then(function(t) {
            if (t.success) {
                var s = t.body.page.records;
                if ("2" == a) {
                    var n = !0, i = !1, o = void 0;
                    try {
                        for (var r, c = s[Symbol.iterator](); !(n = (r = c.next()).done); n = !0) {
                            var u = r.value;
                            "1" == u.ifRun && wx.getStorageSync("steps") && (u.step = parseInt(wx.getStorageSync("steps")));
                        }
                    } catch (t) {
                        i = !0, o = t;
                    } finally {
                        try {
                            !n && c.return && c.return();
                        } finally {
                            if (i) throw o;
                        }
                    }
                }
                e.setData({
                    taskList: s
                });
            }
        }).catch(function(t) {
            console.log(t);
        });
    },
    finishTask: function(a) {
        var e = this, s = wx.getStorageSync("member").id, n = {
            id: a.id,
            memberId: s
        }, i = "";
        "1" == a.ifRun ? (n.steps = wx.getStorageSync("steps"), n.platformTaskType = "8", 
        n.ifRun = "1", i = "JnTask/autoFinishTask") : i = "/JnTask/finishTask", t.post(i, n, "加载中...").then(function(t) {
            t.success && e.setData({
                showModal: 0,
                item: a
            });
        }).catch(function(t) {
            console.log(t);
        });
    }
});
Component({
    properties: {
        title: {
            type: String
        },
        titleColor: {
            type: String,
            value: "#000000"
        },
        logImage: {
            type: String
        },
        logName: {
            type: String
        },
        content: {
            type: String
        },
        contentColor: {
            type: String,
            value: "#888888"
        },
        show: {
            type: Boolean
        }
    },
    data: {
        show: !1,
        staticUrl: getApp().globalData.staticurl
    },
    methods: {
        cancelCallback: function() {
            this.triggerEvent("cancel");
        },
        hide: function() {
            this.setData({
                show: !1
            });
        },
        show: function() {
            this.setData({
                show: !0
            });
        },
        onGotUserInfo: function(t) {
            this.triggerEvent("confirm", t);
        }
    }
});
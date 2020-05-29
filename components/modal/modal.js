getApp();

Component({
    properties: {
        show: {
            type: Boolean
        },
        showCancel: {
            type: Boolean,
            value: !0
        },
        showTitle: {
            type: Boolean,
            value: !0
        },
        isRed: {
            type: Boolean
        },
        title: {
            type: String
        },
        content: {
            type: String
        },
        cancelText: {
            type: String
        },
        confirmText: {
            type: String
        },
        url: {
            type: String
        },
        openType: {
            type: String
        }
    },
    data: {},
    methods: {
        closeModal: function(e) {
            var t = this;
            e.currentTarget.dataset.type ? (console.log("用户点击了确定"), t.triggerEvent("confirm")) : console.log("用户点击了取消"), 
            t.setData({
                show: !1
            });
        }
    },
    lifetimes: {
        attached: function() {}
    }
});
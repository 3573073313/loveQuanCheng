Component({
    properties: {
        propArray: {
            type: Array
        }
    },
    data: {
        selectShow: !1,
        nowText: "请选择",
        animationData: {}
    },
    methods: {
        selectToggle: function() {
            var t = this.data.selectShow, a = wx.createAnimation({
                timingFunction: "ease"
            });
            this.animation = a, t ? (a.rotate(0).step(), this.setData({
                animationData: a.export()
            })) : (a.rotate(180).step(), this.setData({
                animationData: a.export()
            })), this.setData({
                selectShow: !t
            });
        },
        setText: function(t) {
            var a = this.properties.propArray[t.target.dataset.index].text;
            this.animation.rotate(0).step(), this.setData({
                selectShow: !1,
                nowText: a,
                animationData: this.animation.export()
            });
        }
    }
});
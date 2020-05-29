getApp();

var t, a = wx.createInnerAudioContext();

Component({
    properties: {
        src: {
            type: String
        },
        show: {
            type: Boolean
        }
    },
    data: {
        isPlay: !1,
        staticurl: getApp().globalData.staticurl,
        useTime: "00:00",
        time: "00:00",
        seek: 0,
        duration: 0
    },
    methods: {
        setPlay: function() {
            var e = this, s = e.data.isPlay;
            1 == s ? (a.pause(), clearInterval(t)) : (a.play(), e.setTimeFuc()), e.setData({
                isPlay: !s
            });
        },
        sliderchange: function(t) {
            var e = this, s = t.detail.value, i = e.data.duration, n = parseInt(s * i / 100);
            e.setData({
                value: s,
                seek: n
            }), a.seek(n);
        },
        setTimeFuc: function() {
            var e = this;
            t = setInterval(function() {
                var s = e.data.seek, i = e.data.duration;
                if (s >= i) return clearInterval(t), a.stop(), void e.setData({
                    isPlay: !1
                });
                var n = (s += 1) / i * 100, r = parseInt(s / 60), o = parseInt(s - 60 * r), u = (r < 10 ? "0" + r : r) + ":" + (o < 10 ? "0" + o : o);
                e.setData({
                    value: n,
                    seek: s,
                    useTime: u
                });
            }, 1e3);
        }
    },
    ready: function() {
        var t = this;
        a.src = this.data.src, a.onCanplay(function() {
            a.duration, setTimeout(function() {
                var e = parseInt(a.duration / 60), s = parseInt(a.duration - 60 * e);
                t.setData({
                    duration: a.duration,
                    time: (e < 10 ? "0" + e : e) + ":" + (s < 10 ? "0" + s : s)
                });
            }, 1e3);
        });
    }
});
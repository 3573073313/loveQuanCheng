getApp();

Component({
    properties: {
        selectData: {
            type: Array,
            value: []
        }
    },
    data: {
        show: !1,
        index: 0,
        newSelectData: [],
        nowText: "好事类型",
        nowValue: ""
    },
    methods: {
        selectTap: function() {
            this.setData({
                show: !this.data.show
            });
        },
        optionTap: function(t) {
            var e = this.properties.selectData, a = t.target.dataset.index, s = e[a].label, o = e[a].value;
            this.setData({
                show: !this.data.show,
                nowText: s,
                nowValue: o
            });
            var i = {
                id: a,
                label: s,
                value: o
            };
            this.triggerEvent("myget", i);
        }
    }
});
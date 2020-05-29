getApp();

var t = new (require("../../utils/qqmap-wx-jssdk.js"))({
    key: "P26BZ-IRUK4-ZW5UP-XPMQL-F54SQ-3HBDW"
});

Component({
    properties: {
        staticurl: {
            type: String
        },
        item: {
            type: Object
        },
        isChoose: {
            type: Boolean
        }
    },
    data: {},
    methods: {
        openMap: function(e) {
            var o = this, a = e.currentTarget.dataset.item;
            t.geocoder({
                address: a.address,
                success: function(t) {
                    console.log(t), o.setData({
                        latitude: t.result.location.lat,
                        longitude: t.result.location.lng
                    }), wx.openLocation({
                        latitude: o.data.latitude,
                        longitude: o.data.longitude,
                        name: a.address
                    });
                },
                fail: function(t) {
                    console.log(t);
                }
            });
        }
    }
});
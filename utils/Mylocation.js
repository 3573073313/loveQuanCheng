module.exports.getMylocation = function(t) {
    wx.getLocation({
        type: "wgs84",
        success: function(e) {
            console.log(e), e.latitude, e.longitude, e.speed, e.accuracy;
            var o = e.latitude + "," + e.longitude;
            wx.request({
                url: "https://apis.map.qq.com/ws/geocoder/v1/",
                data: {
                    key: "P26BZ-IRUK4-ZW5UP-XPMQL-F54SQ-3HBDW",
                    location: o
                },
                method: "GET",
                success: function(e) {
                    t(e.data.result);
                }
            });
        }
    });
};
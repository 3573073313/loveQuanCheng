module.exports.wxAutoImageCal = function(e) {
    console.log(e);
    var i = e.detail.width, t = e.detail.height, g = 0, o = 0, a = {};
    return wx.getSystemInfo({
        success: function(e) {
            var h = e.windowWidth;
            e.windowHeight, i > h ? (o = (g = h - 20) * t / i, a.imageWidth = g + "px", a.imageHeight = o + "px", 
            console.log(a.imageHeight, a.imageWidth)) : (a.imageWidth = i + "px", a.imageHeight = t + "px", 
            console.log(a.imageHeight, a.imageWidth));
        }
    }), a;
};
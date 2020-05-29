var t = wx.getSystemInfoSync(), e = t.pixelRatio * t.windowWidth;

module.exports = function(t, i) {
    return function(r) {
        "img" === r.tagName && -1 !== r.attributes.src.indexOf(t) && -1 === r.attributes.src.indexOf("?") && (r.attributes.src += "?imageView2/2/w/" + e, 
        i && (r.attributes.src += "/q/" + i));
    };
};
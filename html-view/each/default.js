var t = require("../vendors/html5-entities"), e = wx.getSystemInfoSync().windowWidth;

module.exports = function(i) {
    if ("Text" !== i.type) {
        if ("video" === i.tagName || "audio" === i.tagName) return i.wxTag = i.tagName, 
        void (i.attributes.src || i.children.some(function(t) {
            return "source" === t.tagName && (i.attributes.src = t.attributes.src, !0);
        }));
        if ("br" === i.tagName) return i.wxTag = "text", void (i.children = [ {
            type: "Text",
            content: "\n"
        } ]);
        if (-1 !== [ "b", "big", "i", "small", "tt", "abbr", "acronym", "cite", "code", "dfn", "em", "kbd", "strong", "samp", "time", "var", "a", "bdo", "map", "object", "q", "script", "span", "sub", "sup", "button", "input", "label", "select", "textarea" ].indexOf(i.tagName) ? i.wxTag = "text" : i.wxTag = "view", 
        "img" === i.tagName) {
            i.wxTag = "image";
            var s = void 0, a = void 0;
            i.attributes.style || (i.attributes.style = {}), i.attributes.style.width && i.attributes.style.width.indexOf("px") ? s = i.attributes.style.width.slice(0, -2) : i.attributes.width && (s = i.attributes.width), 
            i.attributes.style.height && i.attributes.style.height.indexOf("px") ? a = i.attributes.style.height.slice(0, -2) : i.attributes.height && (a = i.attributes.height), 
            i.attributes.style && (delete i.attributes.style.width, delete i.attributes.style.height), 
            delete i.attributes.width, delete i.attributes.height, s && s < e && (i.attributes.style.width = s + "px", 
            a && (i.attributes.style.height = a + "px"));
        }
        i.attributes && i.attributes.style && (i.attributes.styleString = Object.keys(i.attributes.style).map(function(t) {
            return t.replace(/([A-Z])/g, "-$1").toLowerCase() + ": " + i.attributes.style[t];
        }).join(";"));
    } else i.content = t.decode(i.content);
};
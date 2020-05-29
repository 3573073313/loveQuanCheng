var t = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
    return typeof t;
} : function(t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
}, o = function(t) {
    return (t = t.toString())[1] ? t : "0" + t;
};

module.exports = {
    formatTime: function(t) {
        var n = t.getFullYear(), e = t.getMonth() + 1, r = t.getDate(), u = t.getHours(), i = t.getMinutes(), a = t.getSeconds();
        return [ n, e, r ].map(o).join("-") + " " + [ u, i, a ].map(o).join(":");
    },
    formatDate: function(t) {
        return [ t.getFullYear(), t.getMonth() + 1, t.getDate() ].map(o).join("-");
    },
    copy: function o(n) {
        var e = n.constructor === Array ? [] : {};
        if ("object" === (void 0 === n ? "undefined" : t(n))) {
            for (var r in n) e[r] = "object" === t(n[r]) ? o(n[r]) : n[r];
            return e;
        }
    },
    throttle: function(t, o) {
        null != o && void 0 != o || (o = 1500);
        var n = null;
        return function() {
            var e = +new Date();
            (e - n > o || !n) && (t.apply(this, arguments), n = e);
        };
    }
};
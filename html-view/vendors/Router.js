var t = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
    return typeof t;
} : function(t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
};

!function(t, o) {
    if ("function" == typeof define && define.amd) define([ "module", "exports" ], o); else if ("undefined" != typeof exports) o(module, exports); else {
        var e = {
            exports: {}
        };
        o(e, e.exports), t.Router = e.exports;
    }
}(void 0, function(o, e) {
    function r(t, o) {
        if (!(t instanceof o)) throw new TypeError("Cannot call a class as a function");
    }
    e.__esModule = !0;
    var n = "function" == typeof Symbol && "symbol" === t(Symbol.iterator) ? function(o) {
        return void 0 === o ? "undefined" : t(o);
    } : function(o) {
        return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : void 0 === o ? "undefined" : t(o);
    }, i = function() {
        function t(o) {
            r(this, t), this.routes = {}, o.constructor === Array && (o = {
                ALL: o
            });
            for (var e in o) for (var i = o[e], a = this.routes[e] = {
                string: {},
                regex: []
            }, s = i, p = Array.isArray(s), f = 0, s = p ? s : s[Symbol.iterator](); ;) {
                var l;
                if ("break" === function() {
                    if (p) {
                        if (f >= s.length) return "break";
                        l = s[f++];
                    } else {
                        if ((f = s.next()).done) return "break";
                        l = f.value;
                    }
                    var t = l, o = void 0, e = void 0, r = void 0, i = void 0;
                    if (t.constructor === String) o = t, e = "$&", r = [], i = {}; else {
                        var u = t.concat();
                        o = u.shift(), e = u.shift() || "$&", i = "object" == n(u[u.length - 1]) ? u.pop() : {}, 
                        r = u;
                    }
                    o.constructor === RegExp ? a.regex.push({
                        pattern: o,
                        replacement: e,
                        params: r,
                        options: i,
                        origin: t
                    }) : /:|\*|\$/.test(o) ? (r = [], o = o.replace(/[\\&()+.[?^{|]/g, "\\$&").replace(/:(\w+)/g, function(t, o) {
                        return r.push(o), "([^/]+)";
                    }).replace(/\*/g, ".*"), a.regex.push({
                        pattern: new RegExp("^" + o + "$"),
                        replacement: e,
                        params: r,
                        options: i,
                        origin: t
                    })) : a.string[o] = {
                        replacement: "$&" === e ? o : e,
                        options: i,
                        origin: t
                    };
                }()) break;
            }
        }
        return t.prototype.match = function(o) {
            var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "ALL", r = this.routes[e];
            if (r) {
                if (r.string[o]) {
                    var n = {
                        path: r.string[o].replacement,
                        params: {},
                        options: r.string[o].options,
                        origin: r.string[o].origin
                    };
                    return t.log && console.log("path:", o, "\n", "method:", e, "\n", "match:", n), 
                    n;
                }
                for (var i = void 0, a = {}, s = r.regex, p = Array.isArray(s), f = 0, s = p ? s : s[Symbol.iterator](); ;) {
                    var l;
                    if (p) {
                        if (f >= s.length) break;
                        l = s[f++];
                    } else {
                        if ((f = s.next()).done) break;
                        l = f.value;
                    }
                    var u = l, c = o.match(u.pattern);
                    if (c) {
                        -1 !== (i = u.replacement).indexOf("$") && (i = "$&" === i ? o : o.replace(u.pattern, i)), 
                        c.shift();
                        for (var m = 0; m < u.params.length; m++) u.params[m] && (a[u.params[m]] = c[m]);
                        var g = {
                            path: i,
                            params: a,
                            options: u.options,
                            origin: u.origin
                        };
                        return t.log && console.log("path:", o, "\n", "method:", e, "\n", "match:", g), 
                        g;
                    }
                }
            }
            return t.log && console.log("path:", o, "\n", "method:", e, "\n", "match:", null), 
            "ALL" === e ? null : this.match(o);
        }, t;
    }();
    e.default = i, o.exports = e.default;
});
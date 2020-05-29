!function(e, o) {
    if ("function" == typeof define && define.amd) define([ "module", "exports" ], o); else if ("undefined" != typeof exports) o(module, exports); else {
        var t = {
            exports: {}
        };
        o(t, t.exports), e.url = t.exports;
    }
}(void 0, function(e, o) {
    function t(e) {
        var o = {};
        return e.length && e.replace(/\+/g, " ").split("&").forEach(function(e) {
            var t = e.split("="), n = decodeURIComponent(t[0]), r = 1 === t.length ? "" : decodeURIComponent(t[1]);
            null == o[n] ? o[n] = r : (o[n].constructor !== Array && (o[n] = [ o[n] ]), o[n].push(r));
        }), o;
    }
    function n(e) {
        var o = "";
        for (var t in e) !function(t) {
            var n = encodeURIComponent(t);
            [].concat(e[t]).forEach(function(e) {
                null != e && (o += "&" + n, "" !== e && (o += "=" + encodeURIComponent(e)));
            });
        }(t);
        return o.slice(1);
    }
    function r(e) {
        var o = /^(?:([^:/?#]+:))?(?:\/\/(?:(([^:@]*)(?::([^:@]*))?)?@)?(([^:/?#]*)(?::(\d*))?))?(((?:[^?#/]*\/)*[^?#]*)(?:(\?[^#]*))?)(?:(#.*))?/.exec(e), n = {};
        return [ "href", "protocol", "auth", "username", "password", "host", "hostname", "port", "path", "pathname", "search", "hash" ].forEach(function(e, t) {
            return n[e] = o[t] || "";
        }), n.path || n.pathname || (n.path = n.pathname = "/"), n.query = t(n.search.slice(1)), 
        n;
    }
    function a() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, o = e.protocol, t = void 0 === o ? "" : o, r = e.auth, a = void 0 === r ? "" : r, h = e.username, s = void 0 === h ? "" : h, p = e.password, u = void 0 === p ? "" : p, i = e.host, c = void 0 === i ? "" : i, l = e.hostname, f = void 0 === l ? "" : l, d = e.port, v = void 0 === d ? "" : d, m = e.path, y = void 0 === m ? "" : m, x = e.pathname, g = void 0 === x ? "" : x, q = e.search, C = void 0 === q ? "" : q, E = e.query, I = void 0 === E ? null : E, R = e.hash, U = void 0 === R ? "" : R, w = "";
        if (t && (w += t, ":" !== t.slice(-1) && (w += ":")), (t || c || f) && (w += "//"), 
        (c || f) && (a ? w += a + "@" : s && (w += s, u && (w += ":" + u), w += "@"), c ? w += c : (w += f, 
        v && (w += ":" + v))), y) w += y; else if (w += g || "/", C) w += C; else if (I) {
            var Q = n(I);
            Q && (w += "?" + Q);
        }
        return w += U;
    }
    o.__esModule = !0, o.default = {
        parse: r,
        format: a,
        resolve: function(e, o) {
            return e = r(e), (o = r(o)).protocol ? o.href : o.host ? (o.protocol = e.protocol, 
            a(o)) : "/" === o.path[0] ? (e.path = o.path, e.pathname = e.search = "", e.query = null, 
            e.hash = o.hash, a(e)) : (o.pathname && function() {
                var t = e.pathname.split("/");
                t.pop(), o.pathname.split("/").forEach(function(e) {
                    switch (e) {
                      case ".":
                        return;

                      case "..":
                        return t.length > 1 ? t.pop() : null;

                      default:
                        t.push(e);
                    }
                }), e.pathname = t.join("/");
            }(), e.path = "", e.search = o.search, e.query = null, e.hash = o.hash, a(e));
        },
        parseQuery: t,
        formatQuery: n
    }, e.exports = o.default;
});
(function() {
    function t(t, r) {
        for (var n = []; t.length; ) {
            var i = t.indexOf(p);
            if (-1 === i) {
                n.push({
                    type: "Text",
                    content: t
                }), t = "";
                break;
            }
            if (i) n.push({
                type: "Text",
                content: t.slice(0, i)
            }), t = t.slice(i); else if (u(t)) {
                var a = t.indexOf(v);
                n.push({
                    type: "Comment",
                    content: t.slice(m.length, a)
                }), t = t.slice(a + v.length);
            } else if ("/" === t.charAt(i + 1)) {
                var s = t.indexOf(d), c = t.slice(2, s).trim().split(" ")[0];
                t = t.slice(s + 1);
                var l = r.lastIndexOf(c);
                if (~l) {
                    r = r.slice(0, l);
                    break;
                }
            } else {
                var o = e(t, r);
                if (o.tag && (o.tag.type = "Element", n.push(o.tag), t = o.str), o.stack.length !== r.length) {
                    r = o.stack;
                    break;
                }
            }
        }
        return {
            nodes: n,
            stack: r,
            str: t
        };
    }
    function e(e, n) {
        var i = e.indexOf(d), a = e.indexOf(" "), s = ~a ? Math.min(i, a) : i, c = e.slice(1, s), l = c.toLowerCase();
        if (n[n.length - 1] === c && ~x.indexOf(l)) return {
            stack: n.slice(0, -1)
        };
        var u = r(e.slice(s)), f = {
            tagName: c,
            attributes: u.attributes
        };
        if (e = u.str, o(e)) e = e.slice(2); else if (e = e.slice(1), ~A.indexOf(l)) {
            var h = "</" + c + ">", p = e.indexOf(h);
            ~p || (p = 1 / 0), f.content = e.slice(0, p), e = e.slice(p);
        } else if (!~g.indexOf(l)) {
            var m = t(e, n.concat(c));
            f.children = m.nodes, e = m.str, n = m.stack;
        }
        return {
            tag: f,
            str: e,
            stack: n
        };
    }
    function r(t) {
        var e = i(t = t.trim(), 0);
        return {
            str: t = t.slice(e.cursor),
            attributes: e.kvs.map(function(t) {
                var e = n(t.trim(), "=");
                return e[1] = e[1] ? a(e[1]) : e[0], e;
            }).reduce(function(t, e) {
                var r = e[0], n = e[1];
                if ("class" === r) t.className = n.split(" "); else if ("style" === r) t.style = s(n); else if (f(r)) {
                    t.dataset = t.dataset || {};
                    var i = c(r.slice(5));
                    t.dataset[i] = l(n);
                } else t[c(r)] = l(n);
                return t;
            }, {})
        };
    }
    function n(t, e) {
        var r = t.indexOf(e);
        return -1 === r ? [ t ] : [ t.slice(0, r), t.slice(r + e.length) ];
    }
    function i(t, e) {
        for (var r = [], n = null, i = e, a = i, s = t.length; i < s; ) {
            var c = t.charAt(i);
            if (!n && ("/" === c || c === d)) {
                i !== a && r.push(t.slice(a, i));
                break;
            }
            !n && " " === c ? (i !== a && r.push(t.slice(a, i)), a = i + 1, i++) : c === n ? (n = null, 
            i++) : !n && ("'" === c || '"' === c) ? (n = c, i++) : i++;
        }
        for (var l = [], u = r.length, o = 0; o < u; o++) {
            var f = r[o];
            if (f && f.length) {
                if (-1 === f.indexOf("=")) {
                    var h = r[o + 1], p = r[o + 2];
                    if ("=" === h && p) {
                        var m = f + "=" + p;
                        l.push(m), o += 2;
                        continue;
                    }
                }
                l.push(f);
            }
        }
        return {
            cursor: i,
            kvs: l
        };
    }
    function a(t) {
        var e = t.charAt(0), r = t.length - 1;
        return '"' === e || "'" === e && e === t.charAt(r) ? t.slice(1, r) : t;
    }
    function s(t) {
        return t.trim().split(";").map(function(t) {
            return t.trim().split(":");
        }).reduce(function(t, e) {
            return e[1] && (t[c(e[0].trim())] = l(e[1].trim())), t;
        }, {});
    }
    function c(t) {
        return t.split("-").reduce(function(t, e) {
            return t + e.charAt(0).toUpperCase() + e.slice(1);
        });
    }
    function l(t) {
        if ("string" != typeof t) return t;
        var e = +t;
        return isNaN(e) ? t : e;
    }
    function u(t) {
        return "<" === t.charAt(0) && "!" === t.charAt(1) && "-" === t.charAt(2) && "-" === t.charAt(3);
    }
    function o(t) {
        return "/" === t.charAt(0) && ">" === t.charAt(1);
    }
    function f(t) {
        return "d" === t.charAt(0) && "a" === t.charAt(1) && "t" === t.charAt(2) && "a" === t.charAt(3) && "-" === t.charAt(4);
    }
    var h = this, p = "<", d = ">", m = "\x3c!--", v = "--\x3e", g = [ "!doctype", "area", "base", "br", "col", "command", "embed", "hr", "img", "input", "keygen", "link", "meta", "param", "source", "track", "wbr" ], x = [ "colgroup", "dd", "dt", "li", "options", "p", "td", "tfoot", "th", "thead", "tr" ], A = [ "style", "script", "template" ], k = {
        parse: function(e) {
            return t(e + "</root>", [ "root" ]).nodes;
        },
        parseTag: e,
        parseUntil: t,
        parseAttrs: r,
        parseStyle: s
    };
    "undefined" != typeof exports ? ("undefined" != typeof module && module.exports && (exports = module.exports = k), 
    exports.himalaya = k) : h.himalaya = k;
}).call(void 0);
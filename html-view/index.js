function e(e, r) {
    if (!(e instanceof r)) throw new TypeError("Cannot call a class as a function");
}

var r = function() {
    function e(e, r) {
        for (var n = 0; n < r.length; n++) {
            var t = r[n];
            t.enumerable = t.enumerable || !1, t.configurable = !0, "value" in t && (t.writable = !0), 
            Object.defineProperty(e, t.key, t);
        }
    }
    return function(r, n, t) {
        return n && e(r.prototype, n), t && e(r, t), r;
    };
}(), n = require("./vendors/himalaya"), t = require("./each/default"), i = require("./each/resolveUrl"), a = function() {
    function a(r) {
        var o = (arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}).baseUrl;
        e(this, a), this.nodes = n.parse(r), o && this.each(i(o)), this.each(t);
    }
    return r(a, [ {
        key: "each",
        value: function(e) {
            return this._each(e, this.nodes), this;
        }
    }, {
        key: "_each",
        value: function(e, r) {
            var n = this;
            r.forEach(function(r) {
                for (var t = arguments.length, i = Array(t > 1 ? t - 1 : 0), a = 1; a < t; a++) i[a - 1] = arguments[a];
                e.apply(void 0, [ r ].concat(i)), r.children && n._each(e, r.children);
            });
        }
    }, {
        key: "filter",
        value: function(e) {
            return this.nodes = this._filter(e, this.nodes), this;
        }
    }, {
        key: "_filter",
        value: function(e, r) {
            var n = this;
            return r.filter(function(r) {
                for (var t = arguments.length, i = Array(t > 1 ? t - 1 : 0), a = 1; a < t; a++) i[a - 1] = arguments[a];
                var o = e.apply(void 0, [ r ].concat(i));
                return o && r.children && (r.children = n._filter(e, r.children)), o;
            });
        }
    }, {
        key: "map",
        value: function(e) {
            return this.nodes = this._map(e, this.nodes), this;
        }
    }, {
        key: "_map",
        value: function(e, r) {
            var n = this;
            return r.map(function(r) {
                for (var t = arguments.length, i = Array(t > 1 ? t - 1 : 0), a = 1; a < t; a++) i[a - 1] = arguments[a];
                return (r = e.apply(void 0, [ r ].concat(i))).children && (r.children = n._map(e, r.children)), 
                r;
            });
        }
    } ]), a;
}();

module.exports = a;
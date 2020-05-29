var r = require("../vendors/url"), a = require("../vendors/Router");

module.exports = function(e, t) {
    return function(n) {
        if ("a" === n.tagName) {
            var u = r.parse(n.attributes.href);
            if (u.hostname === e) {
                var o = new a(t).match(u.pathname);
                o && (n.wxTag = "navigator", n.url = r.format({
                    pathname: o.path,
                    query: Object.assign(u.query, o.params, o.options)
                }));
            }
        }
    };
};
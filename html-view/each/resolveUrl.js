var t = require("../vendors/url").resolve;

module.exports = function(e) {
    return function(r) {
        -1 !== [ "img", "video", "audio", "source" ].indexOf(r.tagName) ? r.attributes.src && (r.attributes.src = t(e, r.attributes.src)) : "a" === r.tagName && (r.attributes.href = t(e, r.attributes.href));
    };
};
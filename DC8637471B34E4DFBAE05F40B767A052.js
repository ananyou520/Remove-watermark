!function(n) {
    function r(n, r) {
        var t = (65535 & n) + (65535 & r);
        return (n >> 16) + (r >> 16) + (t >> 16) << 16 | 65535 & t;
    }
    function t(n, t, e, o, u, c) {
        return r((f = r(r(t, n), r(o, c))) << (i = u) | f >>> 32 - i, e);
        var f, i;
    }
    function e(n, r, e, o, u, c, f) {
        return t(r & e | ~r & o, n, r, u, c, f);
    }
    function o(n, r, e, o, u, c, f) {
        return t(r & o | e & ~o, n, r, u, c, f);
    }
    function u(n, r, e, o, u, c, f) {
        return t(r ^ e ^ o, n, r, u, c, f);
    }
    function c(n, r, e, o, u, c, f) {
        return t(e ^ (r | ~o), n, r, u, c, f);
    }
    function f(n, t) {
        var f, i, a, h, g;
        n[t >> 5] |= 128 << t % 32, n[14 + (t + 64 >>> 9 << 4)] = t;
        var l = 1732584193, v = -271733879, d = -1732584194, C = 271733878;
        for (f = 0; f < n.length; f += 16) i = l, a = v, h = d, g = C, l = e(l, v, d, C, n[f], 7, -680876936), 
        C = e(C, l, v, d, n[f + 1], 12, -389564586), d = e(d, C, l, v, n[f + 2], 17, 606105819), 
        v = e(v, d, C, l, n[f + 3], 22, -1044525330), l = e(l, v, d, C, n[f + 4], 7, -176418897), 
        C = e(C, l, v, d, n[f + 5], 12, 1200080426), d = e(d, C, l, v, n[f + 6], 17, -1473231341), 
        v = e(v, d, C, l, n[f + 7], 22, -45705983), l = e(l, v, d, C, n[f + 8], 7, 1770035416), 
        C = e(C, l, v, d, n[f + 9], 12, -1958414417), d = e(d, C, l, v, n[f + 10], 17, -42063), 
        v = e(v, d, C, l, n[f + 11], 22, -1990404162), l = e(l, v, d, C, n[f + 12], 7, 1804603682), 
        C = e(C, l, v, d, n[f + 13], 12, -40341101), d = e(d, C, l, v, n[f + 14], 17, -1502002290), 
        l = o(l, v = e(v, d, C, l, n[f + 15], 22, 1236535329), d, C, n[f + 1], 5, -165796510), 
        C = o(C, l, v, d, n[f + 6], 9, -1069501632), d = o(d, C, l, v, n[f + 11], 14, 643717713), 
        v = o(v, d, C, l, n[f], 20, -373897302), l = o(l, v, d, C, n[f + 5], 5, -701558691), 
        C = o(C, l, v, d, n[f + 10], 9, 38016083), d = o(d, C, l, v, n[f + 15], 14, -660478335), 
        v = o(v, d, C, l, n[f + 4], 20, -405537848), l = o(l, v, d, C, n[f + 9], 5, 568446438), 
        C = o(C, l, v, d, n[f + 14], 9, -1019803690), d = o(d, C, l, v, n[f + 3], 14, -187363961), 
        v = o(v, d, C, l, n[f + 8], 20, 1163531501), l = o(l, v, d, C, n[f + 13], 5, -1444681467), 
        C = o(C, l, v, d, n[f + 2], 9, -51403784), d = o(d, C, l, v, n[f + 7], 14, 1735328473), 
        l = u(l, v = o(v, d, C, l, n[f + 12], 20, -1926607734), d, C, n[f + 5], 4, -378558), 
        C = u(C, l, v, d, n[f + 8], 11, -2022574463), d = u(d, C, l, v, n[f + 11], 16, 1839030562), 
        v = u(v, d, C, l, n[f + 14], 23, -35309556), l = u(l, v, d, C, n[f + 1], 4, -1530992060), 
        C = u(C, l, v, d, n[f + 4], 11, 1272893353), d = u(d, C, l, v, n[f + 7], 16, -155497632), 
        v = u(v, d, C, l, n[f + 10], 23, -1094730640), l = u(l, v, d, C, n[f + 13], 4, 681279174), 
        C = u(C, l, v, d, n[f], 11, -358537222), d = u(d, C, l, v, n[f + 3], 16, -722521979), 
        v = u(v, d, C, l, n[f + 6], 23, 76029189), l = u(l, v, d, C, n[f + 9], 4, -640364487), 
        C = u(C, l, v, d, n[f + 12], 11, -421815835), d = u(d, C, l, v, n[f + 15], 16, 530742520), 
        l = c(l, v = u(v, d, C, l, n[f + 2], 23, -995338651), d, C, n[f], 6, -198630844), 
        C = c(C, l, v, d, n[f + 7], 10, 1126891415), d = c(d, C, l, v, n[f + 14], 15, -1416354905), 
        v = c(v, d, C, l, n[f + 5], 21, -57434055), l = c(l, v, d, C, n[f + 12], 6, 1700485571), 
        C = c(C, l, v, d, n[f + 3], 10, -1894986606), d = c(d, C, l, v, n[f + 10], 15, -1051523), 
        v = c(v, d, C, l, n[f + 1], 21, -2054922799), l = c(l, v, d, C, n[f + 8], 6, 1873313359), 
        C = c(C, l, v, d, n[f + 15], 10, -30611744), d = c(d, C, l, v, n[f + 6], 15, -1560198380), 
        v = c(v, d, C, l, n[f + 13], 21, 1309151649), l = c(l, v, d, C, n[f + 4], 6, -145523070), 
        C = c(C, l, v, d, n[f + 11], 10, -1120210379), d = c(d, C, l, v, n[f + 2], 15, 718787259), 
        v = c(v, d, C, l, n[f + 9], 21, -343485551), l = r(l, i), v = r(v, a), d = r(d, h), 
        C = r(C, g);
        return [ l, v, d, C ];
    }
    function i(n) {
        var r, t = "", e = 32 * n.length;
        for (r = 0; r < e; r += 8) t += String.fromCharCode(n[r >> 5] >>> r % 32 & 255);
        return t;
    }
    function a(n) {
        var r, t = [];
        for (t[(n.length >> 2) - 1] = void 0, r = 0; r < t.length; r += 1) t[r] = 0;
        var e = 8 * n.length;
        for (r = 0; r < e; r += 8) t[r >> 5] |= (255 & n.charCodeAt(r / 8)) << r % 32;
        return t;
    }
    function h(n) {
        var r, t, e = "";
        for (t = 0; t < n.length; t += 1) r = n.charCodeAt(t), e += "0123456789abcdef".charAt(r >>> 4 & 15) + "0123456789abcdef".charAt(15 & r);
        return e;
    }
    function g(n) {
        return unescape(encodeURIComponent(n));
    }
    function l(n) {
        return function(n) {
            return i(f(a(n), 8 * n.length));
        }(g(n));
    }
    function v(n, r) {
        return function(n, r) {
            var t, e, o = a(n), u = [], c = [];
            for (u[15] = c[15] = void 0, o.length > 16 && (o = f(o, 8 * n.length)), t = 0; t < 16; t += 1) u[t] = 909522486 ^ o[t], 
            c[t] = 1549556828 ^ o[t];
            return e = f(u.concat(a(r)), 512 + 8 * r.length), i(f(c.concat(e), 640));
        }(g(n), g(r));
    }
    module.exports = function(n, r, t) {
        return r ? t ? v(r, n) : h(v(r, n)) : t ? l(n) : h(l(n));
    };
}();
var o = require("@babel/runtime/helpers/interopRequireDefault.js")(require("@babel/runtime/helpers/typeof.js"));

function t(e) {
    return (t = "function" == typeof Symbol && "symbol" == (0, o.default)(Symbol.iterator) ? function(t) {
        return (0, o.default)(t);
    } : function(t) {
        return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : (0, 
        o.default)(t);
    })(e);
}

function e(o) {
    return "function" == typeof Symbol && "symbol" === t(Symbol.iterator) ? module.exports = e = function(o) {
        return t(o);
    } : module.exports = e = function(o) {
        return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : t(o);
    }, e(o);
}

module.exports = e;
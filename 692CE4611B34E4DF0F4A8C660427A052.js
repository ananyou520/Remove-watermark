module.exports = {
    formatDate: function(e) {
        var t = new Date(t);
        return t.getFullYear() + "-" + ((t.getMonth() + 1 < 10 ? "0" + (t.getMonth() + 1) : t.getMonth() + 1) + "-") + (t.getDate() < 10 ? "0" + t.getDate() : t.getDate()) + " " + ((t.getHours() < 10 ? "0" + t.getHours() : t.getHours()) + ":") + ((t.getMinutes() < 10 ? "0" + t.getMinutes() : t.getMinutes()) + ":") + (t.getSeconds() < 10 ? "0" + t.getSeconds() : t.getSeconds());
    }
};
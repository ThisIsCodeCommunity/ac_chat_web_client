function setCookie(name, value) {
    var days = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 7;
    var path = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '/';

    return new Promise(function (resolve) {
        var expires = new Date(Date.now() + days * 864e5).toUTCString();
        document.cookie = name + '=' + encodeURIComponent(value) + '; expires=' + expires + '; path=' + path;
        resolve();
    });
}

function getCookie(name) {
    return new Promise(function (resolve) {
        var value = document.cookie.split('; ').reduce(function (r, v) {
            var parts = v.split('=');
            return parts[0] === name ? decodeURIComponent(parts[1]) : r
        }, '');
        resolve(value);
    })
}
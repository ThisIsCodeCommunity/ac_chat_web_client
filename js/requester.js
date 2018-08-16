function Requester() {}

Requester.prototype.xhrError = function() {
    console.error(this.statusText);
};

Requester.prototype.post = function(url, params, callbackOnLoad) {
    var callback = callbackOnLoad || false;
    var data = params || {};
    var request = new XMLHttpRequest();
    request.open("POST", url, true);
    request.setRequestHeader("Content-type", "application/json");
    request.callback = callback;
    request.onerror = this.xhrError;
    request.send(JSON.stringify(data));

    if (false !== callback) {
        return new Promise(function (resolve) {
            request.addEventListener("load", function () {
                callback(request);
                resolve(request);
            });
        });
    } else {
        return request;
    }
};
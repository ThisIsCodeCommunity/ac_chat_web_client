function Requester() {}

Requester.prototype.xhrError = function() {
    console.error(this.statusText);
};

Requester.prototype.post = function(url, params, callback) {
    var request = new XMLHttpRequest();
    request.open("POST", url, true);
    request.setRequestHeader("Content-type", "application/json");
    request.callback = callback;
    request.onerror = this.xhrError;
    request.send(JSON.stringify(params));
    request.addEventListener("load", function () {
        callback(request);
    });

    return request;
};
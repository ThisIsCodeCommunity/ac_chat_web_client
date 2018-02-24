function Requester() {}

Requester.prototype.post = function(url, params, callback) {
    var request = new XMLHttpRequest();
    request.open("POST", url, true);
    request.setRequestHeader("Content-type", "application/json");
    request.send(JSON.stringify(params));
    request.addEventListener("load", function () {
        return callback(request);
    });
};
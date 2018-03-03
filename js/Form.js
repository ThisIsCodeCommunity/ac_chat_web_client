function Form () {}

Form.prototype.loadPartials = function () {
    var messageCallback = function (request) {
        document.getElementById('message-form-container').innerHTML = request.responseText;
    };
    var nicknameCallback = function (request) {
        document.getElementById('nickname-form-container').innerHTML = request.responseText;
    };

    App.requester.post('partials/message-form.html', {}, messageCallback);
    return App.requester.post('partials/nickname-form.html', {}, nicknameCallback);
};
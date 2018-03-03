(function () {
    this.App || (this.App = {});

    App.cable = ActionCable.createConsumer(consumerUrl);
    console.log(App.cable);

    App.getNickname = function () {
        var promise = App.cookie.get('nickname');
        promise.then(function (result) {
            if (result !== '') {
                document.getElementById('message').setAttribute('placeholder', 'Please be nice, ' + result);
                document.getElementById('message-form').style.display = 'block';
            } else {
                document.getElementById('nickname-form').style.display = 'block';
            }
        });
    };

    App.setNickname = function (value) {
        var promise = App.analyzer.analyze(value);
        promise.then(function (result) {
            var messageData = JSON.parse(result.responseText);
            if (messageData.results.value !== 'Adult') {
                App.cookie.set('nickname', value);
                document.getElementById('message').setAttribute('placeholder', 'Please be nice, ' + value);
                document.getElementById('message-form').style.display = 'block';
                document.getElementById('nickname-form').style.display = 'none';
            }
        });
    };

    App.cookie = new Cookies();
    App.requester = new Requester();
    App.analyzer = new Analyzer();
    App.form = new Form();

    var resultPromise = App.form.loadPartials();
    resultPromise.then(function (result) {
        App.getNickname();
    });
}).call(this);
var consumerUrl = 'https://cnc-chat.herokuapp.com/cable';
var analyzeUrl = "https://ca-image-analyzer.herokuapp.com/api/analyses";
var getRoomsUrl = 'https://cnc-chat.herokuapp.com/';

(function () {
    this.App || (this.App = {});

    App.cable = ActionCable.createConsumer(consumerUrl);
    console.log(App.cable);

    var promise = getCookie('nickname');
    promise.then(function(result) {
        if (result !== '') {
            document.getElementById('message').setAttribute('placeholder', 'Please be nice, ' + result);
            document.getElementById('message-form').style.display = 'block';
        } else {
            document.getElementById('nickname-form').style.display = 'block';
        }
    });

    App.setNickname = function (value) {
        setCookie('nickname', value);
        document.getElementById('message-form').style.display = 'block';
        document.getElementById('nickname-form').style.display = 'none';
    };

    App.requester = new Requester();
    App.analyzer = new Analyzer();
}).call(this);

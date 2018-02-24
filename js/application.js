var consumerUrl = 'https://cnc-chat.herokuapp.com/cable';
var sendMessageUrl = 'https://cnc-chat.herokuapp.com/messages';

(function () {
    this.App || (this.App = {});

    App.cable = ActionCable.createConsumer(consumerUrl);
    console.log(App.cable);
}).call(this);
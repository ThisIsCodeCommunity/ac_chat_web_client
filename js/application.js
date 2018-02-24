var consumerUrl = 'https://cnc-chat.herokuapp.com/cable';
var sendMessageUrl = 'http://cnc-chat.herokuapp.com/chat_rooms/1/messages';
var analyzeUrl = "https://ca-image-analyzer.herokuapp.com/api/analyses";

(function () {
    this.App || (this.App = {});

    App.cable = ActionCable.createConsumer(consumerUrl);
    console.log(App.cable);

    App.requester = new Requester();
    App.analyzer = new Analyzer();
}).call(this);
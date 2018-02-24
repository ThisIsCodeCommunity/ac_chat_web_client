var consumerUrl = 'https://cnc-chat.herokuapp.com/cable';
var analyzeUrl = "https://ca-image-analyzer.herokuapp.com/api/analyses";

(function () {
    this.App || (this.App = {});

    App.cable = ActionCable.createConsumer(consumerUrl);
    console.log(App.cable);

    App.requester = new Requester();
    App.analyzer = new Analyzer();
}).call(this);
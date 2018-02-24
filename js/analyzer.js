function Analyzer() {}

Analyzer.prototype.analyze = function() {
    var input = document.getElementById('message');
    var params = {analysis: {resource: input.value, category: 'text'}};

    var callback = function (request) {
        var messageData = JSON.parse(request.responseText);
        if (messageData.results.value === 'Adult') {
            alert('Please consider using a more pleasant linguistics');
            return false;
        }
        return true;
    };

    var request = App.requester.post(analyzeUrl, params, callback);
};
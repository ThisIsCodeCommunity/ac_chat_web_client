document.addEventListener('DOMContentLoaded', function () {
    if (Notification.permission !== "granted") {
        Notification.requestPermission();
    }

    var input = document.getElementById('message');
    input.addEventListener('keydown', function () {
        if (input.value.length >= 10) {
            var params = {analysis: {resource: input.value, category: 'text'}};
            var request = new XMLHttpRequest();
            request.open("POST", "https://ca-image-analyzer.herokuapp.com/api/analyses", true);
            request.setRequestHeader("Content-type", "application/json");
            request.send(JSON.stringify(params));
            request.addEventListener("load", function () {
                var messageData = JSON.parse(request.responseText);
                if (messageData.results.value === 'Adult') {
                    console.log('no can do!')
                }
            });
        }
    });
}, false);
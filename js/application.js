(function () {
    this.App || (this.App = {});

    // App.cable = ActionCable.createConsumer('ws://localhost:3000/cable');
    App.cable = ActionCable.createConsumer('wss://cnc-chat.herokuapp.com/cable');

}).call(this);

App.room = App.cable.subscriptions.create({channel: 'ChatRoomChannel', room_id: '1'}, {
    connected: function (data) {
        // Called when the subscription is ready for use on the server
        console.log('connected')
    },

    disconnected: function () {
        // Called when the subscription has been terminated by the server
        console.log('disconnected')
    },

    received: function (data) {
        // Called when there's incoming data on the websocket for this channel
        console.log('received message')
        return this.appendMessage(data);
    },

    appendMessage: function (data) {
        var parent = document.getElementById('messages');
        var newChild = '<p>' + data.sender + ' says: ' + data.message + '</p>';
        parent.insertAdjacentHTML('beforeend', newChild);
        this.notifyMe(data.message);
    },

    sendMessage: function (message) {
        //debugger;
        //App.room.send({message: {content: message}})
        var xhttp = new XMLHttpRequest();
        //xhttp.open("POST", "http://localhost:3000/messages", true);
        xhttp.open("POST", "https://cnc-chat.herokuapp.com/messages", true);
        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.send(JSON.stringify({message: {content: message}}));
    },


    notifyMe: function (text) {
        if (Notification.permission !== "granted")
            Notification.requestPermission();
        else {
            var notification = new Notification('Notification title', {
                icon: 'https://github.com/CraftAcademy/craft-assets/blob/gh-pages/images/logo/graphic_only_logo_white.png?raw=true',
                body: text
            });

            notification.onclick = function () {
                window.open("http://stackoverflow.com/a/13328397/1269037");
            };

        }

    }
});

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

function strip(str) {
    // Remove some tags
    str = str.replace(/<[^>]+>/gim, '');

    // Remove BB code
    str = str.replace(/\[(\w+)[^\]]*](.*?)\[\/\1]/g, '$2 ');

    // Remove html and line breaks
    const div = document.createElement('div');
    div.innerHTML = str;

    const input = document.createElement('input');
    input.value = div.textContent || div.innerText || '';

    return input.value.trim();
}
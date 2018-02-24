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
        //this.notifyMe(data.message);
    },

    sendMessage: function (message) {
        //App.room.send({message: {content: message}})
        var xhttp = new XMLHttpRequest();
        xhttp.open("POST", sendMessageUrl, true);
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
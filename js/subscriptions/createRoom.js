App.room = App.cable.subscriptions.create({channel: 'ChatRoomChannel', room_id: '1'}, {
    connected: function (data) {
        // Called when the subscription is ready for use on the server
        console.log('connected');
    },

    disconnected: function () {
        // Called when the subscription has been terminated by the server
        console.log('disconnected');
    },

    received: function (data) {
        // Called when there's incoming data on the websocket for this channel
        console.log('received message');
        return this.appendMessage(data);
    },

    appendMessage: function (data) {
        var parent = document.getElementById('messages');
        var newChild = '<p>' + data.sender + ' says: ' + data.message + '</p>';
        parent.insertAdjacentHTML('beforeend', newChild);
        //this.notifyMe(data.message);
    },

    sendMessage: function (message) {
        App.analyzer.analyze(message);
        var sendMessageUrl = 'https://cnc-chat.herokuapp.com/chat_rooms/1/messages';

        var promise = App.cookie.get('nickname');
        promise.then(function(nickname) {
            var params = {
                message: {
                    sender: nickname,
                    body: message
                }
            };

            App.requester.post(sendMessageUrl, params, function(response) {
                if (response.status !== 200) {
                    console.log(response.responseText);
                }
            });
        });
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
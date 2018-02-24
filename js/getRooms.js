function getRooms() {
    "use strict";
    fetch(getRoomsUrl, {
        headers: new Headers({
            'Accept': 'application/json'
        })
    }).then(function (response) {
        response.json().then(function (data) {
            debugger;

            return data;
        })
    });
}

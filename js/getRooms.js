function getRooms() {
    "use strict";

    return new Promise(function(resolve){
        fetch(getRoomsUrl, {
            headers: new Headers({
                'Accept': 'application/json'
            })
        }).then(function (response) {
            response.json().then(function (data) {
                resolve(data);
            })
        });
    })

}

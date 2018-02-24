function getRooms() {
  fetch(getRoomsUrl).then(function(response) {
    response.json().then(function(data) {
      return data;
    })
  })
}

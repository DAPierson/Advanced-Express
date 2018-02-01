let delChirp = (id) => {
    $.ajax({
        url: `/api/chirps/${id}`,
        type: 'DELETE',
    }).then(() => {
        $('#chirpContainer').empty();
        loadPage();
        console.log('chirp deleted')
    })
}



let updateChirp = (user, text, id) => {
    let newUser = user;
    let chirpText = text;
    let newId = id;
    $.ajax({
        type: 'PUT',
        url: `/api/chirps/${newId}`,
        data: JSON.stringify({
            user: newUser,
            text: chirpText
        }),
        contentType: 'application/json'

    }).then(() => {
        $('#chirpContainer').empty();
        loadPage();
    })
}



let loadPage = () => {
    $.ajax({
        url: '/api/chirps',
        type: 'GET',
        dataType: 'json'

    }).then((chirps) => {
        console.log(chirps);
        let keys = Object.keys(chirps);
        for (let key of keys) {
            if (key !== 'nextid') {
                console.log(chirps[key].user, chirps[key].text, key);
                createChirp(chirps[key], key);

            }
        }
    })
}



let createChirp = (chirps, key) => {
    $('#chirpContainer').append(`<p class="mb-1" data-toggle = "modal" data-target = "#modal${key}">${chirps.user}: ${chirps.text}
    
    <div class="modal" id="modal${key}" tabindex="0" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="modalLabel">Change Chirp</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <input type="text" class="form-control" id="editUser${key}" rows ="3"placeholder="Edit User">
        <input type="text" class="form-control" id="editChirp${key}" rows ="3"placeholder="Edit Chirp">
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          <button type="button" id = btn-${key} class="btn btn-primary">Save changes</button>
        </div>
      </div>
    </div>
  </div>
  </p>
  <button id = ${key} type="button" class="btn btn-danger">X</button>`);
    $(`#${key}`).click(function () {
        delChirp(this.id);
    })

    $(`#btn-${key}`).click(function () {
        let text = $(`#editChirp${key}`).val();
        let user = $(`#editUser${key}`).val();
        let newId = this.id.split('-').pop();
        console.log(user, text, newId);
        updateChirp(user, text, newId);
        $(`#modal${key}`).modal('hide');
    })
}


loadPage();


$('form').submit((ev) => {
    ev.preventDefault();
    let chirpText = $('#chirp').val();
    let newUser = $('#user').val();

    $.ajax({
        type: 'POST',
        url: '/api/chirps',
        data: JSON.stringify({
            user: newUser,
            text: chirpText
        }),
        contentType: 'application/json'
    }).then(() => {
        $('#chirpContainer').empty();
        $('#chirp').val("");
        $('#user').val("");
        loadPage();

    }).catch((err) => {
        console.log(err);
    });
});








//if user clicks follow, show green success alert with timeout to 3000 and change button to unfollow.
//if user clicks unfollow, show yellow warning walert with button that confirms or cancels the unfollow, if confirmed, change button to follow.


//html for user card on users page
// <div class="col-sm-3">
//     <img class="postIMG" src="http://unsplash.it/400?image=715" alt="user profile photo" />
//     <h5 class="postBird">YetAnotherBird</h5>
//         <button type="button" id="status" data-complete-text="follow" class="btn btn-primary" autocomplete="off">
//             Follow
//         </button>
// </div>

//start Collin's js from class:
document.querySelector('#users').addEventListener('click', function(e) {
    var userListItem = e.target;
    var userId = userListItem.dataset.id;

    location.href = 'messages.html?userId=' + userId;
});

document.querySelector('#logout').addEventListener('click', function() {
    sessionStorage.clear();
    location.href = 'index.html?logout=yes';
    // sessionStorage.removeItem('token');
});

document.querySelector('#sendMessage').addEventListener('click', sendMessage);

document.querySelector('#message').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
})


getUsers();

function getUsers() {
    var token = sessionStorage.getItem('token');

    fetch('http://acc70ddc.ngrok.io/users')
    .then(function(response) {
        return response.json();
    })
    .then(function(response) {
        renderUsersList(response);
    })
}

function renderUsersList(users) {
    console.log(users);

    users.forEach(function(user) {
        var userListItem = `<li data-id="${user.id}" class="list-group-item">${user.username}</li>`;

        document.querySelector('#users').innerHTML += userListItem;
    });
}

function sendMessage() {
    var message = document.querySelector('#message').value;
    var token = sessionStorage.getItem('token');

    document.querySelector('#message').value = '';

    fetch('http://acc70ddc.ngrok.io/messages', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },

        // Back-end controls the left side, properties, of this object
        // Front-end controls the variables names and values on the right side
        body: JSON.stringify({
            body: message,
            token: token
        })
    })
        .then(function(response) {
            return response.json();
        })
        .then(function(response) {
            // console.log(response);

            var messageSent = document.querySelector('#messageSent');
            messageSent.classList.remove('hidden');
            messageSent.children[0].innerHTML = 'Message Sent: ' + response.body;

            setTimeout(function() {
                messageSent.classList.add('hidden');
            }, 3000);

        })
}
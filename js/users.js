//  send a fetch request to /users it should return a list of our current users.

//make the list of all users
getUsers();

function getUsers() {
    var token = sessionStorage.getItem('token');

    fetch('https://sleepy-gorge-91783.herokuapp.com/users?token=' + token)
    .then(function(response) {
        return response.json();
    })
    .then(function(response) {
        renderUsersList(response);
    })
}

function renderUsersList(users) {
    // console.log(users);

    users.forEach(function(user) {
        var userListItem = `<div class="col-sm-4">
            <div class="usersCard">
                <img class="userImgTN" src="${user.avatar}" alt="${user.username} profile photo" />
                <h5 class="usersCardName">${user.username}</h5>
                <button type="button" id="status" data-complete-text="follow" class="btn btn-primary" autocomplete="off">
                    Follow
                </button>
            </div>
        </div>`

        document.querySelector('#users').innerHTML += userListItem;
    });
}

// Need to listen in on the click on buttons to follow and unfollow users. 
// document.querySelector('#status').addEventListener('click', function(e) {
//     var followButton = e.target;

// });

//script from bootstrap that is supposed to go with #status button. Not sure how to change button text to unfollow.
// <script>
//     $('#myStateButton').on('click', function () {
//         $(this).button('complete') // button text will be "finished!"
//     })
// </script>

//if user clicks follow, send info to POST to /users/follow/:username will follow the target :username if they're not already followers AND change button to unfollow.


//if user clicks unfollow, show yellow warning alert with button that confirms or cancels the unfollow, if confirmed, send info to POST to /users/unfollow/:username will unfollow AND change button to follow if cancelled close box and leave button as unfollow.



//html for user card on users page

// <div class="col-sm-4">
//     <div class="usersCard">
//         <img class="userImgTN" src="http://unsplash.it/400?image=720" alt="user profile photo" />
//         <h5 class="usersCardName">AnotherBird</h5>
//         <button type="button" id="status" data-complete-text="follow" class="btn btn-primary" autocomplete="off">
//             Follow
//         </button>
//     </div>
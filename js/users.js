//  send a fetch request to /users it should return a list of our current users.

//make the list of all users
var user = JSON.parse(sessionStorage.getItem('user'));
var token = user.token;

getUsers();

function getUsers() {
    fetch('https://sleepy-gorge-91783.herokuapp.com/users?token=' + user.token)
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
        var userListItem = `<div class="col-xs-4">
            <div class="usersCard">
                <img class="userImgTN" src="${user.image}" alt="${user.username} profile photo"/>
                <h5 class="usersCardName">${user.username}</h5>
                <button type='button' class='btn-status btn btn-lg btn-primary' data-username="${user.username}">Follow</button>
            </div>
        </div>`
//added data-id="${user.id}" so that it stashes the current user's id into the html attribute as a value dynamically. 
        document.querySelector('#users').innerHTML += userListItem;
    });
}

// Need to listen in on the click on buttons to follow and unfollow users. 
document.querySelector('#users').addEventListener('click', function(e) {
    if (e.target.classList.contains('btn-status')) {
        var followButton = e.target;
        var username = followButton.dataset.username; // this is how we get to that data attribute that we called for in teh data-id out of the html. 

        //if user clicks follow, send info to POST to /users/follow/:username will follow the target :username if they're not already followers AND change button to unfollow.
        if (followButton.innerHTML === 'Follow') {
               followButton.innerHTML = 'Unfollow';
                fetch('https://sleepy-gorge-91783.herokuapp.com/users/follow/' + username, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },

                // Back-end controls the left side, properties, of this object
                // Front-end controls the variables names and values on the right side
                body: JSON.stringify({
                    token: token
                })
            })
                .then(function(response) {
                    return response.json();
                })
                .then(function(response) {
                })
            }

        //if user clicks unfollow, send info to POST to /users/unfollow/:username will unfollow AND change button to follow.
            else if (folllowButton.innerHTML === 'Unfollow') {
                followButton.innerHTML = 'Follow';
                fetch('https://sleepy-gorge-91783.herokuapp.com/users/unfollow/' + username, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },

                // Back-end controls the left side, properties, of this object
                // Front-end controls the variables names and values on the right side
                body: JSON.stringify({
                    token: token
                })
            })
                .then(function(response) {
                    return response.json();
                })
                .then(function(response) {
                })
            }
    }
});



//html for user card on users page

// <div class="col-sm-4">
//     <div class="usersCard">
//         <img class="userImgTN" src="http://unsplash.it/400?image=720" alt="user profile photo" />
//         <h5 class="usersCardName">AnotherBird</h5>
//         <button type='button' id='status' class='btn btn-lg btn-primary'>Follow</button>
//     </div>
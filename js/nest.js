//calling the function getting the main user's information
getUser();

function getUser() {
    var user = JSON.parse(sessionStorage.getItem('user'));

    addUserInfo(user);
    addUserImg(user);
};

//function to get the user's name.
function addUserInfo(user) {
    var mainUserName = `<h4><strong><span id="hello">Hello, </span><br/><span id="userName">${user.username}</span></strong></h4>
    </div>`;
   
   document.querySelector('#nesterName').innerHTML = mainUserName;

//    console.log(mainUserName);
};

//function to pull the main user's photo and set a default photo if none was provided.
function addUserImg(user) {
    var mainUserIMG = `<img src="${user.avatar}" alt="${user.username} profile photo" />`;

//i had this so that if there wasn't a user photo provided, a placeholder photo would be added. it seems to completely override any photo provided and only the bluebird shows. I tried commenting it out, and now I have no user image in the main part of the page at all. We had the photo URL working before I left this afternoon. I haven't touched the code since then, but suddenly the photos aren't loading to the back end when I make a new user. Kalea says that the keys I'm using are still good.
    // if (user.avatar == null) {
    //     mainUserIMG = `<img src="https://raw.githubusercontent.com/RagenS9/chirp/3969a24a79e0fda25b3dd3ceaf71f4edc3a2af78/img/placeholder.JPG" alt="placeholder profile photo" />`
    //     // mainUserIMG = `<img src="../img/placeholder.JPG" alt="placeholder profile photo" />`
    // };
   
   document.querySelector('#nesterIMG').innerHTML = mainUserIMG;
};

//get all of the messages.
getMessages();

function getMessages() {
    var user = JSON.parse(sessionStorage.getItem('user'));

    fetch('https://sleepy-gorge-91783.herokuapp.com/chirps?token=' + user.token)
    
    .then(function(response) {
        return response.json();
    })
    .then(function(response) {
        // response=response.reverse();
        renderMessagesList(response);
    })
};

function renderMessagesList(messages) {
    // console.log(messages);
    messages.forEach(createMessageList);
};

// think i need to add "location.href = './nest.html';"" somewhere in here to refresh the page. but i want it only to happen when there's a new post . . . not constantly. Not sure how to do it. Maybe some kind of if statement?

function createMessageList(message) {
    // learned that if you have two columns in here, you have to also grab the row from html. otherwise the formatting goes wild.
    var messageListItem = `<div class="row card">
        <div class="col-xs-3 postUser">
            <img class="postIMG" src="${message.user.avatar}" alt="${message.user.username} profile photo" />
            <h5 class="postBird">${message.user.username}</h5>
        </div>
        <div class="col-xs-9 postText">
            <p id="postWords">${message.body}</p>
        </div>
    </div>`;
    document.querySelector('#postCard').innerHTML += messageListItem;
    // document.querySelector('#postCard').innerHTML = document.querySelector('#postCard').innerHTML + messageListItem;
    // originally had it messageListItem + document . . ., but this was bringing in the message list backwards. Even though it's putting the latest message "first," the code was telling each message to come in at the top, so it was pushing the latest message down as the rest filtered in. instead, have to use +=messageListItem or the long version, document.querySelector('#postCard').innerHTML + messageListItem;
};

// posting a chirp

document.querySelector('#chirpButton').addEventListener('click', postChirp);
document.querySelector('#textArea').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        postChirp();
    }
})

//Need to figure out why warning box from else statment won't work. 

function postChirp() {
    var body = document.querySelector('#textArea').value;
    var user = JSON.parse(sessionStorage.getItem('user'));

    if (body !== '') {
        fetch('https://sleepy-gorge-91783.herokuapp.com/chirps/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },

                body: JSON.stringify({
                    body: body,
                    token: user.token
                })
            })
                .then(function(response) {
                    return response.json();
                })
                .then(function(response) {
                    document.querySelector('#textArea').value = '';
                    createMessageList(response);
                })
    }

    else {
        alert('You must enter your chirp first!');
    }
    
};

//need a function for logging out. copied this right out of collin's code, but it's not working here.
document.querySelector('.logout').addEventListener('click', function() {
    sessionStorage.clear();
    // alert("You signed out!");
    location.href = './index.html';
});

//trying something here to call the main user's avatar image and username. something to do with fetch. 

//need to get the main user's name and photo since this is their homepage. WillyB1 (willy), AdenBug (buggy), MikeyB (kids), RagenS9 (piperlove). 

//calling the function getting the main user's information
getUser();

function getUser() {
    var token = sessionStorage.getItem('token');

    fetch('https://sleepy-gorge-91783.herokuapp.com/chirps?token=' + token)
        .then(function(response) {
            return response.json();
        })

        .then(function(response) {
            addUserInfo(response),
            addUserImg(response);
        })
};

//function to get the user's name.
function addUserInfo(token) {
    // console.log(addUserInfo);
    var mainUserName = `<h4><strong><span id="hello">Hello, </span><br/><span id="userName">${token.username}</span></strong></h4>
    </div>`;
   
   document.querySelector('#nesterName').innerHTML = mainUserName;

//another way i tried to do it, that didn't work.
    // var currentUserName = document.querySelector('#nesterName').innerHTML;
    // document.querySelector('#nesterName').innerHTML = mainUserName + currentUserName;
};

//function to pull the main user's photo and set a default photo if none was provided.
function addUserImg(token) {
    var mainUserIMG = `<img src="${token.image}" alt="${token.username} profile photo" />`;

    if (token.image == null) {
        mainUserIMG = `<img src="../img/placeholder.JPG" alt="placeholder profile photo" />`
    };
   
   document.querySelector('#nesterIMG').innerHTML = mainUserIMG;

//another way i tried to do it, that didn't work.
    // var currentUserIMG = document.querySelector('#nesterIMG').innerHTML;
    // document.querySelector('#nesterIMG').innerHTML = mainUserIMG + currentUserIMG;
};

//get all of the messages.
//Still need to figure out how to refresh the page automatically whenever there's a new message. Right now have to refresh the page yourself.
getMessages();

function getMessages() {
    var token = sessionStorage.getItem('token');

    fetch('https://sleepy-gorge-91783.herokuapp.com/chirps?token=' + token)
    
    .then(function(response) {
        return response.json();
    })
    .then(function(response) {
        renderMessagesList(response);
    })
};

function renderMessagesList(messages) {
    // console.log(messages);
    messages.forEach(createMessageList);
};

function createMessageList(message) {
    // learned that if you have two columns in here, you have to also grab the row from html. otherwise the formatting goes wild.
    var messageListItem = `<div class="row card">
        <div class="col-xs-3 postUser">
            <img class="postIMG" src="${message.image}" alt="user profile photo" />
            <h5 class="postBird">${message.username}</h5>
        </div>
        <div class="col-xs-9 postText">
            <p id="postWords">${message.body}</p>
        </div>
    </div>`;
   
   document.querySelector('#postCard').innerHTML += messageListItem;

//this was in the classroom example, but it didn't do anything.
    // var currentMessagesHTML = document.querySelector('#postWords').innerHTML;
    // document.querySelector('#postWords').innerHTML = messageListItem + currentMessagesHTML;
};

// Start code for main user's chirping text. 

// this is an event listener for the button on the main user's chirp text box.
document.querySelector('#chirpButton').addEventListener('click', postChirp);

//need to add keystrokes listener with enter action.

//Need to figure out: 
// 1) how to clear the textArea box once something has posted 
// 2) refresh the page so that it appears within the message list automatically without having to refresh the page manually. (would we need to do this second thing if that's already figured out in the getMessages function??)

function postChirp(e) {
    var body = document.querySelector('#textArea').value
    var token = sessionStorage.getItem('token');

    if (body !== null) {
        fetch('https://sleepy-gorge-91783.herokuapp.com/chirps/create' + '?body=' + body + '&token=' + token, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },

            //set the parameters for Kalea (what we're sending to backend) 
            body: JSON.stringify({
                body: body,
                token: token
            })
        })
    }

//got a 500 error here. Kalea at supper right now, so not working on it.
    else {
        alert('Need to add your chirp before it can post.')
    }
}

//end JS code. 

//html for the user profile information
    // <div class="col-sm-4 userImage">
    //     <img src="http://unsplash.it/400?image=600" alt="user profile photo" />
    //         <h4><strong><span id="hello">Hello, </span><br/><span id="userName">UserName</span></strong></h4>
    // </div>

// html for the user input text box
                    // <textarea class="form-control" id="textArea" rows="3" maxlength="160" placeholder="What's the chirp? ..."></textarea>
                    //     <span class="input-group-btn">
                    //         <button class="btn btn-default" type="button">Chirp!</button>
                    //     </span>

// html for the post list that needs to be both the user and other user's posts, in chronological order.
        // <div class="col-xs-3 postUser">
        //     <img class="postIMG" src="http://unsplash.it/400?image=700" alt="user profile photo" />
        //     <h5 class="postBird">AnotherBird</h5>
        // </div>
        // <div class="col-xs-9 postText">
        //     <p id="postWords">placeholder text</p>
        // </div>
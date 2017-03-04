//note: image has been changed to avatar

//trying something here to call the user's avatar image and username. something to do with fetch. 

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

function addUserInfo(token) {
    // console.log(addUserInfo);
    // var token = sessionStorage.getItem('token');
    var mainUserName = `<h4><strong><span id="hello">Hello, </span><br/><span id="userName">${token.username}</span></strong></h4>
    </div>`;
   
   document.querySelector('#nesterName').innerHTML += mainUserName;

    // var currentUserName = document.querySelector('#nesterName').innerHTML;
    // document.querySelector('#nesterName').innerHTML = mainUserName + currentUserName;
};


//wanted to add the user photo and set a default photo if none was provided.
function addUserImg(token) {
    var mainUserIMG = `<img src="${token.avatar}" alt="${token.username} profile photo" />`;

    if (token.avatar === null) {
        mainUserImg = `<img src="../img/placeholder.JPG" alt="placeholder profile photo" />`
    };
   
   document.querySelector('#nesterIMG').innerHTML += mainUserIMG;

    // var currentUserIMG = document.querySelector('#nesterIMG').innerHTML;
    // document.querySelector('#nesterIMG').innerHTML = mainUserIMG + currentUserIMG;
};

// also might need to refactor this or add a new function to fetch followed chirpers messages. Kalea thinks that grabbing everyone else's will happen on her side.

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
    var messageListItem = `<div class="col-xs-3 postUser">
            <img class="postIMG" src="${message.avatar}" alt="user profile photo" />
            <h5 class="postBird">${message.username}</h5>
        </div>
        <div class="col-xs-9 postText">
            <p id="postWords">${message.body}</p>
        </div>`
   
   document.querySelector('#postCard').innerHTML = messageListItem;

    // var currentMessagesHTML = document.querySelector('#postWords').innerHTML;
    // document.querySelector('#postWords').innerHTML = messageListItem + currentMessagesHTML;
};

//need to add keystrokes listener with enter action.

// This is the user chirping text. this is an event listener for the button on that text box.
document.querySelector('#chirpButton').addEventListener('click', postChirp);

function postChirp(e) {
    var body = document.querySelector('#textArea').value
    var token = sessionStorage.getItem('token');

    if (body !== null) {
        fetch('https://sleepy-gorge-91783.herokuapp.com/chirps/create' + '?body=' + body + '&token=' + token, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },

    //what parameters does Kalea need for these posts. probably user ID and text box 
            body: JSON.stringify({
                body: body,
                token: token
            })
        })
    }

    else {
        alert('Need to add your chirp before it can post.')
    }
}

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
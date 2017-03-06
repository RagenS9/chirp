//need to get the main user's name and photo since this is their homepage. WillyB1 (willy), AdenBug (buggy), MikeyB (kids), RagenS9 (piperlove). 

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

   console.log(mainUserName);
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
        response=response.reverse();
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
   
    document.querySelector('#postCard').innerHTML = messageListItem + document.querySelector('#postCard').innerHTML;

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
    location.href = './index.html?logout=yes';
    // sessionStorage.removeItem('token'); //Collin had this in his code. But he had commented it out without any notes added, so I don't know why he had it originally or why he removed it from the code.
});

//end js.

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

// original setup for the chirpings
// Start code for main user's chirping text. 

// this is an event listener for the button on the main user's chirp text box.
// document.querySelector('#chirpButton').addEventListener('click', postChirp);

//need to add keystrokes listener with enter action.

//Need to figure out: 
// 1) how to clear the textArea box once something has posted 
// 2) refresh the page so that it appears within the message list automatically without having to refresh the page manually. (would we need to do this second thing if that's already figured out in the getMessages function??)

// function postChirp(e) {
    // var body = document.querySelector('#textArea').value;
    // var token = sessionStorage.getItem('token');

    // if (body !== null) {
        // fetch('https://sleepy-gorge-91783.herokuapp.com/chirps/create' + '?body=' + body + '&token=' + token, {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },

            //set the parameters for Kalea (what we're sending to backend) 
        //     body: JSON.stringify({
        //         body: body,
        //         token: token
        //     })
        // })

        //     .then(function(response) {
        //         return response.json();
        //     })
        //     .then(function(response) {
        // })
//     }

//     else {
//         alert('Need to add your chirp before it can post.');
//     }
// };


//another way i tried to write the querySelector for getting hte main user name, that didn't work.
    // var currentUserName = document.querySelector('#nesterName').innerHTML;
    // document.querySelector('#nesterName').innerHTML = mainUserName + currentUserName;

//another way i tried to do the end part of the main user image, that didn't work.
    // var currentUserIMG = document.querySelector('#nesterIMG').innerHTML;
    // document.querySelector('#nesterIMG').innerHTML = mainUserIMG + currentUserIMG;

    //this was in the classroom example for making messages, but it didn't do anything.
    // var currentMessagesHTML = document.querySelector('#postWords').innerHTML;
    // document.querySelector('#postWords').innerHTML = messageListItem + currentMessagesHTML;
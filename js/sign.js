// start signup JS

document.querySelector('#signupButton').addEventListener('click', signup);

function signup() {
    var first_name = document.querySelector('#first_name').value;
    var last_name = document.querySelector('#last_name').value;
    var username = document.querySelector('#signUpUserName').value;
    var password = document.querySelector('#signUpPassword').value;
    var image = document.querySelector('#image').value;

    fetch('https://sleepy-gorge-91783.herokuapp.com/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },

        // Back-end controls the left side, properties, of this object
        // Front-end controls the variables names and values on the right side
        body: JSON.stringify({
            first_name: first_name,
            last_name: last_name,
            username: username,
            password: password,
            avatar: image
        })
    })
        .then(function(response) {
            return response.json();
        })
        .then(function(response) {
            // console.log(response);

            if (response.token) {
                // Saves any string into a named spot within your browser for the current domain.
                sessionStorage.setItem('token', response.token);
                // sessionStorage.setItem('id', response.id); // check with Kalea about user id. Kalea says we're not using id, so don't need this. And I can't remember why Jeff said that we might need it. 
                sessionStorage.setItem('first_name', response.first_name);
                sessionStorage.setItem('last_name', response.last_name);
                sessionStorage.setItem('username', response.username);
                sessionStorage.setItem('image', response.image);
                location.href = './nest.html';
            }
            else {
                alert('There was an error. Make sure your user name is unique to you (might need to add numbers to a first name, for example) and that your password matches from the password box to the confirm password box.');
                // console.log(response);
            }
        })
};

//event listener so that someone can hit enter upon entering password and sign in.
document.querySelector('#signInPassword').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        signin();
    }
})

//start signinButton JS

document.querySelector('#signinButton').addEventListener('click', signin);

function signin() {
    var username = document.querySelector('#signInUserName').value;
    var password = document.querySelector('#signInPassword').value;

    fetch('https://sleepy-gorge-91783.herokuapp.com/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },

        // Back-end controls the left side, properties, of this object
        // Front-end controls the variables names and values on the right side
        body: JSON.stringify({
            username: username,
            password: password
        })
    })
        .then(function(response) {
            return response.json();
        })
        .then(function(response) {
            // console.log(response);

            if (response.token) {
                // Saves any string into a named spot within your browser for the current domain.
                sessionStorage.setItem('token', response.token);
                // sessionStorage.setItem('id', response.id);// check with Kalea about user id 
                location.href = './nest.html';
                // location.href = 'https://sleepy-gorge-91783.herokuapp.com/chirps';
            }
            else {
                alert('There was an error. Check your user name and password.');
                // console.log(response);
            }
        })
};
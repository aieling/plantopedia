var formContact = document.getElementById("formContact");
var ele = document.getElementById("feedback");
var username = document.getElementById("username");
var email = document.getElementById("email");
var messageContact = document.getElementById("message");
var images = document.querySelectorAll(".card-img-top"), i;


function login() {
    let email = document.getElementById("exampleInputEmail1").value;
    let password = document.getElementById("exampleInputPassword1").value;
    // Confirm the link is a sign-in with email link.
    check_email(email);
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then(function () {
            // Success 
            document.getElementById("authForm").innerHTML = "Welcome in your page!";
        })

        .catch(function (error) {
            // Handle Errors here.
            var errorMessage = error.message;
            alert(errorMessage);
            document.getElementById("authForm").innerHTML = '<p> Not connected, Please <a  style="color:green" href="./../html/auth.html"> retry </a></p>';
        });
    return false;
};

function contactUs() {
    if (check_username(username.value) && check_email(email.value) && messageContact.value != "") {
        ele.innerHTML = "Success! Message your message has been sent";
        formContact.innerHTML = "";
    }
    else if (messageContact.value == "") {
        alert("Please enter a message");
    }
    return false;
}

//Use Regex Validation
function check_username(username) {
    console.log(username);
    var re = new RegExp(/^[a-zA-Z0-9_.-]*$[a-zA-Z_.-]*$/g);
    var message = "";
    var someWrong = false;
    var test = re.test(username);
    if (!test) {
        console.log("moi moi");
        message += " Username can only be [a-z], [A-Z], or (-,_)";
        someWrong = true;
    }
    if (username.length > 20) {
        message += "\nUsername must be less than 20 characters";
        someWrong = true;
    }
    if (someWrong) {
        console.log(message);
        alert(message);
        return false;
    }
    return true;
}


function check_email(email) {
    console.log(email);
    var re = new RegExp(/.{1,}@[^.]{1,}\.{1,}/);
    var message = "";
    var someWrong = false;
    var test = re.test(email);
    if (!test) {
        message += " Email can only be as john@example.com";
        someWrong = true;
    }
    if (someWrong) {
        console.log(message);
        alert(message);
        return false;
    }
    return true;
}

// Create a card and a modal for each element loaded from the database (Firebase)
function loadData() {
    let i = 0;
    const ref = firebase.database().ref('plants');
    ref.on("value", function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
            document.getElementById("card" + i).innerHTML = createModalModel(i);
            var childData = childSnapshot.val();
            document.getElementById('img' + i).src = childData.picture;
            document.getElementById('title' + i).innerHTML = childData.division;
            document.getElementById('modal' + i).innerHTML = childData.description;
            i++;
        });
    });
}

// Function to create a common modal foreach card using bootstrap, specific index 
function createModalModel(index) {
    let modal = '<img class="card-img-top" id="img' + index + '" src="" alt="Card image cap">' +
        '<div class="card-body" id="card0">' +
        '<h5 class="card-title" id="title' + index + '"></h5>' +
            '<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal" value="Learn More">' +
                'Learn more' +
            '</button>' +
            '<div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">' +
                '<div class="modal-dialog" role="document">' +
                    '<div class="modal-content">' +
                        '<div class="modal-header">' +
                                '<button type="button" class="close" data-dismiss="modal" aria-label="Close">' +
                                    '<span aria-hidden="true">&times;</span>' +
                                '</button>' +
                        '</div>' +
                        '<div class="modal-body" id="modal' + index + '">' +
                        '</div>' +
                        '<div class="modal-footer">' +
                            '<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>' +
                        '</div>' +
                    '</div>' +
                '</div>' +
            '</div>' +
        '</div>';
    return modal;
}


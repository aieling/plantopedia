



function check_username(username) {
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
        console.log("passage2");
        console.log(message);
        var para = document.createElement("P");
        para.classList.add("danger");
        alert(message);
        var t = document.createTextNode(messsage);
        para.appendChild(t);
        ele.appendChild(para);
        return false;
    }
    return true;
}


var token = 'a7f02e63-e78c-4a92-9335-2a0a4d34f99c';



var images = document.querySelectorAll(".card-img-top"), i;

function loadData() {
    let i = 0;
        const ref = firebase.database().ref('plants');
        ref.on("value", function (snapshot) {
            snapshot.forEach(function (childSnapshot) {
                var childData = childSnapshot.val();
                document.getElementById('img'+ i).src = childData.picture; 
                document.getElementById('title'+ i).innerHTML = childData.clade; 
                document.getElementById('modal'+i).innerHTML = childData.description;
                i++;
            });
        });
    
}







loadData();


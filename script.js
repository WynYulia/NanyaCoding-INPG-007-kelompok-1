const signUp = e => {
    let username= document.getElementById('register_username').value,
        email = document.getElementById('register_email').value,
        pwd = document.getElementById('register_password').value;

    let formData = JSON.parse(localStorage.getItem('formData')) || [];

    let exist = formData.length && 
        JSON.parse(localStorage.getItem('formData')).some(data => 
            data.username.toLowerCase() == fname.toLowerCase()
        );

    if(!exist){
        formData.push({ username, email, pwd });
        localStorage.setItem('formData', JSON.stringify(formData));
        document.querySelector('form').reset();
        document.getElementById('username').focus();
        alert("Account Created.\n\nPlease Sign In using the link below.");
    }
    else{
        alert("Ooopppssss... Duplicate found!!!\nYou have already sigjned up");
    }
    e.preventDefault();
}

function signIn(e) {
    let email = document.getElementById('login_email').value, pwd = document.getElementById('login_password').value;
    let formData = JSON.parse(localStorage.getItem('formData')) || [];
    let exist = formData.length && 
    JSON.parse(localStorage.getItem('formData')).some(data => data.email.toLowerCase() == email && data.pwd.toLowerCase() == pwd);
    if(!exist){
        alert("Incorrect login credentials");
    }
    else{
        location.href = "index.html";
    }
    e.preventDefault();
}

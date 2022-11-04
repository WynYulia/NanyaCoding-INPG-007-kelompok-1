const loginBtn = document.getElementById('login-btn');
const signupBtn = document.getElementById('signup-btn');
const profileBtn = document.getElementById('profile-btn');
const logoutBtn = document.getElementById('logout-btn');

const current_user = JSON.parse(localStorage.getItem('current_user'))

window.onload = () => {
    if (current_user) {
        loginBtn.classList.add('d-none')
        signupBtn.classList.add('d-none')
        profileBtn.innerHTML = current_user
        profileBtn.classList.remove('d-none')
        logoutBtn.classList.remove('d-none')
    }else{
        loginBtn.classList.remove('d-none')
        signupBtn.classList.remove('d-none')
        profileBtn.innerHTML = current_user
        profileBtn.classList.add('d-none')
        logoutBtn.classList.add('d-none')
    }
}

const signUp = (e) => {
    let username= document.getElementById('register_username').value,
        email = document.getElementById('register_email').value,
        pwd = document.getElementById('register_password').value;

    let formData = JSON.parse(localStorage.getItem('formData')) || [];

    let exist = formData.length && 
        JSON.parse(localStorage.getItem('formData')).some(data => 
            data.username.toLowerCase() == username.toLowerCase()
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

const signIn = (e) => {
    let email = document.getElementById('login_email').value, pwd = document.getElementById('login_password').value;
    let formData = JSON.parse(localStorage.getItem('formData')) || [];
    let exist = formData.length && 
    JSON.parse(localStorage.getItem('formData')).some(data => data.email === email && data.pwd === pwd);
    if(!exist){
        alert("Incorrect login credentials");
    }
    else{
        localStorage.setItem('current_user', JSON.stringify(email))
        location.href = "index.html";
    }
    e.preventDefault();
}

logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('current_user')
    location.reload()
})

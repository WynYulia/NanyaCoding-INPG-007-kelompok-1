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
        pwd_confrim = document.getElementById('register_password_konfirmasi').value;
        
    let formData = JSON.parse(localStorage.getItem('formData')) || [];

    let exist = formData.length && 
        JSON.parse(localStorage.getItem('formData')).some(data => 
            data.username.toLowerCase() == username.toLowerCase()
        );
        
        if (username.length < 5 || username.length > 10) {
            alert("Username must be 5-10 characters");
        }
    
        let usernameContainsNumber = false;
        let usernameContainsAlfabet = false;
        let usernameContainsOther = false;
        for (i = 0; i < username.length; i++) {
          let code = username.charCodeAt(i);
          if (code > 47 && code < 58) {
            usernameContainsNumber = true;
          } else if ((code > 64 && code < 91) || (code > 96 && code < 123)) {
            usernameContainsAlfabet = true;
          } else {
            usernameContainsOther = true;
          }
        }
        if (usernameContainsOther == true) {
          return alert(
            "Username no spaces and other characters"
          );
        }
        if (!usernameContainsAlfabet || !usernameContainsNumber) {
          return alert("Username must contain letters and numbers");
        }

        if (pwd.length < 6 || pwd.length > 12) {
            return alert("Password length must be 6-12 characters");
          }
          let passwordContainsNumber = false;
          let passwordContainsAlfabet = false;
          let passwordContainsOther = false;
          let passwordCapitalAflabet = 0;
          for (i = 0; i < pwd.length; i++) {
            let code = pwd.charCodeAt(i);
            if (code > 47 && code < 58) {
              passwordContainsNumber = true;
            } else if (code > 96 && code < 123) {
              passwordContainsAlfabet = true;
            } else if (code > 64 && code < 91) {
              passwordCapitalAflabet = passwordCapitalAflabet + 1;
            } else {
              passwordContainsOther = true;
            }
          }
          if (passwordContainsOther == true) {
            return alert(
              "Password can not contain spaces and special characters"
            );
          }
          if (!passwordContainsAlfabet ||!passwordContainsNumber ||passwordCapitalAflabet != 1) {
            return alert(
              "Password must contain letters, numbers and one capital letter"
            ) 
        }

        
          if (pwd_confrim != pwd) {
            return alert("Password does not match");
          }
    

    if(!exist){
        formData.push({ username, email, pwd, pwd_confrim });
        localStorage.setItem('formData', JSON.stringify(formData));
        document.querySelector('form').reset();
        document.getElementById('username').focus();
        Succeed();
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

function Succeed() {

    swal({

         title: "Succeed",

         text: "Account Created Successfully",

         icon: "success",

         button: true

     });

 }
function errorPop() {

    swal({

         title: "Error",

         text: "Error",

         icon: "error",

         button: true

     });

 }

var backToTop = document.querySelector(".back-to-top");

window.addEventListener("scroll", () => {
  if (this.scrollY >= 450) {
    backToTop.classList.add("show");

    backToTop.addEventListener("click", () => {
      window.scrollTo({
        top: 0
      });
    });
  } else {
    backToTop.classList.remove("show");
  }
});

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
  } else {
    loginBtn.classList.remove('d-none')
    signupBtn.classList.remove('d-none')
    profileBtn.innerHTML = current_user
    profileBtn.classList.add('d-none')
    logoutBtn.classList.add('d-none')
  }
}

const signUp = (e) => {
  let username = document.getElementById('register_username').value,
    email = document.getElementById('register_email').value,
    pwd = document.getElementById('register_password').value;
  pwd_confrim = document.getElementById('register_password_konfirmasi').value;

  let formData = JSON.parse(localStorage.getItem('formData')) || [];

  let exist = formData.length &&
    JSON.parse(localStorage.getItem('formData')).some(data =>
      data.username.toLowerCase() == username.toLowerCase()
    );

  if (username.length < 5 || username.length > 10) {
    return errorPop("Username must be 5-10 characters");
  }

  let usernamesNumber = false;
  let usernameAlfabet = false;
  let usernameOther = false;
  for (i = 0; i < username.length; i++) {
    let code = username.charCodeAt(i);
    if (code > 47 && code < 58) {
      usernamesNumber = true;
    } else if ((code > 64 && code < 91) || (code > 96 && code < 123)) {
      usernameAlfabet = true;
    } else {
      usernameOther = true;
    }
  }
  if (usernameOther == true) {
    return errorPop("Username no spaces and other characters");
  }
  if (!usernameAlfabet || !usernamesNumber) {
    return errorPop("Username must contain letters and numbers");
  }

  if (pwd.length < 6 || pwd.length > 12) {
    return errorPop("Password length must be 6-12 characters");
  }
  let passwordNumber = false;
  let passwordAlfabet = false;
  let passwordOther = false;
  let passwordCapitalAflabet = 0;
  for (i = 0; i < pwd.length; i++) {
    let code = pwd.charCodeAt(i);
    if (code > 47 && code < 58) {
      passwordNumber = true;
    } else if (code > 96 && code < 123) {
      passwordAlfabet = true;
    } else if (code > 64 && code < 91) {
      passwordCapitalAflabet = passwordCapitalAflabet + 1;
    } else {
      passwordOther = true;
    }
  }
  if (passwordOther == true) {
    return errorPop("Password can not contain spaces and special characters");
  }
  if (!passwordAlfabet || !passwordNumber || passwordCapitalAflabet != 1) {
    return errorPop("Password must contain letters, numbers and one capital letter");
  }


  if (pwd_confrim != pwd) {
    return errorPop("Password does not match");
  }


  if (!exist) {
    formData.push({
      username,
      email,
      pwd,
      pwd_confrim
    });
    localStorage.setItem('formData', JSON.stringify(formData));
    swal({

      title: "Succeed",

      text: "Account Created Successfully",

      icon: "success",

      button: true

    });
    document.querySelector('form').reset();
  } else {
    swal({

      title: "Error",

      text: "Ooopppssss... Duplicate found!!!\nYou have already signed up",

      icon: "error",

      button: true

    });
  }
  e.preventDefault();
}

const signIn = (e) => {
  let email = document.getElementById('login_email').value,
    pwd = document.getElementById('login_password').value;
  let formData = JSON.parse(localStorage.getItem('formData')) || [];
  let exist = formData.length &&
    JSON.parse(localStorage.getItem('formData')).some(data => data.email === email && data.pwd === pwd);
  if (!exist) {
    swal({

      title: "Error",

      text: "Invalid email or password",

      icon: "error",

      button: true

    });
  } else {
    localStorage.setItem('current_user', JSON.stringify(email))
    location.href = "index.html";
  }
  e.preventDefault();
}

logoutBtn.addEventListener('click', () => {
  localStorage.removeItem('current_user')
  location.reload()
})

function errorPop(message) {

  swal({

    title: "Error",

    text: message,

    icon: "error",

    button: true

  });

}
const errorDisplay = document.getElementById("errorDisplay")

const registerForm = document.getElementById("registration")

const loginForm = document.getElementById("login")

const terms = registerForm.childNodes[22].childNodes[1]

const registerFields = {
  username: registerForm.childNodes[1],
  email: registerForm.childNodes[6],
  password: registerForm.childNodes[11],
  confirmP: registerForm.childNodes[16]
}

const loginFields = {
  username: loginForm.childNodes[1],
  password: loginForm.childNodes[6]
}

const users = {}

const emailValidation = /^\w+[.-\w]*@\w+[.\w{2,3}]+$/

errorDisplay.style.justifyContent = "center"

registerForm.addEventListener("submit", registerFormSubmitCtrl)
registerForm.addEventListener("click", removeError)
loginForm.addEventListener("submit", loginFormSubmitCtrl)
loginForm.addEventListener("click", removeError)

localStorage.clear()
const store = localStorage.length
console.log(store)

function storeUser(user, mail, pwd) {
  localStorage.setItem(0, {
    "username": user
  })
}

function registerFormSubmitCtrl(evt) {
  evt.preventDefault()
  // The username cannot be blank.
  for(field in registerFields) {
    if(registerFields[field].value === "") {
      displayError("All fields must be filled out.")
      return
    }
  }
  // The username must be at least four characters long.
  if(registerFields.username.value.length < 5) {
    displayError("Username must be at least four characters long.")
    return
  }
  // The username must contain at least two unique characters.
  if(/\w+/.test(registerFields.username.value)) {
    if(!/\d+/.test(registerFields.username.value)) {
      displayError("Username must contain at least two unique characters.")
      return
    }
    if(!/[A-Za-z]/.test(registerFields.username.value)) {
      displayError("Username must contain at least two unique characters.")
      return
    }
  }
  // The username cannot contain any special characters or whitespace.
  if(/\s+/.test(registerFields.username.value) || /\W+/.test(registerFields.username.value)) {
    displayError("Username cannot contain any special characters or whitespace.")
    return
  }
  // The email must be a valid email address.
  if(!emailValidation.test(registerFields.email.value)) {
    displayError("Email address format is invalid.")
    return
  }
  // The email must not be from the domain "example.com."
  if(/@example.com/.test(registerFields.email.value)) {
    displayError(`Invalid domain.  Please use a domain other than "example.com".`)
    return
  }
  // Passwords must be at least 12 characters long.
  if(registerFields.password.value.length < 13) {
    displayError("Passwords must be at least 12 characters long.")
    return
  }
  // Passwords must have at least one uppercase and one lowercase letter.
  if(!/[A-Z]+/.test(registerFields.password.value) || !/[A-Z]+/.test(registerFields.password.value)) {
    displayError("Passwords must have at least one uppercase and one lowercase letter.")
    return
  }
  // Passwords cannot contain the username.
  if(registerFields.password.value === registerFields.username.value){
    displayError("Password should not be the same as your username.")
    return
  }
  // Passwords must contain at least one number.
  if(!/\d+/.test(registerFields.password.value)) {
    displayError("Password must contain at least one number.")
    return
  }
  // Passwords must contain at least one special character.
  if(!/\W+/.test(registerFields.password.value)) {
    displayError("Password must contain at least one special character.")
    return
  }
  // Passwords cannot contain the word "password" (uppercase, lowercase, or mixed).
  if(/password/.test(registerFields.password.value.toLowerCase())) {
    displayError(`Password cannot contain the word "password" (uppercase, lowercase, or mixed).`)
    return
  }
  // Both passwords must match.
  if(registerFields.confirmP.value !== registerFields.password.value){
    displayError("Passwords do not match.")
    return
  }
  if(!terms.checked) {
    displayError("You must accept the terms and conditions to proceed.")
    return
  }
  displayError("Success!")
}

function loginFormSubmitCtrl(evt) {
  evt.preventDefault()

  for(field in loginFields) {
    if(loginFields[field].value === "") {
      displayError("All fields must be filled out")
      return
    }
  }
}

function displayError(error) {
  errorDisplay.textContent = error
  errorDisplay.style.display = "flex"
}

function removeError() {
  errorDisplay.textContent = ""
  errorDisplay.style.display = "none"
}
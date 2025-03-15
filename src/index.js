const errorDisplay = document.getElementById("errorDisplay")

const registerForm = document.getElementById("registration")

const register = {
  username: registerForm.childNodes[1],
  email: registerForm.childNodes[6],
  password: registerForm.childNodes[11],
  confirmP: registerForm.childNodes[16]
}

const loginForm = document.getElementById("login")

const loginUsername = loginForm.childNodes[1]
const loginPassword = loginForm.childNodes[6]

const emailValidation = /^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/
// console.log(emailValidation.test("awatersny@gmail.com"))

registerForm.addEventListener("submit", registerFormSubmitCtrl)
registerForm.addEventListener("click", removeError)
loginForm.addEventListener("submit", loginFormSubmitCtrl)
loginForm.addEventListener("click", removeError)

function registerFormSubmitCtrl(evt) {
  evt.preventDefault()
  // Registration Form - Username Validation:
  // The username cannot be blank.

  if(register.username.value === "") {
    displayError("Username cannot be blank.")
    return
  }
  // The username must be at least four characters long.
  if(register.username.value.length < 4) {
    displayError("Username must be at least four characters long.")
    return
  }
  // The username must contain at least two unique characters.
  if(/\w{1,}/.test(register.username.value)) {
    if(!/\d{1,}/.test(register.username.value)) {
      displayError("Username must contain at least two unique characters.")
      return
    }
    if(!/[A-Za-z]/.test(register.username.value)) {
      displayError("Username must contain at least two unique characters.")
      return
    }
  }
  // The username cannot contain any special characters or whitespace.
  if(/\s{1,}/.test(register.username.value) || /\W{1,}/.test(register.username.value)) {
    displayError("Username cannot contain any special characters or whitespace.")
    return
  }
  // Registration Form - Email Validation:
  // The email must be a valid email address.
  if(!emailValidation.test(register.email.value)) {
    displayError("Email address format is invalid.")
    return
  }
  // The email must not be from the domain "example.com."
  if(/@example.com/.test(register.email.value)) {
    displayError(`Invalid domain.  Please use a domain other than "example.com"`)
    return
  }
  // Registration Form - Password Validation:
  // Passwords must be at least 12 characters long.
  // Passwords must have at least one uppercase and one lowercase letter.
  // Passwords must contain at least one number.
  // Passwords must contain at least one special character.
  // Passwords cannot contain the word "password" (uppercase, lowercase, or mixed).
  // Passwords cannot contain the username.
  // Both passwords must match.
  if(register.confirmP.value !== register.password.value){
    displayError("Passwords do not match.")
  }
}

function loginFormSubmitCtrl(evt) {
  evt.preventDefault()
}

function displayError(error) {
  errorDisplay.textContent = error
  errorDisplay.style.display = "flex"
}

function removeError() {
  errorDisplay.textContent = ""
  errorDisplay.style.display = "none"
}
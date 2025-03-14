const errorDisplay = document.getElementById("errorDisplay")

const registerForm = document.getElementById("registration")
const registerUsername = registerForm.childNodes[1]
const registerEmail = registerForm.childNodes[6]
const registerPassword = registerForm.childNodes[11]
const registerConfirmP = registerForm.childNodes[16]

const loginForm = document.getElementById("login")

const loginUsername = loginForm.childNodes[1]
const loginPassword = loginForm.childNodes[6]

const emailValidation = /^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/
console.log(emailValidation.test("awatersny@gmail.com"))


loginForm.addEventListener("submit", loginFormSubmitCtrl)
registerForm.addEventListener("submit", registerFormSubmitCtrl)

function registerFormSubmitCtrl(evt) {
// Registration Form - Username Validation:
// The username cannot be blank.
if(registerUsername.value === "") {
  displayError("Username is required.")
  return
}
// The username must be at least four characters long.
// The username must contain at least two unique characters.
// The username cannot contain any special characters or whitespace.
// Registration Form - Email Validation:
// The email must be a valid email address.
// The email must not be from the domain "example.com."
console.log(registerEmail.value)
// Registration Form - Password Validation:
// Passwords must be at least 12 characters long.
// Passwords must have at least one uppercase and one lowercase letter.
// Passwords must contain at least one number.
// Passwords must contain at least one special character.
// Passwords cannot contain the word "password" (uppercase, lowercase, or mixed).
// Passwords cannot contain the username.
// Both passwords must match.
console.log(registerPassword.value)
console.log(registerConfirmP.value)
  evt.preventDefault()
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
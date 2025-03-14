const errorDisplay = document.getElementById("errorDisplay")

const registerForm = document.getElementById("registration")
const registerUsername = registerForm.childNodes[1]
const registerEmail = registerForm.childNodes[6]
const registerPassword = registerForm.childNodes[11]
const registerConfirmP = registerForm.childNodes[16]

const loginForm = document.getElementById("login")

console.log(loginForm.childNodes)
const loginUsername = loginForm.childNodes[1]
const loginPassword = loginForm.childNodes[6]

loginForm.addEventListener("submit", loginFormCtrl)
registerForm.addEventListener("submit", registerFormCtrl)

function loginFormCtrl(evt) {
  evt.preventDefault()
  console.log("login")
}

function registerFormCtrl(evt) {
  evt.preventDefault()
  console.log("register")
}

function displayError(error) {
  errorDisplay.textContent = error
  errorDisplay.style.display = "flex"
}

function removeError() {
  errorDisplay.textContent = ""
  errorDisplay.style.display = "none"
}
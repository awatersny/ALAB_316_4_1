const errorDisplay = document.getElementById("errorDisplay")
const loginForm = document.getElementById("login")
const registerForm = document.getElementById("registration")

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